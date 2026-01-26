import { AxiosInstance } from 'axios';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export interface Conversation {
  id: string;
  otherUserId: string;
  otherUserName: string;
  otherUserPhoto: string | null;
  createdAt: string;
}

export class MessagingApi {
  constructor(private client: AxiosInstance) {}

  public async getConversations(): Promise<Conversation[]> {
    const response = await this.client.get(
      API_ENDPOINTS.MESSAGING.CONVERSATIONS
    );
    return response.data.data;
  }
}
