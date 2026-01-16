import { profileApi } from '@/api';
import { useQuery } from '@tanstack/react-query';

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
