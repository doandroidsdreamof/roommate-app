import { AxiosError, AxiosInstance } from 'axios';
import { API_ENDPOINTS } from '../config/apiEndpoints';

// TODO code duplication

export interface CreateProfileDto {
  name: string;
  gender: 'male' | 'female' | 'other';
  city: string;
  district: string;
}

export interface CreatePreferencesDto {
  ageMin: number;
  ageMax: number;
  budgetMin?: number;
  budgetMax?: number;
  genderPreference?: 'female_only' | 'male_only' | 'mixed';
}

export class ProfileApi {
  constructor(private client: AxiosInstance) {}

  public async createProfile(data: CreateProfileDto) {
    const response = await this.client.post(API_ENDPOINTS.USERS.PROFILE, data);
    return response.data;
  }

  public async updateProfile(data: Partial<CreateProfileDto>) {
    const response = await this.client.patch(API_ENDPOINTS.USERS.PROFILE, data);
    return response.data;
  }

  public async getProfile() {
    try {
      const response = await this.client.get(API_ENDPOINTS.USERS.PROFILE);
      return { data: response.data.data, error: null };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return { data: null, error: 'PROFILE_NOT_FOUND' };
        }

        if (
          error.code === 'ECONNABORTED' ||
          error.code === 'ERR_NETWORK' ||
          !error.response
        ) {
          return { data: null, error: 'NETWORK_ERROR' };
        }

        if (error.response.status >= 500) {
          return { data: null, error: 'NETWORK_ERROR' };
        }
      }
      return { data: null, error: 'UNKNOWN_ERROR' };
    }
  }

  public async createPreferences(data: CreatePreferencesDto) {
    const response = await this.client.post(
      API_ENDPOINTS.USERS.PREFERENCES,
      data
    );
    return response.data;
  }

  public async checkPreferenceExists(): Promise<{ exists: boolean }> {
    const response = await this.client.get(
      API_ENDPOINTS.USERS.PREFERENCES_EXIST
    );
    return response.data.data;
  }

  public async updatePreferences(data: Partial<CreatePreferencesDto>) {
    const response = await this.client.patch(
      API_ENDPOINTS.USERS.PREFERENCES,
      data
    );
    return response.data;
  }
}
