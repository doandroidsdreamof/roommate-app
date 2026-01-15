import { profileApi } from '@/api';
import { useStore } from '@/store/index';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useProfile = () => {
  const { isAuthenticated, setProfile } = useStore();

  const {
    data: profile,
    isLoading,
    error,
    isFetched,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await profileApi.getProfile();
      return response;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (profile) {
      void setProfile(profile);
    } else if (error) {
      void setProfile(null);
    }
  }, [profile, error, setProfile]);

  return { profile, isLoading, error, isFetched };
};
