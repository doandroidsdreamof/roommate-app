import { swipeApi } from '@/api';
import { FeedItem } from '@/schemas/feedSchema';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

const REFETCH_THRESHOLD = 2;

export const useSwipeFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allFeed, setAllFeed] = useState<FeedItem[]>([]);

  const {
    data: feed = [],
    isLoading,
    isFetching,
    error,
    refetch,
    dataUpdatedAt,
  } = useQuery<FeedItem[]>({
    queryKey: ['swipe'],
    staleTime: 0,
    queryFn: () => swipeApi.getFeed(),
  });

  useEffect(() => {
    if (feed.length > 0) {
      setAllFeed((prev) => {
        const newItems = feed.filter(
          (item) => !prev.some((p) => p.userId === item.userId)
        );
        return [...prev, ...newItems];
      });
    }
  }, [dataUpdatedAt, feed]);

  const handleIndexChange = useCallback(
    (index: number) => {
      setCurrentIndex(index);

      if (index >= feed.length - REFETCH_THRESHOLD && feed.length > 0) {
        void refetch();
      }
    },
    [feed.length, refetch]
  );

  const swipeLimitError =
    error instanceof AxiosError && error.response?.status === 429
      ? {
          message: error.response.data.message,
          resetAt: error.response.data.details?.resetAt,
        }
      : null;

  return {
    feed: allFeed,
    isLoading,
    isFetching,
    currentIndex,
    handleIndexChange,
    swipeLimitError,
  };
};
