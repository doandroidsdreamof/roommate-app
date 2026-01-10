import axios, { AxiosInstance } from 'axios';
import { secureStorage } from '@/storage/storage';
import { API_ENDPOINTS } from '@/config/apiEndpoints';

type AuthEventListener = () => void;

class ApiClient {
  private api: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];
  private onTokenRefreshFailedListener: AuthEventListener | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    this.setupInterceptors();
  }

  public onTokenRefreshFailed(listener: AuthEventListener) {
    this.onTokenRefreshFailedListener = listener;
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      async (config) => {
        const accessToken = await secureStorage.getAccessToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.api(originalRequest));
              });
            });
          }

          this.isRefreshing = true;

          try {
            const refreshToken = await secureStorage.getRefreshToken();

            if (!refreshToken) {
              console.log('No refresh token available');
              throw new Error('No refresh token');
            }

            const response = await axios.post(
              `${process.env.EXPO_PUBLIC_API_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
              { refreshToken }
            );

            const { accessToken, refreshToken: newRefreshToken } =
              response.data.data;

            await secureStorage.setTokens(
              accessToken,
              newRefreshToken ?? refreshToken
            );

            // Update default headers
            this.api.defaults.headers.common['Authorization'] =
              `Bearer ${accessToken}`;

            // Notify all waiting requests
            this.refreshSubscribers.forEach((callback) =>
              callback(accessToken)
            );
            this.refreshSubscribers = [];

            // Retry original request
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);

            // Clear tokens and subscribers
            this.refreshSubscribers = [];

            // Only clear tokens on auth errors, not network issues
            if (axios.isAxiosError(refreshError)) {
              const status = refreshError.response?.status;

              if (status === 401 || status === 403) {
                await secureStorage.clearTokens();
                if (this.onTokenRefreshFailedListener) {
                  this.onTokenRefreshFailedListener();
                }
              }
            } else {
              // Non-axios error (like "No refresh token")
              await secureStorage.clearTokens();
              if (this.onTokenRefreshFailedListener) {
                this.onTokenRefreshFailedListener();
              }
            }

            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  getClient(): AxiosInstance {
    return this.api;
  }
}

const apiClientInstance = new ApiClient();
export const apiClient = apiClientInstance.getClient();
export const apiClientManager = apiClientInstance;
