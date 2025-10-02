import { api, simulateNetworkDelay } from './baseApi';
import { Quiz, QuizSubmission } from '@/types';
import { mockModules } from '../mock-data/seed';
import { generateId } from '../utils';

const submissionsDB: QuizSubmission[] = [];

export const quizApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getQuizByModuleId: builder.query<Quiz, string>({
      queryFn: async (moduleId) => {
        await simulateNetworkDelay();
        const module = mockModules.find((m) => m.id === moduleId);

        if (!module || !module.quiz) {
          return {
            error: {
              status: 404,
              data: { message: 'Quiz not found' },
            },
          };
        }

        return { data: module.quiz };
      },
      providesTags: (result, error, moduleId) => [{ type: 'Quiz', id: moduleId }],
    }),

    submitQuiz: builder.mutation<
      QuizSubmission,
      { userId: string; quizId: string; answers: Record<string, string | number> }
    >({
      queryFn: async ({ userId, quizId, answers }) => {
        await simulateNetworkDelay();

        const module = mockModules.find((m) => m.quiz?.id === quizId);
        if (!module || !module.quiz) {
          return {
            error: {
              status: 404,
              data: { message: 'Quiz not found' },
            },
          };
        }

        const quiz = module.quiz;
        let totalScore = 0;
        let earnedScore = 0;

        quiz.questions.forEach((question) => {
          totalScore += question.points;
          const userAnswer = answers[question.id];
          if (userAnswer !== undefined && userAnswer === question.correctAnswer) {
            earnedScore += question.points;
          }
        });

        const percentageScore = (earnedScore / totalScore) * 100;
        const passed = percentageScore >= quiz.passingScore;

        const submission: QuizSubmission = {
          id: generateId(),
          userId,
          quizId,
          answers,
          score: percentageScore,
          passed,
          submittedAt: new Date().toISOString(),
        };

        submissionsDB.push(submission);

        return { data: submission };
      },
      invalidatesTags: ['Quiz'],
    }),

    getQuizSubmissions: builder.query<QuizSubmission[], { userId: string; quizId: string }>({
      queryFn: async ({ userId, quizId }) => {
        await simulateNetworkDelay();
        const submissions = submissionsDB.filter(
          (s) => s.userId === userId && s.quizId === quizId
        );
        return { data: submissions };
      },
      providesTags: ['Quiz'],
    }),

    getLatestQuizSubmission: builder.query<QuizSubmission | null, { userId: string; quizId: string }>({
      queryFn: async ({ userId, quizId }) => {
        await simulateNetworkDelay();
        const submissions = submissionsDB
          .filter((s) => s.userId === userId && s.quizId === quizId)
          .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

        return { data: submissions[0] || null };
      },
      providesTags: ['Quiz'],
    }),
  }),
});

export const {
  useGetQuizByModuleIdQuery,
  useSubmitQuizMutation,
  useGetQuizSubmissionsQuery,
  useGetLatestQuizSubmissionQuery,
} = quizApi;
