import { postingApi } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useUserPostings = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user-postings'],
    queryFn: () => postingApi.getUserPostings(),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return {
    postings: Array.isArray(data?.data) ? data.data : [],
    isLoading,
    error,
    refetch,
  };
};