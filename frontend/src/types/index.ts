export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  isEmailVerified?: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description?: string;
  videoUrl?: string;
  resources?: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnailUrl: string;
  instructor: {
    name: string;
    title: string;
    avatar?: string;
  };
  stats: {
    lessons: number;
    students: number;
    duration: string;
  };
  lessons: Lesson[];
  tags?: string[];
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  helper?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface Quiz {
  id: string;
  title: string;
  lessonId: string;
  questions: QuizQuestion[];
}

export interface Enrollment {
  id: string;
  courseId: string;
  progress: number;
  lastLesson?: string;
  updatedAt: string;
}

