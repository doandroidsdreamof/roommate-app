import { apiClient } from './apiClient';
import { AuthApi } from './authApi';
import { BookmarkApi } from './bookmarkApi';
import { LocationApi } from './locationApi';
import { MessagingApi } from './messagingApi';
import { PostingApi } from './postingApi';
import { ProfileApi } from './profileApi';
import { SwipeApi } from './swipeApi';

export const authApi = new AuthApi(apiClient);
export const swipeApi = new SwipeApi(apiClient);
export const profileApi = new ProfileApi(apiClient);
export const locationApi = new LocationApi(apiClient);
export const postingApi = new PostingApi(apiClient);
export const bookmarkApi = new BookmarkApi(apiClient);
export const messagingApi = new MessagingApi(apiClient);

export type {
  BookmarkItem, BookmarkPaginationParams, BookmarksResponse
} from './bookmarkApi';
export type {
  District,
  Neighborhood,
  NeighborhoodSearchParams, Province
} from './locationApi';
export type { Conversation } from './messagingApi';
export type {
  ListsQueryParams,
  ListsResponse, PostingItem
} from './postingApi';
export type { SwipeResponse } from './swipeApi';

