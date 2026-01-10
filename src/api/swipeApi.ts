import { AxiosInstance } from 'axios';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { FeedItem } from '@/schemas/feedSchema';

export interface SwipeResponse {
  match: boolean;
}

export class SwipeApi {
  constructor(private client: AxiosInstance) {}

  public async getFeed(): Promise<FeedItem[]> {
    const response = await this.client.get<{ data: FeedItem[] }>(
      API_ENDPOINTS.FEED.GET
    );
    return response.data.data;
  }
  public async swipePass(swipedId: string): Promise<void> {
    await this.client.post(API_ENDPOINTS.SWIPES.SWIPE, {
      swipedId,
      action: 'pass',
    });
  }
  public async swipeLike(swipedId: string): Promise<SwipeResponse | undefined> {
    const result = await this.client.post(API_ENDPOINTS.SWIPES.SWIPE, {
      swipedId,
      action: 'like',
    });
    return result.data;
  }
}

export default SwipeApi;
