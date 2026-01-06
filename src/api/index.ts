import { apiClient } from './apiClient';
import { AuthApi } from './authApi';

export const authApi = new AuthApi(apiClient);
