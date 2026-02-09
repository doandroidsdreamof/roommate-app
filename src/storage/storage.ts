import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

const IS_DEV = __DEV__;
console.log('IS_DEV:', IS_DEV);

interface JwtPayload {
  sub: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

class SecureStorage {
  private cachedAccessToken: string | null = null;

  private async setItem(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  private async getItem(key: string): Promise<string | null> {
    try {
      const value = await SecureStore.getItemAsync(key);
      if (value) return value;

      return null;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);

      return null;
    }
  }

  private getItemSync(key: string): string | null {
    try {
      const value = SecureStore.getItem(key);
      return value;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  private async removeItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }

  async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    this.cachedAccessToken = accessToken;
    await Promise.all([
      this.setItem('accessToken', accessToken),
      this.setItem('refreshToken', refreshToken),
    ]);
  }

  async getAccessToken(): Promise<string | null> {
    if (this.cachedAccessToken) return this.cachedAccessToken;
    this.cachedAccessToken = await this.getItem('accessToken');
    return this.cachedAccessToken;
  }

  getAccessTokenSync(): string | null {
    if (this.cachedAccessToken) return this.cachedAccessToken;
    this.cachedAccessToken = this.getItemSync('accessToken');
    return this.cachedAccessToken;
  }

  async getRefreshToken(): Promise<string | null> {
    return this.getItem('refreshToken');
  }

  async getUserId(): Promise<string | null> {
    try {
      const accessToken = await this.getAccessToken();
      if (!accessToken) return null;

      const decoded = jwtDecode<JwtPayload>(accessToken);
      return decoded.sub;
    } catch (error) {
      console.error('Error getting userId:', error);
      return null;
    }
  }

  getUserIdSync(): string | null {
    try {
      const accessToken = this.getAccessTokenSync();
      if (!accessToken) return null;

      const decoded = jwtDecode<JwtPayload>(accessToken);
      return decoded.sub;
    } catch (error) {
      console.error('Error getting userId:', error);
      return null;
    }
  }

  async clearTokens(): Promise<void> {
    this.cachedAccessToken = null;
    await Promise.all([
      this.removeItem('accessToken'),
      this.removeItem('refreshToken'),
    ]);
  }

  async logTokenStatus(): Promise<void> {
    if (__DEV__) {
      const hasAccessToken = !!(await this.getAccessToken());
      const hasRefreshToken = !!(await this.getRefreshToken());
      console.log('storage Token status:', {
        hasAccessToken,
        hasRefreshToken,
      });
    }
  }
}

export const secureStorage = new SecureStorage();
