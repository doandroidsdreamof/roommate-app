import * as SecureStore from 'expo-secure-store';

export const secureStorage = {
  setTokens: async (accessToken: string, refreshToken: string) => {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
  },

  getAccessToken: () => SecureStore.getItemAsync('accessToken'),
  getRefreshToken: () => SecureStore.getItemAsync('refreshToken'),

  clearTokens: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
  },
};
