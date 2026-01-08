import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  loadTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
  themeMode: 'system',

  loadTheme: async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themeMode');
      if (savedTheme) {
        set({ themeMode: savedTheme as ThemeMode });
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  },

  setThemeMode: async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem('themeMode', mode);
      set({ themeMode: mode });
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  },
}));
