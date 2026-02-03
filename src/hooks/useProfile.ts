import { profileApi } from '@/api';
import { useStore } from '@/store/index';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export type ProfileError =
  | 'NETWORK_ERROR'
  | 'PROFILE_NOT_FOUND'
  | 'UNKNOWN_ERROR'
  | null;

export const useProfile = () => {
  const { setProfile } = useStore();

  const {
    data,
    isLoading,
    error,
    isFetched,
    refetch,
    isRefetching,
    isPending,
    status,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await profileApi.getProfile();
      return response;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return false;
      }
      return failureCount < 1;
    },
  });

  useEffect(() => {
    if (data?.data) {
      setProfile(data.data);
    }
  }, [data, setProfile]);

  const profileError: ProfileError =
    data?.error === 'PROFILE_NOT_FOUND'
      ? 'PROFILE_NOT_FOUND'
      : data?.error === 'NETWORK_ERROR' || error
        ? 'NETWORK_ERROR'
        : null;

  return {
    profile: data?.data ?? null,
    profileError,
    isLoading,
    isFetched,
    isPending,
    refetch,
    status,
    isRefetching,
  };
};
