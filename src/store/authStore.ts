import { create } from 'zustand';
import { secureStorage } from '../storage/storage';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  city: string;
  gender: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  profile: UserProfile | null;
  error: string | null;

  login: (
    accessToken: string,
    refreshToken: string,
    profile?: UserProfile
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setProfile: (profile: UserProfile) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  profile: null,
  error: null,

  login: async (accessToken, refreshToken, profile) => {
    try {
      await secureStorage.setTokens(accessToken, refreshToken);
      set({
        isAuthenticated: true,
        profile: profile || null,
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
        profile: null,
        error: null,
      });
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear state even if storage fails
      set({
        isAuthenticated: false,
        profile: null,
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

      // TODO: Verify token is valid by making API call
      // For now, just check if it exists
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

  setProfile: (profile) => set({ profile, error: null }),
}));
