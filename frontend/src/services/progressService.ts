import apiClient from './apiClient';

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export interface UpdateProgressPayload {
  courseId: string;
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  percentage?: number;
}

export interface Progress {
  id: string;
  student: string;
  lesson: string;
  course: string;
  status: 'not_started' | 'in_progress' | 'completed';
  lastVisitedAt?: string;
  percentage: number;
  createdAt: string;
  updatedAt: string;
}

export const updateProgress = async (payload: UpdateProgressPayload) => {
  const response = await apiClient.post('/progress', payload);
  return unwrap<{ progress: Progress }>(response);
};

export const fetchCourseProgress = async (courseId: string): Promise<Progress[]> => {
  const response = await apiClient.get(`/progress/${courseId}`);
  return unwrap<{ progress: Progress[] }>(response).progress;
};

