import Storage from 'expo-sqlite/kv-store';
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

export type ProfileError =
  | 'NETWORK_ERROR'
  | 'PROFILE_NOT_FOUND'
  | 'UNKNOWN_ERROR'
  | null;

export interface ProfileSlice {
  profile: UserProfile | null;
  hasProfile: boolean;
  isProfileLoading: boolean;
  isProfileLoaded: boolean;
  profileError: ProfileError;

  setProfile: (profile: UserProfile | null) => Promise<void>;
  setHasProfile: (hasProfile: boolean) => void;
  setProfileError: (error: ProfileError) => void;
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
  profileError: null,

  setProfile: async (profile) => {
    try {
      if (profile) {
        await Storage.setItemAsync(PROFILE_CACHE_KEY, JSON.stringify(profile));
      } else {
        await Storage.removeItemAsync(PROFILE_CACHE_KEY);
      }
      set({
        profile,
        hasProfile: !!profile,
        isProfileLoaded: true,
        profileError: null,
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

  setProfileError: (error) => set({ profileError: error }),

  loadProfileFromCache: async () => {
    try {
      set({ isProfileLoading: true, profileError: null });
      const cached = await Storage.getItem(PROFILE_CACHE_KEY);

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
      set({ isProfileLoading: false, profileError: 'UNKNOWN_ERROR' });
    }
  },

  clearProfile: async () => {
    try {
      await Storage.removeItem(PROFILE_CACHE_KEY);
      set({
        profile: null,
        hasProfile: false,
        isProfileLoaded: false,
        profileError: null,
      });
    } catch (error) {
      console.error('Failed to clear profile:', error);
      set({
        profile: null,
        hasProfile: false,
        isProfileLoaded: false,
        profileError: null,
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
