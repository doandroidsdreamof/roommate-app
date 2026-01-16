import { apiClient } from './apiClient';
import { AuthApi } from './authApi';
import { LocationApi } from './locationApi';
import { PostingApi } from './postingApi';
import { ProfileApi } from './profileApi';
import { SwipeApi } from './swipeApi';
import { BookmarkApi } from './bookmarkApi';

export const authApi = new AuthApi(apiClient);
export const swipeApi = new SwipeApi(apiClient);
export const profileApi = new ProfileApi(apiClient);
export const locationApi = new LocationApi(apiClient);
export const postingApi = new PostingApi(apiClient);
export const bookmarkApi = new BookmarkApi(apiClient);

export type { SwipeResponse } from './swipeApi';
export type {
  Province,
  District,
  Neighborhood,
  NeighborhoodSearchParams,
} from './locationApi';
export type {
  PostingItem,
  ListsQueryParams,
  ListsResponse,
} from './postingApi';
export type {
  BookmarkItem,
  BookmarksResponse,
  BookmarkPaginationParams,
} from './bookmarkApi';
