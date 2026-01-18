import { ListsQueryParams } from '@/api';

export interface HomeSection {
  id: string;
  getTitleFn: (profile: { city?: string; district?: string }) => string;
  getParamsFn: (profile: {
    city?: string;
    district?: string;
  }) => Omit<ListsQueryParams, 'cursor'>;
  dataKey: 'forYou' | 'popular' | 'mostSaved' | 'newest';
}

export const HOME_SECTIONS: HomeSection[] = [
  {
    id: 'forYou',
    getTitleFn: (profile) => `Sizin İçin - ${profile?.district || 'Bölgeniz'}`,
    getParamsFn: (profile) => ({
      city: profile?.city?.toLocaleUpperCase('tr'),
      district: profile?.district?.toLocaleUpperCase('tr'),
    }),
    dataKey: 'forYou',
  },
  {
    id: 'popular',
    getTitleFn: () => 'Popüler İlanlar',
    getParamsFn: (profile) => ({
      city: profile?.city?.toLocaleUpperCase('tr'),
      sortBy: 'viewCount',
      sortOrder: 'desc',
    }),
    dataKey: 'popular',
  },
  {
    id: 'mostSaved',
    getTitleFn: () => 'En Çok Kaydedilenler',
    getParamsFn: (profile) => ({
      city: profile?.city?.toLocaleUpperCase('tr'),
      sortBy: 'bookmarkCount',
      sortOrder: 'desc',
    }),
    dataKey: 'mostSaved',
  },
  {
    id: 'newest',
    getTitleFn: (profile) => `${profile?.city} - Yeni İlanlar`,
    getParamsFn: (profile) => ({
      city: profile?.city?.toLocaleUpperCase('tr'),
    }),
    dataKey: 'newest',
  },
];
