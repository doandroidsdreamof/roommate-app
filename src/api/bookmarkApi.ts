import { AxiosInstance } from 'axios';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export interface BookmarkPosting {
  id: string;
  title: string;
  coverImageUrl: string | null;
  city: string;
  district: string;
  rentAmount: number;
  availableFrom: string;
  viewCount: number;
  status: string;
  createdAt: string;
}

export interface BookmarkItem {
  id: string;
  postingId: string;
  bookmarkedAt: string;
  posting: BookmarkPosting;
}

export interface BookmarksResponse {
  bookmarks: BookmarkItem[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface BookmarkPaginationParams {
  limit?: number;
  cursor?: string;
}

export class BookmarkApi {
  constructor(private client: AxiosInstance) {}

  public async bookmarkPosting(
    postingId: string
  ): Promise<{ message: string }> {
    const response = await this.client.post(API_ENDPOINTS.USERS.BOOKMARKS, {
      postingId,
    });
    return response.data.data || response.data;
  }

  public async unbookmarkPosting(
    postingId: string
  ): Promise<{ message: string }> {
    const response = await this.client.delete(API_ENDPOINTS.USERS.BOOKMARKS, {
      data: { postingId },
    });
    return response.data.data || response.data;
  }

  public async getUserBookmarks(
    params?: BookmarkPaginationParams
  ): Promise<BookmarksResponse> {
    const response = await this.client.get(API_ENDPOINTS.USERS.BOOKMARKS, {
      params,
    });

    return response.data.data;
  }
}
