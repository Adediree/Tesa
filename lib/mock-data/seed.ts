import {
  createMockSpecialization,
  createMockPathway,
  createMockCourse,
  createMockModule,
  createMockVideoContent,
  createMockLabContent,
  createMockLiveClass,
  createMockQuiz,
  createMockQuizQuestion,
} from './generators';
import { Specialization, Course, Module, LiveClass } from '@/types';

const aiSpec = createMockSpecialization({
  title: 'Artificial Intelligence',
  description: 'Master AI fundamentals, machine learning, and deep learning techniques',
  image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
});

const dataSpec = createMockSpecialization({
  title: 'Data Analytics',
  description: 'Learn data analysis, visualization, and business intelligence',
  image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
});

const seSpec = createMockSpecialization({
  title: 'Software Engineering',
  description: 'Build modern applications with industry best practices',
  image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
});

const aiBeginnerPath = createMockPathway(aiSpec.id, 'beginner', {
  title: 'AI Beginner Path',
  description: 'Start your AI journey with Python and basic machine learning',
});

const aiIntermediatePath = createMockPathway(aiSpec.id, 'intermediate', {
  title: 'AI Intermediate Path',
  description: 'Dive deeper into machine learning algorithms and neural networks',
});

const aiAdvancedPath = createMockPathway(aiSpec.id, 'advanced', {
  title: 'AI Advanced Path',
  description: 'Master deep learning, NLP, and computer vision',
});

const dataBeginnerPath = createMockPathway(dataSpec.id, 'beginner', {
  title: 'Data Analytics Beginner Path',
  description: 'Learn data fundamentals, SQL, and Excel',
});

const dataIntermediatePath = createMockPathway(dataSpec.id, 'intermediate', {
  title: 'Data Analytics Intermediate Path',
  description: 'Master Python for data analysis and visualization',
});

const dataAdvancedPath = createMockPathway(dataSpec.id, 'advanced', {
  title: 'Data Analytics Advanced Path',
  description: 'Advanced analytics, predictive modeling, and big data',
});

const seBeginnerPath = createMockPathway(seSpec.id, 'beginner', {
  title: 'Software Engineering Beginner Path',
  description: 'Learn programming fundamentals and web development basics',
});

const seIntermediatePath = createMockPathway(seSpec.id, 'intermediate', {
  title: 'Software Engineering Intermediate Path',
  description: 'Master full-stack development and databases',
});

const seAdvancedPath = createMockPathway(seSpec.id, 'advanced', {
  title: 'Software Engineering Advanced Path',
  description: 'System design, microservices, and cloud architecture',
});

const mlCourse = createMockCourse(aiSpec.id, 'beginner', {
  title: 'Introduction to Machine Learning',
  description: 'Learn ML fundamentals, algorithms, and build your first models',
  instructor: 'Dr. Sarah Johnson',
  duration: '8 weeks',
  image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
});

const pythonCourse = createMockCourse(aiSpec.id, 'beginner', {
  title: 'Python for Data Science',
  description: 'Master Python programming for data analysis and machine learning',
  instructor: 'Prof. Michael Chen',
  duration: '6 weeks',
  image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
});

const deepLearningCourse = createMockCourse(aiSpec.id, 'advanced', {
  title: 'Deep Learning Specialization',
  description: 'Advanced neural networks, CNNs, RNNs, and transformers',
  instructor: 'Dr. Emily Rodriguez',
  duration: '12 weeks',
  image: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
  prerequisites: [mlCourse.id],
});

const sqlCourse = createMockCourse(dataSpec.id, 'beginner', {
  title: 'SQL for Data Analysis',
  description: 'Master SQL queries, joins, and database operations',
  instructor: 'John Smith',
  duration: '4 weeks',
  image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
});

const webDevCourse = createMockCourse(seSpec.id, 'beginner', {
  title: 'Web Development Fundamentals',
  description: 'HTML, CSS, JavaScript, and modern web development',
  instructor: 'Jane Williams',
  duration: '10 weeks',
  image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
});

const module1 = createMockModule(mlCourse.id, 1, {
  title: 'Introduction to Machine Learning',
  description: 'Understanding ML concepts, types, and applications',
  duration: '2 hours',
});

module1.content = [createMockVideoContent(), createMockLabContent()];
module1.quiz = createMockQuiz(module1.id, {
  questions: [
    createMockQuizQuestion({
      question: 'What is supervised learning?',
      options: [
        'Learning without labels',
        'Learning with labeled data',
        'Reinforcement learning',
        'Unsupervised clustering',
      ],
      correctAnswer: 1,
    }),
    createMockQuizQuestion({
      question: 'Which algorithm is used for classification?',
      options: ['K-Means', 'Linear Regression', 'Decision Trees', 'PCA'],
      correctAnswer: 2,
    }),
    createMockQuizQuestion({
      type: 'true-false',
      question: 'Deep learning is a subset of machine learning',
      options: ['True', 'False'],
      correctAnswer: 0,
    }),
  ],
});

const module2 = createMockModule(mlCourse.id, 2, {
  title: 'Linear Regression',
  description: 'Understanding and implementing linear regression models',
  duration: '3 hours',
});

module2.content = [createMockVideoContent(), createMockLabContent()];
module2.quiz = createMockQuiz(module2.id);

const module3 = createMockModule(mlCourse.id, 3, {
  title: 'Classification Algorithms',
  description: 'Learn decision trees, random forests, and SVM',
  duration: '3 hours',
});

module3.content = [createMockVideoContent(), createMockLabContent()];
module3.quiz = createMockQuiz(module3.id);

mlCourse.moduleIds = [module1.id, module2.id, module3.id];

const liveClass1 = createMockLiveClass(mlCourse.id, {
  title: 'Machine Learning Q&A Session',
  description: 'Join Dr. Sarah Johnson for a live discussion on ML fundamentals',
  instructor: 'Dr. Sarah Johnson',
});

const liveClass2 = createMockLiveClass(mlCourse.id, {
  title: 'Hands-on Project Workshop',
  description: 'Build a complete ML project from scratch',
  instructor: 'Dr. Sarah Johnson',
});

aiBeginnerPath.courseIds = [pythonCourse.id, mlCourse.id];
aiIntermediatePath.courseIds = [pythonCourse.id, mlCourse.id];
aiAdvancedPath.courseIds = [pythonCourse.id, mlCourse.id, deepLearningCourse.id];

dataBeginnerPath.courseIds = [sqlCourse.id];
dataIntermediatePath.courseIds = [sqlCourse.id];
dataAdvancedPath.courseIds = [sqlCourse.id];

seBeginnerPath.courseIds = [webDevCourse.id];
seIntermediatePath.courseIds = [webDevCourse.id];
seAdvancedPath.courseIds = [webDevCourse.id];

aiSpec.pathways = [aiBeginnerPath, aiIntermediatePath, aiAdvancedPath];
dataSpec.pathways = [dataBeginnerPath, dataIntermediatePath, dataAdvancedPath];
seSpec.pathways = [seBeginnerPath, seIntermediatePath, seAdvancedPath];

export const mockSpecializations: Specialization[] = [aiSpec, dataSpec, seSpec];

export const mockCourses: Course[] = [
  mlCourse,
  pythonCourse,
  deepLearningCourse,
  sqlCourse,
  webDevCourse,
];

export const mockModules: Module[] = [module1, module2, module3];

export const mockLiveClasses: LiveClass[] = [liveClass1, liveClass2];

export const mockPathways = [
  ...aiSpec.pathways,
  ...dataSpec.pathways,
  ...seSpec.pathways,
];
