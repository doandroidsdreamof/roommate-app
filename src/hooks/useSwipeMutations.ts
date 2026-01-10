import { swipeApi } from '@/api';
import { SwipeResponse } from '@/api/swipeApi';
import { FeedItem } from '@/schemas/feedSchema';
import { useMutation } from '@tanstack/react-query';

export type SwipeDirection = 'pass' | 'like';

const useSwipeMutations = (
  feed: FeedItem[],
  onMatch?: (profile: FeedItem) => void
) => {
  const swipeMutation = useMutation({
    mutationFn: async ({
      swipedId,
      direction,
    }: {
      swipedId: string;
      direction: SwipeDirection;
    }): Promise<SwipeResponse | undefined> => {
      if (__DEV__) {
        console.log(
          `Swiped ${direction === 'like' ? 'RIGHT (LIKE)' : 'LEFT (PASS)'} on: ${swipedId}`
        );
      }
      if (direction === 'like') {
        return swipeApi.swipeLike(swipedId);
      } else {
        await swipeApi.swipePass(swipedId);
        return undefined;
      }
    },
    onSuccess: (data, variables) => {
      if (variables.direction === 'like' && data?.matched) {
        if (__DEV__) console.log('🔥 IT IS A MATCH!');

        // Find the matched profile in feed
        const matchedProfile = feed.find(
          (item) => item.userId === data.swipe.swipedId
        );

        if (matchedProfile) {
          onMatch?.(matchedProfile);
        }
      }
    },
    onError: (error, variables) => {
      console.error(`Failed to ${variables.direction} profile:`, error);
    },
  });

  const handleSwipeLike = (swipedId: string) => {
    swipeMutation.mutate({ swipedId, direction: 'like' });
  };

  const handleSwipePass = (swipedId: string) => {
    swipeMutation.mutate({ swipedId, direction: 'pass' });
  };

  return {
    handleSwipeLike,
    handleSwipePass,
    isLoading: swipeMutation.isPending,
    error: swipeMutation.error,
  };
};

export default useSwipeMutations;
