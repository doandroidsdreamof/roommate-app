import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createAuthSlice, AuthSlice } from './slices/auth-slice';
import { createThemeSlice, ThemeSlice } from './slices/theme-slice';
import { createProfileSlice, ProfileSlice } from './slices/profile-slice';
import { createFilterSlice, FilterSlice } from './slices/filter-slice';
import Storage from 'expo-sqlite/kv-store';

export type RootStore = AuthSlice & ThemeSlice & ProfileSlice & FilterSlice;

export const useStore = create<RootStore>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createThemeSlice(...a),
      ...createProfileSlice(...a),
      ...createFilterSlice(...a),
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
