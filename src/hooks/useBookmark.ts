import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookmarkApi } from '@/api';

interface UseBookmarkOptions {
  postingId: string;
  isBookmarked: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useBookmark = ({
  postingId,
  isBookmarked,
  onSuccess,
  onError,
}: UseBookmarkOptions) => {
  const queryClient = useQueryClient();
  const queryKeys = ['mostSaved', 'newest', 'forYou', 'popular'];

  const invalidateAll = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] }),
      queryClient.invalidateQueries({ queryKey: ['posting', postingId] }),
      ...queryKeys.map((key) =>
        queryClient.invalidateQueries({ queryKey: ['listings', key] })
      ),
    ]);
  };

  const bookmarkMutation = useMutation({
    mutationFn: () => bookmarkApi.bookmarkPosting(postingId),
    onError: (error) => onError?.(error),
    onSuccess: async () => {
      await invalidateAll();
      onSuccess?.();
    },
  });

  const unbookmarkMutation = useMutation({
    mutationFn: () => bookmarkApi.unbookmarkPosting(postingId),
    onError: (error) => onError?.(error),
    onSuccess: async () => {
      await invalidateAll();
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