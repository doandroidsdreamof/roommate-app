import { messagingApi } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: () => messagingApi.getConversations(),
    staleTime: 30000,
  });
};
