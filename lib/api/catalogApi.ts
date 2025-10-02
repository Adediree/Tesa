import { api, simulateNetworkDelay } from './baseApi';
import { Specialization, Course, Pathway } from '@/types';
import { mockSpecializations, mockCourses, mockPathways } from '../mock-data/seed';

export const catalogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSpecializations: builder.query<Specialization[], void>({
      queryFn: async () => {
        await simulateNetworkDelay();
        return { data: mockSpecializations };
      },
      providesTags: ['Specializations'],
    }),

    getSpecializationById: builder.query<Specialization, string>({
      queryFn: async (id) => {
        await simulateNetworkDelay();
        const specialization = mockSpecializations.find((s) => s.id === id);

        if (!specialization) {
          return {
            error: {
              status: 404,
              data: { message: 'Specialization not found' },
            },
          };
        }

        return { data: specialization };
      },
      providesTags: (result, error, id) => [{ type: 'Specializations', id }],
    }),

    getCourses: builder.query<Course[], { specializationId?: string; level?: string }>({
      queryFn: async ({ specializationId, level }) => {
        await simulateNetworkDelay();

        let filteredCourses = mockCourses;

        if (specializationId) {
          filteredCourses = filteredCourses.filter(
            (c) => c.specializationId === specializationId
          );
        }

        if (level) {
          filteredCourses = filteredCourses.filter((c) => c.level === level);
        }

        return { data: filteredCourses };
      },
      providesTags: ['Courses'],
    }),

    getCourseById: builder.query<Course, string>({
      queryFn: async (id) => {
        await simulateNetworkDelay();
        const course = mockCourses.find((c) => c.id === id);

        if (!course) {
          return {
            error: {
              status: 404,
              data: { message: 'Course not found' },
            },
          };
        }

        return { data: course };
      },
      providesTags: (result, error, id) => [{ type: 'Courses', id }],
    }),

    getPathwayById: builder.query<Pathway, string>({
      queryFn: async (id) => {
        await simulateNetworkDelay();
        const pathway = mockPathways.find((p) => p.id === id);

        if (!pathway) {
          return {
            error: {
              status: 404,
              data: { message: 'Pathway not found' },
            },
          };
        }

        return { data: pathway };
      },
    }),

    searchCourses: builder.query<Course[], string>({
      queryFn: async (query) => {
        await simulateNetworkDelay();
        const lowerQuery = query.toLowerCase();

        const results = mockCourses.filter(
          (course) =>
            course.title.toLowerCase().includes(lowerQuery) ||
            course.description.toLowerCase().includes(lowerQuery)
        );

        return { data: results };
      },
    }),
  }),
});

export const {
  useGetSpecializationsQuery,
  useGetSpecializationByIdQuery,
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetPathwayByIdQuery,
  useSearchCoursesQuery,
} = catalogApi;
