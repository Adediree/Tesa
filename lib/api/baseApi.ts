import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: [
    'User',
    'Specializations',
    'Courses',
    'Modules',
    'LiveClasses',
    'Enrollments',
    'Progress',
    'Bookmarks',
    'Quiz',
  ],
  endpoints: () => ({}),
});

export const simulateNetworkDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
