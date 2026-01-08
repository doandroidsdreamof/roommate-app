import { apiClient } from './apiClient';
import { AuthApi } from './authApi';
import FeedApi from './feedApi';

export const authApi = new AuthApi(apiClient);
export const feedApi = new FeedApi(apiClient);
