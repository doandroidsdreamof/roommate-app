import { useInfiniteQuery } from '@tanstack/react-query';
import { bookmarkApi } from '../api';

export const useInfiniteBookmarks = () => {
  return useInfiniteQuery({
    queryKey: ['bookmarks'],
    queryFn: ({ pageParam }) =>
      bookmarkApi.getUserBookmarks({
        limit: 20,
        cursor: pageParam,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });
};
