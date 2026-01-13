import { AxiosInstance } from 'axios';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export interface Province {
  id: string;
  name: string;
  plateCode: number;
}

export interface Neighborhood {
  id: string;
  name: string;
  district: string;
  city: string;
}

export interface NeighborhoodSearchParams {
  query?: string;
  cityId?: string;
  districtId?: string;
}

export interface District {
  id: number;
  name: string;
  provincePlateCode: number;
  createdAt: string;
  updatedAt: string;
}

export class LocationApi {
  constructor(private client: AxiosInstance) {}

  public async getProvinces(): Promise<Province[]> {
    const response = await this.client.get(API_ENDPOINTS.LOCATIONS.PROVINCES);
    return response.data.data;
  }
  public async searchNeighborhoods(
    params: NeighborhoodSearchParams
  ): Promise<Neighborhood[]> {
    const response = await this.client.get(
      API_ENDPOINTS.LOCATIONS.NEIGHBORHOODS_SEARCH,
      {
        params,
      }
    );
    return response.data.data;
  }

  public async getDistrictsByProvince(provinceId: number): Promise<District[]> {
    const response = await this.client.get(
      API_ENDPOINTS.LOCATIONS.DISTRICTS(provinceId)
    );
    return response.data.data;
  }
}

export default LocationApi;
