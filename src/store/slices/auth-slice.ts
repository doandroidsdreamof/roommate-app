import { StateCreator } from 'zustand';
import { secureStorage } from '@/storage/storage';

export interface AuthSlice {
  isAuthenticated: boolean;
  isLoading: boolean;
  hasProfile: boolean;
  error: string | null;

  login: (
    accessToken: string,
    refreshToken: string,
    hasProfile: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setHasProfile: (hasProfile: boolean) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  isAuthenticated: false,
  isLoading: true,
  hasProfile: false,
  error: null,

  login: async (accessToken, refreshToken, hasProfile) => {
    try {
      await secureStorage.setTokens(accessToken, refreshToken);
      set({
        isAuthenticated: true,
        hasProfile,
        error: null,
      });
    } catch (error) {
      console.error('Login failed:', error);
      set({ error: 'Failed to save authentication' });
      throw error;
    }
  },

  logout: async () => {
    try {
      await secureStorage.clearTokens();
      set({
        isAuthenticated: false,
        hasProfile: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout failed:', error);
      set({
        isAuthenticated: false,
        hasProfile: false,
      });
    }
  },

  checkAuth: async () => {
    try {
      const token = await secureStorage.getAccessToken();

      if (!token) {
        set({ isAuthenticated: false, isLoading: false });
        return;
      }

      set({
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Auth check failed:', error);
      set({
        isAuthenticated: false,
        isLoading: false,
        error: 'Failed to check authentication',
      });
    }
  },

  setHasProfile: (hasProfile) => set({ hasProfile }),
});
