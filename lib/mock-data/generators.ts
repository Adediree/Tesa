import { generateId } from '../utils';
import {
  User,
  Specialization,
  Pathway,
  Course,
  Module,
  LiveClass,
  Quiz,
  QuizQuestion,
  PathwayLevel,
  ModuleContent,
  UserProgress,
  Enrollment,
} from '@/types';

export function createMockUser(overrides?: Partial<User>): User {
  return {
    id: generateId(),
    email: 'user@example.com',
    name: 'John Doe',
    role: 'free',
    createdAt: new Date().toISOString(),
    settings: {
      fontSize: 'medium',
      fontFamily: 'sans-serif',
      theme: 'light',
    },
    ...overrides,
  };
}

export function createMockSpecialization(overrides?: Partial<Specialization>): Specialization {
  return {
    id: generateId(),
    title: 'Artificial Intelligence',
    description: 'Master AI fundamentals and advanced techniques',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    pathways: [],
    ...overrides,
  };
}

export function createMockPathway(specializationId: string, level: PathwayLevel, overrides?: Partial<Pathway>): Pathway {
  const titles = {
    beginner: 'Beginner Path',
    intermediate: 'Intermediate Path',
    advanced: 'Advanced Path',
  };

  const descriptions = {
    beginner: 'Start your journey with foundational concepts',
    intermediate: 'Build on basics with practical applications',
    advanced: 'Master advanced techniques and real-world projects',
  };

  return {
    id: generateId(),
    specializationId,
    level,
    title: titles[level],
    description: descriptions[level],
    courseIds: [],
    ...overrides,
  };
}

export function createMockCourse(specializationId: string, level: PathwayLevel, overrides?: Partial<Course>): Course {
  return {
    id: generateId(),
    specializationId,
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of machine learning and build your first models',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    instructor: 'Dr. Sarah Johnson',
    duration: '8 weeks',
    level,
    moduleIds: [],
    prerequisites: [],
    ...overrides,
  };
}

export function createMockModule(courseId: string, order: number, overrides?: Partial<Module>): Module {
  return {
    id: generateId(),
    courseId,
    title: `Module ${order}: Introduction`,
    description: 'Learn the core concepts and fundamentals',
    order,
    duration: '2 hours',
    content: [],
    ...overrides,
  };
}

export function createMockVideoContent(): ModuleContent {
  return {
    id: generateId(),
    type: 'video',
    title: 'Introduction Video',
    data: {
      url: 'https://example.com/video.mp4',
      duration: '45m',
      thumbnail: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  };
}

export function createMockLabContent(): ModuleContent {
  return {
    id: generateId(),
    type: 'lab',
    title: 'Hands-on Lab',
    data: {
      instructions: '## Lab Instructions\n\n1. Set up your environment\n2. Follow the steps below\n3. Complete the exercises',
      codeSnippets: [
        {
          language: 'python',
          code: 'import numpy as np\n\ndef hello_world():\n    print("Hello, World!")',
          filename: 'example.py',
        },
      ],
      resources: ['https://docs.example.com', 'https://tutorial.example.com'],
    },
  };
}

export function createMockLiveClass(courseId: string, overrides?: Partial<LiveClass>): LiveClass {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);

  return {
    id: generateId(),
    courseId,
    title: 'Live Q&A Session',
    description: 'Join us for a live question and answer session',
    instructor: 'Dr. Sarah Johnson',
    scheduledAt: futureDate.toISOString(),
    duration: '1 hour',
    meetingLink: 'https://meet.example.com/session',
    maxParticipants: 100,
    enrolledUsers: [],
    ...overrides,
  };
}

export function createMockQuiz(moduleId: string, overrides?: Partial<Quiz>): Quiz {
  return {
    id: generateId(),
    moduleId,
    title: 'Module Assessment',
    passingScore: 70,
    questions: [],
    ...overrides,
  };
}

export function createMockQuizQuestion(overrides?: Partial<QuizQuestion>): QuizQuestion {
  return {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
    points: 10,
    ...overrides,
  };
}

export function createMockUserProgress(userId: string, courseId: string, overrides?: Partial<UserProgress>): UserProgress {
  return {
    userId,
    courseId,
    completedModules: [],
    startedAt: new Date().toISOString(),
    lastAccessedAt: new Date().toISOString(),
    completionPercentage: 0,
    ...overrides,
  };
}

export function createMockEnrollment(userId: string, courseId: string, pathwayId: string, overrides?: Partial<Enrollment>): Enrollment {
  return {
    id: generateId(),
    userId,
    courseId,
    pathwayId,
    enrolledAt: new Date().toISOString(),
    status: 'active',
    ...overrides,
  };
}
