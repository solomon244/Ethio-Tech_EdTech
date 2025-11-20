import type { Course, DashboardStat, Enrollment, Quiz, User } from '../types';

export const featuredCourses: Course[] = [
  {
    id: 'course-frontend',
    title: 'Modern Frontend with React & Tailwind',
    description: 'Build production-ready interfaces with React, TypeScript, and Tailwind CSS tailored for Ethiopian contexts.',
    category: 'Web Development',
    level: 'intermediate',
    thumbnailUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    instructor: {
      name: 'Selam Kebede',
      title: 'Senior Frontend Engineer',
      avatar: 'https://i.pravatar.cc/150?img=47',
    },
    stats: {
      lessons: 36,
      students: 1240,
      duration: '18h',
    },
    lessons: [
      { id: 'l1', title: 'Component Architecture', duration: '24 min' },
      { id: 'l2', title: 'State Management Patterns', duration: '32 min' },
    ],
    tags: ['React', 'Tailwind', 'UI'],
  },
  {
    id: 'course-python',
    title: 'Python for Data & AI',
    description: 'Learn Python fundamentals through Ethiopian education datasets and practical labs.',
    category: 'Data Science',
    level: 'beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    instructor: {
      name: 'Fitsum Hailemariam',
      title: 'AI Curriculum Lead',
    },
    stats: {
      lessons: 42,
      students: 980,
      duration: '22h',
    },
    lessons: [
      { id: 'l3', title: 'Python Syntax & Logic', duration: '28 min' },
      { id: 'l4', title: 'Working with Pandas', duration: '31 min' },
    ],
    tags: ['Python', 'Data', 'AI'],
  },
];

export const heroStats: DashboardStat[] = [
  { id: 'learners', label: 'Active Learners', value: '12.4K', change: '+18%', trend: 'up' },
  { id: 'hours', label: 'Learning Hours', value: '94K', change: '+24%', trend: 'up' },
  { id: 'schools', label: 'Partner Schools', value: '220+', change: '+9%', trend: 'up' },
];

export const mockEnrollments: Enrollment[] = [
  {
    id: 'enr-1',
    courseId: 'course-frontend',
    progress: 72,
    lastLesson: 'State Management Patterns',
    updatedAt: '2025-11-18T10:00:00Z',
  },
  {
    id: 'enr-2',
    courseId: 'course-python',
    progress: 38,
    lastLesson: 'Working with Pandas',
    updatedAt: '2025-11-15T15:00:00Z',
  },
];

export const quizBank: Quiz[] = [
  {
    id: 'quiz-react-hooks',
    title: 'React Hooks Fundamentals',
    lessonId: 'l2',
    questions: [
      {
        question: 'Which hook is best suited for data fetching side effects?',
        options: ['useState', 'useEffect', 'useMemo', 'useReducer'],
        answerIndex: 1,
      },
      {
        question: 'What does useMemo return?',
        options: ['A memoized value', 'A memoized function', 'A cleanup callback', 'A new component'],
        answerIndex: 0,
      },
    ],
  },
];

export const mockInstructors: User[] = [
  {
    id: 'inst-1',
    firstName: 'Hanna',
    lastName: 'Bekele',
    email: 'hanna.bekele@ethio.tech',
    role: 'instructor',
    bio: 'Cloud-native engineer guiding students through modern backend systems.',
    avatar: 'https://i.pravatar.cc/150?img=52',
  },
  {
    id: 'inst-2',
    firstName: 'Abel',
    lastName: 'Mengistu',
    email: 'abel.mengistu@ethio.tech',
    role: 'instructor',
    bio: 'Mobile developer advocating for Amharic-first apps.',
  },
];

