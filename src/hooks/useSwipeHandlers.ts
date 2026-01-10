import { FeedItem } from '@/schemas/feedSchema';
import { useCallback } from 'react';

export const useSwipeHandlers = (
  feed: FeedItem[],
  handleSwipeLike: (userId: string) => void,
  handleSwipePass: (userId: string) => void
) => {
  const handleSwipeRight = useCallback(
    (cardIndex: number) => {
      const profile = feed[cardIndex];
      if (profile) handleSwipePass(profile.userId);
    },
    [feed, handleSwipePass]
  );

  const handleSwipeLeft = useCallback(
    (cardIndex: number) => {
      const profile = feed[cardIndex];
      if (profile) handleSwipeLike(profile.userId);
    },
    [feed, handleSwipeLike]
  );

  return { handleSwipeRight, handleSwipeLeft };
};
