import { AxiosInstance } from 'axios';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { FeedItem } from '@/schemas/feedSchema';

export class FeedApi {
  constructor(private client: AxiosInstance) {}

  public async getFeed() {
    const response = await this.client.get<{ data: FeedItem[] }>(
      API_ENDPOINTS.FEED.GET
    );
    return response.data;
  }
}

export default FeedApi;
