import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProgress, Enrollment, Bookmark } from '@/types';

interface ProgressState {
  enrollments: Enrollment[];
  progress: Record<string, UserProgress>;
  bookmarks: Bookmark[];
}

const initialState: ProgressState = {
  enrollments: [],
  progress: {},
  bookmarks: [],
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    addEnrollment: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments.push(action.payload);
    },
    updateProgress: (state, action: PayloadAction<UserProgress>) => {
      state.progress[action.payload.courseId] = action.payload;
    },
    completeModule: (state, action: PayloadAction<{ courseId: string; moduleId: string }>) => {
      const progress = state.progress[action.payload.courseId];
      if (progress && !progress.completedModules.includes(action.payload.moduleId)) {
        progress.completedModules.push(action.payload.moduleId);
        progress.lastAccessedAt = new Date().toISOString();
      }
    },
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      state.bookmarks.push(action.payload);
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter(b => b.id !== action.payload);
    },
  },
});

export const { addEnrollment, updateProgress, completeModule, addBookmark, removeBookmark } = progressSlice.actions;
export default progressSlice.reducer;
