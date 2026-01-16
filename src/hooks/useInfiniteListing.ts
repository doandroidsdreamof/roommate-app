import { useInfiniteQuery } from '@tanstack/react-query';
import { postingApi } from '@/api';
import { ListsQueryParams } from '@/api/postingApi';

export const useInfiniteListing = (
  params: Omit<ListsQueryParams, 'cursor'>
) => {
  return useInfiniteQuery({
    queryKey: ['listings', params],
    queryFn: ({ pageParam }) =>
      postingApi.getLists({
        ...params,
        cursor: pageParam,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage?.hasMore ? lastPage.nextCursor : undefined;
    },
  });
};
