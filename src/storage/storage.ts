import * as SecureStore from 'expo-secure-store';

const IS_DEV = __DEV__;
console.log('IS_DEV:', IS_DEV);

class SecureStorage {
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

  private async removeItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }

  async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    await Promise.all([
      this.setItem('accessToken', accessToken),
      this.setItem('refreshToken', refreshToken),
    ]);
  }

  async getAccessToken(): Promise<string | null> {
    return this.getItem('accessToken');
  }

  async getRefreshToken(): Promise<string | null> {
    return this.getItem('refreshToken');
  }

  async clearTokens(): Promise<void> {
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
