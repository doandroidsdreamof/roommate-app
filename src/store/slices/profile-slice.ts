import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateCreator } from 'zustand';

const PROFILE_CACHE_KEY = '@user_profile';

export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  city: string;
  district: string;
  photoUrl: string | null;
  photoVerified: boolean;
  accountStatus: 'active' | 'suspended' | 'deleted';
  lastActiveAt: string | null;
}

export interface ProfileSlice {
  profile: UserProfile | null;
  isProfileLoading: boolean;

  setProfile: (profile: UserProfile) => Promise<void>;
  loadProfileFromCache: () => Promise<void>;
  clearProfile: () => Promise<void>;
  updateProfileField: <K extends keyof UserProfile>(
    field: K,
    value: UserProfile[K]
  ) => Promise<void>;
}

export const createProfileSlice: StateCreator<ProfileSlice> = (set, get) => ({
  profile: null,
  isProfileLoading: false,

  setProfile: async (profile) => {
    try {
      await AsyncStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile));
      set({ profile });
    } catch (error) {
      console.error('Failed to save profile:', error);
      set({ profile });
    }
  },

  loadProfileFromCache: async () => {
    try {
      set({ isProfileLoading: true });
      const cached = await AsyncStorage.getItem(PROFILE_CACHE_KEY);

      if (cached) {
        set({ profile: JSON.parse(cached), isProfileLoading: false });
      } else {
        set({ isProfileLoading: false });
      }
    } catch (error) {
      console.error('Failed to load cached profile:', error);
      set({ isProfileLoading: false });
    }
  },

  clearProfile: async () => {
    try {
      await AsyncStorage.removeItem(PROFILE_CACHE_KEY);
      set({ profile: null });
    } catch (error) {
      console.error('Failed to clear profile:', error);
      set({ profile: null });
    }
  },

  updateProfileField: async (field, value) => {
    const currentProfile = get().profile;
    if (!currentProfile) return;

    const updatedProfile = {
      ...currentProfile,
      [field]: value,
      updatedAt: new Date().toISOString(),
    };

    await get().setProfile(updatedProfile);
  },
});
