import apiClient from './apiClient';
import type { Quiz, QuizQuestion } from '../types';

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export interface CreateQuizPayload {
  lesson: string;
  title: string;
  durationMinutes?: number;
  questions: Array<{
    prompt: string;
    options: string[];
    correctAnswerIndex: number;
    explanation?: string;
  }>;
}

export interface SubmitQuizPayload {
  answers: Array<{
    questionIndex: number;
    selectedOptionIndex: number;
  }>;
}

export interface QuizAttempt {
  id: string;
  quiz: {
    id: string;
    title: string;
  };
  score: number;
  totalQuestions: number;
  completedAt: string;
  createdAt: string;
}

export const createQuiz = async (payload: CreateQuizPayload) => {
  const response = await apiClient.post('/quizzes', payload);
  return unwrap<{ quiz: Quiz }>(response);
};

export const fetchQuiz = async (lessonId: string): Promise<Quiz> => {
  // Note: Backend needs to add this endpoint
  const response = await apiClient.get(`/quizzes/lesson/${lessonId}`);
  return unwrap<{ quiz: Quiz }>(response).quiz;
};

export const submitQuiz = async (quizId: string, payload: SubmitQuizPayload) => {
  const response = await apiClient.post(`/quizzes/${quizId}/submit`, payload);
  return unwrap<{ attempt: QuizAttempt }>(response);
};

export const fetchQuizHistory = async (): Promise<QuizAttempt[]> => {
  const response = await apiClient.get('/quizzes/history/me');
  return unwrap<{ attempts: QuizAttempt[] }>(response).attempts;
};

