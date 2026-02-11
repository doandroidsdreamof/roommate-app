import { profileApi } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const usePreferences = () => {
  const {
    data,
    isLoading,
    error,
    isFetched,
    refetch,
    isRefetching,
    isPending,
  } = useQuery({
    queryKey: ['preferences'],
    queryFn: async () => {
      const response = await profileApi.getPreferences();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  return {
    preferences: data ?? null,
    isLoading,
    isFetched,
    isPending,
    refetch,
    isRefetching,
    error,
  };
};

export const usePreferenceCheck = () => {
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ['preferenceExists'],
    queryFn: async () => {
      const response = await profileApi.checkPreferenceExists();
      return response.exists;
    },
    staleTime: Infinity,
  });

  return {
    hasPreferences: data ?? false,
    isLoading,
    isFetched,
  };
};