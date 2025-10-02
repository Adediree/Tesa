import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSettings } from '@/types';

const initialState: UserSettings = {
  fontSize: 'medium',
  fontFamily: 'sans-serif',
  theme: 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<'sans-serif' | 'serif' | 'mono'>) => {
      state.fontFamily = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setSettings: (state, action: PayloadAction<UserSettings>) => {
      return action.payload;
    },
  },
});

export const { setFontSize, setFontFamily, setTheme, setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
