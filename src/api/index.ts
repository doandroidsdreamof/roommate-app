import { apiClient } from './apiClient';
import { AuthApi } from './authApi';
import { SwipeApi } from './swipeApi';

export const authApi = new AuthApi(apiClient);
export const swipeApi = new SwipeApi(apiClient);
