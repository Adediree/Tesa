import { api, simulateNetworkDelay } from './baseApi';
import { Module, Enrollment, UserProgress } from '@/types';
import { mockModules } from '../mock-data/seed';
import { createMockEnrollment, createMockUserProgress } from '../mock-data/generators';

const enrollmentsDB: Enrollment[] = [];
const progressDB: Map<string, UserProgress> = new Map();

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getModulesByCourseId: builder.query<Module[], string>({
      queryFn: async (courseId) => {
        await simulateNetworkDelay();
        const modules = mockModules.filter((m) => m.courseId === courseId);
        return { data: modules };
      },
      providesTags: (result, error, courseId) => [{ type: 'Modules', id: courseId }],
    }),

    getModuleById: builder.query<Module, { courseId: string; moduleId: string }>({
      queryFn: async ({ moduleId }) => {
        await simulateNetworkDelay();
        const module = mockModules.find((m) => m.id === moduleId);

        if (!module) {
          return {
            error: {
              status: 404,
              data: { message: 'Module not found' },
            },
          };
        }

        return { data: module };
      },
      providesTags: (result, error, { moduleId }) => [{ type: 'Modules', id: moduleId }],
    }),

    enrollInCourse: builder.mutation<Enrollment, { userId: string; courseId: string; pathwayId: string }>({
      queryFn: async ({ userId, courseId, pathwayId }) => {
        await simulateNetworkDelay();

        const existingEnrollment = enrollmentsDB.find(
          (e) => e.userId === userId && e.courseId === courseId
        );

        if (existingEnrollment) {
          return { data: existingEnrollment };
        }

        const enrollment = createMockEnrollment(userId, courseId, pathwayId);
        enrollmentsDB.push(enrollment);

        const progressKey = `${userId}-${courseId}`;
        if (!progressDB.has(progressKey)) {
          progressDB.set(progressKey, createMockUserProgress(userId, courseId));
        }

        return { data: enrollment };
      },
      invalidatesTags: ['Enrollments', 'Progress'],
    }),

    getUserEnrollments: builder.query<Enrollment[], string>({
      queryFn: async (userId) => {
        await simulateNetworkDelay();
        const userEnrollments = enrollmentsDB.filter((e) => e.userId === userId);
        return { data: userEnrollments };
      },
      providesTags: (result, error, userId) => [{ type: 'Enrollments', id: userId }],
    }),

    getCourseProgress: builder.query<UserProgress, { userId: string; courseId: string }>({
      queryFn: async ({ userId, courseId }) => {
        await simulateNetworkDelay();
        const progressKey = `${userId}-${courseId}`;
        let progress = progressDB.get(progressKey);

        if (!progress) {
          progress = createMockUserProgress(userId, courseId);
          progressDB.set(progressKey, progress);
        }

        return { data: progress };
      },
      providesTags: (result, error, { userId, courseId }) => [
        { type: 'Progress', id: `${userId}-${courseId}` },
      ],
    }),

    updateModuleProgress: builder.mutation<
      UserProgress,
      { userId: string; courseId: string; moduleId: string; completed: boolean }
    >({
      queryFn: async ({ userId, courseId, moduleId, completed }) => {
        await simulateNetworkDelay();
        const progressKey = `${userId}-${courseId}`;
        let progress = progressDB.get(progressKey);

        if (!progress) {
          progress = createMockUserProgress(userId, courseId);
        }

        if (completed && !progress.completedModules.includes(moduleId)) {
          progress.completedModules.push(moduleId);
        } else if (!completed) {
          progress.completedModules = progress.completedModules.filter((id) => id !== moduleId);
        }

        progress.lastAccessedAt = new Date().toISOString();
        progress.currentModule = moduleId;

        const totalModules = mockModules.filter((m) => m.courseId === courseId).length;
        progress.completionPercentage = Math.round(
          (progress.completedModules.length / totalModules) * 100
        );

        progressDB.set(progressKey, progress);

        return { data: progress };
      },
      invalidatesTags: (result, error, { userId, courseId }) => [
        { type: 'Progress', id: `${userId}-${courseId}` },
      ],
    }),

    completeContent: builder.mutation<
      { success: boolean },
      { userId: string; courseId: string; moduleId: string; contentId: string }
    >({
      queryFn: async ({ userId, courseId, moduleId, contentId }) => {
        await simulateNetworkDelay();
        console.log('Content completed:', { userId, courseId, moduleId, contentId });
        return { data: { success: true } };
      },
      invalidatesTags: (result, error, { userId, courseId }) => [
        { type: 'Progress', id: `${userId}-${courseId}` },
      ],
    }),

    submitQuiz: builder.mutation<
      { success: boolean; score: number },
      { userId: string; courseId: string; moduleId: string; quizId: string; answers: Record<string, string>; score: number }
    >({
      queryFn: async ({ userId, courseId, moduleId, quizId, answers, score }) => {
        await simulateNetworkDelay();
        console.log('Quiz submitted:', { userId, courseId, moduleId, quizId, score });
        return { data: { success: true, score } };
      },
      invalidatesTags: (result, error, { userId, courseId }) => [
        { type: 'Progress', id: `${userId}-${courseId}` },
      ],
    }),
  }),
});

export const {
  useGetModulesByCourseIdQuery,
  useGetModuleByIdQuery,
  useEnrollInCourseMutation,
  useGetUserEnrollmentsQuery,
  useGetCourseProgressQuery,
  useUpdateModuleProgressMutation,
  useCompleteContentMutation,
  useSubmitQuizMutation,
} = courseApi;
