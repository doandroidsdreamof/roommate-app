import { useQuery } from '@tanstack/react-query';
import { profileApi } from '@/api';

export const usePreferenceCheck = () => {
  const { data, isLoading } = useQuery({
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
  };
};
