import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookmarkApi } from '@/api';
import { useState } from 'react';

interface UseBookmarkOptions {
  postingId: string;
  initialBookmarked?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useBookmark = ({
  postingId,
  initialBookmarked = false,
  onSuccess,
  onError,
}: UseBookmarkOptions) => {
  const queryClient = useQueryClient();
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const queryKeys = ['mostSaved', 'newest', 'forYou', 'popular'];

  const bookmarkMutation = useMutation({
    mutationFn: () => bookmarkApi.bookmarkPosting(postingId),
    onMutate: async () => {
      setIsBookmarked(true);

      await queryClient.cancelQueries({ queryKey: ['bookmarks'] });

      return { previousState: isBookmarked };
    },
    onError: (error, _, context) => {
      if (context) {
        setIsBookmarked(context.previousState);
      }
      onError?.(error);
    },
    onSuccess: async () => {
      void queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      void queryClient.invalidateQueries({ queryKey: ['posting'] });

      await Promise.all(
        queryKeys.map((item) =>
          queryClient.invalidateQueries({
            queryKey: ['listings', item],
          })
        )
      );
      onSuccess?.();
    },
  });

  const unbookmarkMutation = useMutation({
    mutationFn: () => bookmarkApi.unbookmarkPosting(postingId),
    onMutate: async () => {
      setIsBookmarked(false);

      await queryClient.cancelQueries({ queryKey: ['bookmarks'] });

      return { previousState: isBookmarked };
    },
    onError: (error, _, context) => {
      if (context) {
        setIsBookmarked(context.previousState);
      }
      onError?.(error);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      onSuccess?.();
    },
  });

  const toggleBookmark = () => {
    if (isBookmarked) {
      unbookmarkMutation.mutate();
    } else {
      bookmarkMutation.mutate();
    }
  };

  return {
    isBookmarked,
    toggleBookmark,
    isLoading: bookmarkMutation.isPending || unbookmarkMutation.isPending,
  };
};
