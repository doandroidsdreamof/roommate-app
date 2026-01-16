import { AxiosInstance } from 'axios';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export class AuthApi {
  constructor(private client: AxiosInstance) {}
  public async requestOTP(email: string) {
    const response = await this.client.post(API_ENDPOINTS.AUTH.REQUEST_OTP, {
      email,
    });
    return response.data;
  }
  public async authenticate(email: string, otp?: string) {
    const response = await this.client.post(API_ENDPOINTS.AUTH.AUTHENTICATE, {
      email,
      otp,
    });
    return response.data;
  }

  public async refreshToken(refreshToken: string) {
    const response = await this.client.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
      refreshToken,
    });
    return response.data;
  }

  public async logout(refreshToken: string) {
    const response = await this.client.post(API_ENDPOINTS.AUTH.LOGOUT, {
      refreshToken,
    });
    return response.data;
  }
}
