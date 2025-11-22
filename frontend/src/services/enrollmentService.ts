import apiClient from './apiClient';
import type { Enrollment } from '../types';

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export interface EnrollPayload {
  courseId: string;
}

export const enrollInCourse = async (payload: EnrollPayload) => {
  const response = await apiClient.post('/enrollments', payload);
  return unwrap(response);
};

export const fetchMyEnrollments = async (): Promise<Enrollment[]> => {
  const response = await apiClient.get('/enrollments/me');
  return unwrap<{ enrollments: Enrollment[] }>(response).enrollments;
};

