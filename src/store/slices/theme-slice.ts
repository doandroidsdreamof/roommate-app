import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateCreator } from 'zustand';
import { secureStorage } from '../../storage/storage';
import { RootStore } from '../index';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeSlice {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export const createThemeSlice: StateCreator<RootStore, [], [], ThemeSlice> = (
  set
) => ({
  themeMode: 'system',

  setThemeMode: (mode) => {
    set({ themeMode: mode });
  },
});
