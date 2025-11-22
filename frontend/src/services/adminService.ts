import apiClient from './apiClient';
import type { User } from '../types';

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export interface DashboardStats {
  userCount: number;
  instructorPending: number;
  courseCount: number;
  enrollmentCount: number;
}

export interface UpdateInstructorStatusPayload {
  status: 'approved' | 'rejected';
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await apiClient.get('/admin/stats');
  return unwrap<{ stats: DashboardStats }>(response).stats;
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get('/admin/users');
  return unwrap<{ users: User[] }>(response).users;
};

export const updateInstructorStatus = async (instructorId: string, payload: UpdateInstructorStatusPayload) => {
  const response = await apiClient.patch(`/admin/instructors/${instructorId}`, payload);
  return unwrap<{ user: User }>(response);
};

