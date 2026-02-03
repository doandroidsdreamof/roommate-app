import { StateCreator } from 'zustand';

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

  setProfile: (profile: UserProfile | null) => void;
  clearProfile: () => void;
}

export const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
  profile: null,
  profileError: null,

  setProfile: (profile) => {
    set({
      profile,
    });
  },

  clearProfile: () => {
    set({
      profile: null,
    });
  },
});
