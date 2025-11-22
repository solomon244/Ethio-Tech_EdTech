import apiClient from './apiClient';
import type { User } from '../types';

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export const fetchProfile = async (): Promise<User> => {
  const response = await apiClient.get('/users/me');
  const payload = unwrap<{ user: User }>(response);
  return payload.user;
};


