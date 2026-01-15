import { apiClient } from './apiClient';
import { AuthApi } from './authApi';
import LocationApi from './locationApi';
import PostingApi from './postingApi';
import ProfileApi from './profileApi';
import { SwipeApi } from './swipeApi';

export const authApi = new AuthApi(apiClient);
export const swipeApi = new SwipeApi(apiClient);
export const profileApi = new ProfileApi(apiClient);
export const locationApi = new LocationApi(apiClient);
export const postingApi = new PostingApi(apiClient)