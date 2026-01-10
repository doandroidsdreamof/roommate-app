import { swipeApi } from '@/api';
import { FeedItem } from '@/schemas/feedSchema';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

const REFETCH_THRESHOLD = 2;

export const useSwipeFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: feed = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<FeedItem[]>({
    queryKey: ['swipe'],
    queryFn: () => swipeApi.getFeed(),
  });

  const handleIndexChange = useCallback(
    (index: number) => {
      setCurrentIndex(index);

      if (index >= feed.length - REFETCH_THRESHOLD && feed.length > 0) {
        void refetch();
      }
    },
    [feed.length, refetch]
  );

  return {
    feed,
    isLoading,
    isFetching,
    currentIndex,
    handleIndexChange,
  };
};
