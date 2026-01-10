import { swipeApi } from '@/api';
import { SwipeResponse } from '@/api/swipeApi';
import { useMutation } from '@tanstack/react-query';

export type SwipeDirection = 'pass' | 'like';

const useSwipe = (onMatch?: (data: SwipeResponse) => void) => {
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
      // Check if it's a like and if match is true
      if (variables.direction === 'like' && data?.match) {
        if (__DEV__) console.log('🔥 IT IS A MATCH!');
        onMatch?.(data); // Trigger the callback passed from your Screen
      }
    },
    onError: (error, variables, context) => {
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

export default useSwipe;
