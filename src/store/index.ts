import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createAuthSlice, AuthSlice } from './slices/auth-slice';
import { createThemeSlice, ThemeSlice } from './slices/theme-slice';
import { createProfileSlice, ProfileSlice } from './slices/profile-slice';
import { createFilterSlice, FilterSlice } from './slices/filter-slice';
import Storage from 'expo-sqlite/kv-store';
import {
  createNotificationSlice,
  NotificationSlice,
} from './slices/notification-slice';

export type RootStore = AuthSlice &
  ThemeSlice &
  ProfileSlice &
  FilterSlice &
  NotificationSlice;

export const useStore = create<RootStore>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createThemeSlice(...a),
      ...createProfileSlice(...a),
      ...createFilterSlice(...a),
      ...createNotificationSlice(...a),
    }),
    {
      name: 'roommate-app-storage',
      storage: createJSONStorage(() => ({
        getItem: (name) => Storage.getItemSync(name),
        setItem: (name, value) => Storage.setItem(name, value),
        removeItem: (name) => Storage.removeItem(name),
      })),
      partialize: (state) => ({
        themeMode: state.themeMode,
      }),
    }
  )
);
