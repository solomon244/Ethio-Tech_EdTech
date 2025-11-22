import apiClient from './apiClient';
import type { Course } from '../types';

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export interface CourseFilters {
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  isPublished?: boolean;
}

export interface CreateCoursePayload {
  title: string;
  description: string;
  category: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  language?: string;
  requirements?: string[];
  outcomes?: string[];
  price?: number;
  tags?: string[];
}

export interface UpdateCoursePayload extends Partial<CreateCoursePayload> {}

export interface CreateLessonPayload {
  title: string;
  description?: string;
  order?: number;
  content?: string;
  videoUrl?: string;
  duration?: number;
  resources?: Array<{
    type: 'pdf' | 'doc' | 'link' | 'code';
    title: string;
    url: string;
  }>;
  isPreviewable?: boolean;
}

export const fetchCourses = async (filters?: CourseFilters): Promise<Course[]> => {
  const response = await apiClient.get('/courses', { params: filters });
  return unwrap<{ courses: Course[] }>(response).courses;
};

export const fetchCourse = async (courseId: string): Promise<{ course: Course; lessons: any[] }> => {
  const response = await apiClient.get(`/courses/${courseId}`);
  return unwrap<{ course: Course; lessons: any[] }>(response);
};

export const createCourse = async (payload: CreateCoursePayload) => {
  const response = await apiClient.post('/courses', payload);
  return unwrap<{ course: Course }>(response);
};

export const updateCourse = async (courseId: string, payload: UpdateCoursePayload) => {
  const response = await apiClient.patch(`/courses/${courseId}`, payload);
  return unwrap<{ course: Course }>(response);
};

export const deleteCourse = async (courseId: string) => {
  await apiClient.delete(`/courses/${courseId}`);
};

export const createLesson = async (courseId: string, payload: CreateLessonPayload) => {
  const response = await apiClient.post(`/courses/${courseId}/lessons`, payload);
  return unwrap(response);
};

export const updateLesson = async (lessonId: string, payload: Partial<CreateLessonPayload>) => {
  const response = await apiClient.patch(`/courses/lessons/${lessonId}`, payload);
  return unwrap(response);
};

export const deleteLesson = async (lessonId: string) => {
  await apiClient.delete(`/courses/lessons/${lessonId}`);
};

