import { AxiosInstance } from 'axios';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { FeedItem } from '@/schemas/feedSchema';

export interface SwipeResponse {
  swipe: {
    id: string;
    createdAt: string;
    updatedAt: string;
    swiperId: string;
    swipedId: string;
    action: 'pass' | 'like';
  };
  matched: boolean;
}

export class SwipeApi {
  constructor(private client: AxiosInstance) {}

  public async getFeed(): Promise<FeedItem[]> {
    const response = await this.client.get<{ data: FeedItem[] }>(
      API_ENDPOINTS.FEED.GET
    );
    return response.data.data;
  }

  public async swipePass(swipedId: string): Promise<SwipeResponse> {
    const response = await this.client.post<{ data: SwipeResponse }>(
      API_ENDPOINTS.SWIPES.SWIPE,
      {
        swipedId,
        action: 'pass',
      }
    );
    return response.data.data;
  }

  public async swipeLike(swipedId: string): Promise<SwipeResponse> {
    const response = await this.client.post<{ data: SwipeResponse }>(
      API_ENDPOINTS.SWIPES.SWIPE,
      {
        swipedId,
        action: 'like',
      }
    );
    return response.data.data;
  }
}

export default SwipeApi;
