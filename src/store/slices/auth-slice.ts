import { StateCreator } from 'zustand';
import { secureStorage } from '@/storage/storage';

export interface AuthSlice {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (accessToken, refreshToken) => {
    try {
      await secureStorage.setTokens(accessToken, refreshToken);
      set({
        isAuthenticated: true,
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
        error: null,
      });
    } catch (error) {
      console.error('Logout failed:', error);
      set({
        isAuthenticated: false,
      });
    }
  },

  checkAuth: async () => {
    try {
      const token = await secureStorage.getAccessToken(); // TODO instead verify => /auth/verify

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
});
