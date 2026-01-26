import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAuthSlice, AuthSlice } from './slices/auth-slice';
import { createThemeSlice, ThemeSlice } from './slices/theme-slice';
import { createProfileSlice, ProfileSlice } from './slices/profile-slice';
import { createFilterSlice, FilterSlice } from './slices/filter-slice';
import { createMessagingSlice, MessagingSLice } from './slices/messaging-slice';

export type RootStore = AuthSlice &
  ThemeSlice &
  ProfileSlice &
  FilterSlice &
  MessagingSLice;

export const useStore = create<RootStore>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createThemeSlice(...a),
      ...createProfileSlice(...a),
      ...createFilterSlice(...a),
      ...createMessagingSlice(...a),
    }),
    {
      name: 'roommate-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
      }),
    }
  )
);
