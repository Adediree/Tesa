export type UserRole = 'free' | 'paid' | 'admin';

export type PathwayLevel = 'beginner' | 'intermediate' | 'advanced';

export type ModuleContentType = 'video' | 'live' | 'lab' | 'reading';

export type QuizQuestionType = 'multiple-choice' | 'true-false' | 'short-answer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  settings: UserSettings;
}

export interface UserSettings {
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: 'sans-serif' | 'serif' | 'mono';
  theme: 'light' | 'dark';
}

export interface Specialization {
  id: string;
  title: string;
  description: string;
  image: string;
  pathways: Pathway[];
}

export interface Pathway {
  id: string;
  specializationId: string;
  level: PathwayLevel;
  title: string;
  description: string;
  courseIds: string[];
}

export interface Course {
  id: string;
  specializationId: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  duration: string;
  level: PathwayLevel;
  moduleIds: string[];
  prerequisites?: string[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  duration: string;
  content: ModuleContent[];
  quiz?: Quiz;
}

export interface ModuleContent {
  id: string;
  type: ModuleContentType;
  title: string;
  data: VideoContent | LiveClassContent | LabContent;
}

export interface VideoContent {
  url: string;
  duration: string;
  thumbnail: string;
}

export interface LiveClassContent {
  scheduledAt: string;
  instructor: string;
  meetingLink?: string;
  description: string;
}

export interface LabContent {
  instructions: string;
  codeSnippets?: CodeSnippet[];
  resources?: string[];
}

export interface CodeSnippet {
  language: string;
  code: string;
  filename?: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  points: number;
}

export interface QuizSubmission {
  id: string;
  userId: string;
  quizId: string;
  answers: Record<string, string | number>;
  score: number;
  passed: boolean;
  submittedAt: string;
}

export interface LiveClass {
  id: string;
  courseId: string;
  title: string;
  description: string;
  instructor: string;
  scheduledAt: string;
  duration: string;
  meetingLink: string;
  maxParticipants?: number;
  enrolledUsers: string[];
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedModules: string[];
  currentModule?: string;
  startedAt: string;
  lastAccessedAt: string;
  completionPercentage: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  pathwayId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'paused';
}

export interface Certificate {
  id: string;
  userId: string;
  pathwayId: string;
  issuedAt: string;
  certificateUrl: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  moduleId: string;
  courseId: string;
  createdAt: string;
}
