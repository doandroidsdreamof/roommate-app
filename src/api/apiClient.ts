import axios, { AxiosInstance } from 'axios';

class ApiClient {
  private api: AxiosInstance;
  constructor() {
    console.log('🌐 API URL:', process.env.EXPO_PUBLIC_API_URL);
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
  private setupInterceptors() {
    this.api.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        console.log('🚀 ~request error:', error);
        return Promise.reject(error);
      }
    );
    this.api.interceptors.response.use(
      (response) => {
        console.log('🚀 ~response 2response:', response);
        return response;
      },
      (error) => {
        console.log('🚀 ~ error:', error);
        // Handle errors globally
        if (error.response) {
          // Server responded with a status code out of 2xx range
          const statusCode = error.response.status;
          const errorMessage =
            error.response.data.message || 'An error occurred';

          // Handle different status codes accordingly
          if (statusCode === 401) {
            // Handle unauthorized error, for example by redirecting to login
            console.error('Unauthorized access - redirecting to login');
          } else if (statusCode === 500) {
            // Handle server errors
            console.error('Server error - try again later');
          } else {
            // Handle other types of errors
            console.error(`Error ${statusCode}: ${errorMessage}`);
          }
        } else if (error.request) {
          // No response received (network error, timeout, etc.)
          console.error('Network error - check your internet connection');
        } else {
          // Something else happened during the request
          console.error('Request error:', error.message);
        }

        // Optionally, return a rejected promise to ensure `.catch` is triggered in individual requests
        return Promise.reject(error);
      }
    );
  }
  getClient(): AxiosInstance {
    return this.api;
  }
}
export const apiClient = new ApiClient().getClient();
