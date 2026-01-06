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

  setAuthenticated: (value: boolean) => void;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  profile: null,

  setAuthenticated: (value) => set({ isAuthenticated: value }),

  login: async (accessToken, refreshToken) => {
    await secureStorage.setTokens(accessToken, refreshToken);
    set({ isAuthenticated: true });
  },

  logout: async () => {
    await secureStorage.clearTokens();
    set({ isAuthenticated: false, profile: null });
  },

  checkAuth: async () => {
    const token = await secureStorage.getAccessToken();
    set({
      isAuthenticated: !!token,
      isLoading: false,
    });
  },

  setProfile: (profile) => set({ profile }),

  clearProfile: () => set({ profile: null }),
}));
