import { api, simulateNetworkDelay } from './baseApi';
import { LiveClass } from '@/types';
import { mockLiveClasses } from '../mock-data/seed';

const liveClassesDB: LiveClass[] = [...mockLiveClasses];

export const liveClassApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLiveClasses: builder.query<LiveClass[], { courseId?: string }>({
      queryFn: async ({ courseId }) => {
        await simulateNetworkDelay();

        let classes = liveClassesDB;
        if (courseId) {
          classes = classes.filter((c) => c.courseId === courseId);
        }

        return { data: classes };
      },
      providesTags: ['LiveClasses'],
    }),

    getLiveClassById: builder.query<LiveClass, string>({
      queryFn: async (id) => {
        await simulateNetworkDelay();
        const liveClass = liveClassesDB.find((c) => c.id === id);

        if (!liveClass) {
          return {
            error: {
              status: 404,
              data: { message: 'Live class not found' },
            },
          };
        }

        return { data: liveClass };
      },
      providesTags: (result, error, id) => [{ type: 'LiveClasses', id }],
    }),

    registerForLiveClass: builder.mutation<LiveClass, { classId: string; userId: string }>({
      queryFn: async ({ classId, userId }) => {
        await simulateNetworkDelay();

        const classIndex = liveClassesDB.findIndex((c) => c.id === classId);

        if (classIndex === -1) {
          return {
            error: {
              status: 404,
              data: { message: 'Live class not found' },
            },
          };
        }

        const liveClass = liveClassesDB[classIndex];

        if (liveClass.enrolledUsers.includes(userId)) {
          return { data: liveClass };
        }

        if (
          liveClass.maxParticipants &&
          liveClass.enrolledUsers.length >= liveClass.maxParticipants
        ) {
          return {
            error: {
              status: 400,
              data: { message: 'Class is full' },
            },
          };
        }

        liveClass.enrolledUsers.push(userId);

        return { data: liveClass };
      },
      invalidatesTags: (result, error, { classId }) => [{ type: 'LiveClasses', id: classId }],
    }),

    unregisterFromLiveClass: builder.mutation<LiveClass, { classId: string; userId: string }>({
      queryFn: async ({ classId, userId }) => {
        await simulateNetworkDelay();

        const classIndex = liveClassesDB.findIndex((c) => c.id === classId);

        if (classIndex === -1) {
          return {
            error: {
              status: 404,
              data: { message: 'Live class not found' },
            },
          };
        }

        const liveClass = liveClassesDB[classIndex];
        liveClass.enrolledUsers = liveClass.enrolledUsers.filter((id) => id !== userId);

        return { data: liveClass };
      },
      invalidatesTags: (result, error, { classId }) => [{ type: 'LiveClasses', id: classId }],
    }),

    getUserLiveClasses: builder.query<LiveClass[], string>({
      queryFn: async (userId) => {
        await simulateNetworkDelay();
        const userClasses = liveClassesDB.filter((c) => c.enrolledUsers.includes(userId));
        return { data: userClasses };
      },
      providesTags: ['LiveClasses'],
    }),
  }),
});

export const {
  useGetLiveClassesQuery,
  useGetLiveClassByIdQuery,
  useRegisterForLiveClassMutation,
  useUnregisterFromLiveClassMutation,
  useGetUserLiveClassesQuery,
} = liveClassApi;
