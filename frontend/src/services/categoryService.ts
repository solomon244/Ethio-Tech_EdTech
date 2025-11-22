import apiClient from './apiClient';
import type { Category } from '../types';

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  icon?: string;
}

export interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {}

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get('/categories');
  return unwrap<{ categories: Category[] }>(response).categories;
};

export const createCategory = async (payload: CreateCategoryPayload) => {
  const response = await apiClient.post('/categories', payload);
  return unwrap<{ category: Category }>(response);
};

export const updateCategory = async (categoryId: string, payload: UpdateCategoryPayload) => {
  const response = await apiClient.patch(`/categories/${categoryId}`, payload);
  return unwrap<{ category: Category }>(response);
};

