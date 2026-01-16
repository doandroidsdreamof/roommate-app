import { useQuery } from '@tanstack/react-query';
import { postingApi } from '@/api';
import { useStore } from '@/store';

export const useHomeSections = () => {
  const profile = useStore((state) => state.profile);

  const city = profile?.city?.toLocaleUpperCase('tr');
  const district = profile?.district?.toLocaleUpperCase('tr');

  const forYou = useQuery({
    queryKey: ['listings', 'forYou', city, district],
    queryFn: () =>
      postingApi.getLists({
        city,
        district,
        limit: 10,
      }),
    enabled: !!city && !!district,
  });

  const popular = useQuery({
    queryKey: ['listings', 'popular', city],
    queryFn: () =>
      postingApi.getLists({
        city,
        sortBy: 'viewCount',
        sortOrder: 'desc',
        limit: 10,
      }),
    enabled: !!city,
  });

  const mostSaved = useQuery({
    queryKey: ['listings', 'mostSaved', city],
    queryFn: () =>
      postingApi.getLists({
        city,
        sortBy: 'bookmarkCount',
        sortOrder: 'desc',
        limit: 10,
      }),
    enabled: !!city,
  });

  const newest = useQuery({
    queryKey: ['listings', 'newest', city],
    queryFn: () =>
      postingApi.getLists({
        city,
        limit: 10,
      }),
    enabled: !!city,
  });

  return {
    forYou,
    popular,
    mostSaved,
    newest,
  };
};
