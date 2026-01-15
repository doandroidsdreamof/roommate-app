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
  hasProfile: boolean;
  isProfileLoading: boolean;
  isProfileLoaded: boolean;

  setProfile: (profile: UserProfile | null) => Promise<void>;
  setHasProfile: (hasProfile: boolean) => void;
  loadProfileFromCache: () => Promise<void>;
  clearProfile: () => Promise<void>;
  updateProfileField: <K extends keyof UserProfile>(
    field: K,
    value: UserProfile[K]
  ) => Promise<void>;
}

export const createProfileSlice: StateCreator<ProfileSlice> = (set, get) => ({
  profile: null,
  hasProfile: false,
  isProfileLoading: false,
  isProfileLoaded: false,

  setProfile: async (profile) => {
    try {
      if (profile) {
        await AsyncStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile));
      } else {
        await AsyncStorage.removeItem(PROFILE_CACHE_KEY);
      }
      set({
        profile,
        hasProfile: !!profile,
        isProfileLoaded: true,
      });
    } catch (error) {
      console.error('Failed to save profile:', error);
      set({
        profile,
        hasProfile: !!profile,
        isProfileLoaded: true,
      });
    }
  },

  setHasProfile: (hasProfile) => set({ hasProfile }),

  loadProfileFromCache: async () => {
    try {
      set({ isProfileLoading: true });
      const cached = await AsyncStorage.getItem(PROFILE_CACHE_KEY);

      if (cached) {
        const profile = JSON.parse(cached);
        set({
          profile,
          hasProfile: true,
          isProfileLoading: false,
        });
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
      set({
        profile: null,
        hasProfile: false,
        isProfileLoaded: false,
      });
    } catch (error) {
      console.error('Failed to clear profile:', error);
      set({
        profile: null,
        hasProfile: false,
        isProfileLoaded: false,
      });
    }
  },

  updateProfileField: async (field, value) => {
    const currentProfile = get().profile;
    if (!currentProfile) return;

    const updatedProfile = {
      ...currentProfile,
      [field]: value,
    };

    await get().setProfile(updatedProfile);
  },
});
