import { postingApi } from '@/api';
import { CreatePostingFormData } from '@/schemas/postingSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePosting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostingFormData) => postingApi.create(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['user-postings'] });
      void queryClient.invalidateQueries({ queryKey: ['postings'] });
    },
    onError: (error) => {
      console.error('Failed to create posting:', error);
    },
  });
};