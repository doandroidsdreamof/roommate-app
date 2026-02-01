import { profileApi } from '@/api';
import { useStore } from '@/store/index';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useProfile = () => {
  const { isAuthenticated, setProfile, setProfileError } = useStore();

  const { data, isLoading, error, isFetched, refetch, isRefetching } = useQuery(
    {
      queryKey: ['profile'],
      queryFn: async () => {
        const response = await profileApi.getProfile();

        if (response.data) {
          void setProfile(response.data); //* zustand
          setProfileError(null);
        } else if (response.error === 'PROFILE_NOT_FOUND') {
          void setProfile(null);
          setProfileError('PROFILE_NOT_FOUND');
        } else if (response.error === 'NETWORK_ERROR') {
          setProfileError('NETWORK_ERROR');
        }

        return response;
      },
      enabled: isAuthenticated,
      staleTime: 5 * 60 * 1000,
      retry: (failureCount, error) => {
        if (error instanceof AxiosError && error.response?.status === 404) {
          return false;
        }
        return failureCount < 1;
      },
    }
  );

  return {
    profile: data?.data ?? null, //* React Query
    isLoading,
    error: data?.error ?? (error ? 'NETWORK_ERROR' : null),
    isFetched,
    refetch,
    isRefetching,
  };
};
