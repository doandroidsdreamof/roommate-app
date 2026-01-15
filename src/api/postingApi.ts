import { AxiosInstance } from 'axios';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export interface CreatePostingDto {
  title: string;
  description: string;
  city: string;
  district: string;
  neighborhoodId?: number;
  rentAmount?: number;
  roomCount?: number;
  squareMeters?: number;
  isFurnished?: boolean;
  availableFrom?: string;
  coverImageUrl?: string;
  preferredRoommateGender?: 'female_only' | 'male_only' | 'mixed';
  // Specs
  hasParking?: boolean;
  hasBalcony?: boolean;
  hasElevator?: boolean;
  billsIncluded?: boolean;
  smokingAllowed?: boolean;
  alcoholFriendly?: boolean;
  hasPets?: boolean;
}

export interface UpdatePostingDto {
  title?: string;
  description?: string;
  rentAmount?: number;
  roomCount?: number;
  squareMeters?: number;
  isFurnished?: boolean;
  availableFrom?: string;
}

export interface UpdatePostingImagesDto {
  images: string[];
}

export interface ClosePostingDto {
  reason?: string;
}

export interface ListsQueryParams {
  // Pagination
  cursor?: string;
  limit?: number;

  // Location
  city?: string;
  district?: string;
  neighborhoodId?: number;

  // Price
  minRent?: number;
  maxRent?: number;

  // Rooms
  minRooms?: number;
  maxRooms?: number;

  // Property
  isFurnished?: boolean;
  minSquareMeters?: number;
  maxSquareMeters?: number;

  // Matching
  preferredRoommateGender?: 'female_only' | 'male_only' | 'mixed';

  // Specs
  hasParking?: boolean;
  hasBalcony?: boolean;
  hasElevator?: boolean;
  billsIncluded?: boolean;
  smokingAllowed?: boolean;
  alcoholFriendly?: boolean;
  hasPets?: boolean;

  // Date
  availableFrom?: string;

  // Sort
  sortBy?: 'price' | 'date' | 'views' | 'bookmarks';
  sortOrder?: 'asc' | 'desc';

  // Search
  search?: string;
}

export interface PostingSpec {
  id: number;
  postingId: number;
  description: string | null;
  hasParking: boolean;
  hasBalcony: boolean;
  hasElevator: boolean;
  billsIncluded: boolean;
  smokingAllowed: boolean;
  alcoholFriendly: boolean;
  hasPets: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostingItem {
  id: number;
  title: string;
  city: string;
  district: string;
  rentAmount: number | null;
  roomCount: number | null;
  coverImageUrl: string | null;
  viewCount: number;
  bookmarkCount: number;
  preferredRoommateGender: 'female_only' | 'male_only' | 'mixed' | null;
  availableFrom: string | null;
  createdAt: string;
  specs: PostingSpec | null;
}

export interface ListsResponse {
  lists: PostingItem[];
  nextCursor: string | null;
  hasMore: boolean;
}

export class PostingApi {
  constructor(private client: AxiosInstance) {}

  public async create(data: CreatePostingDto): Promise<PostingItem> {
    const response = await this.client.post(
      API_ENDPOINTS.POSTINGS.CREATE,
      data
    );
    return response.data;
  }

  public async update(
    postingId: string,
    data: UpdatePostingDto
  ): Promise<PostingItem> {
    const response = await this.client.patch(
      API_ENDPOINTS.POSTINGS.UPDATE(postingId),
      data
    );
    return response.data;
  }

  public async updateImages(
    data: UpdatePostingImagesDto
  ): Promise<PostingItem> {
    const response = await this.client.patch(
      API_ENDPOINTS.POSTINGS.IMAGES,
      data
    );
    return response.data;
  }

  public async close(
    postingId: string,
    data: ClosePostingDto
  ): Promise<PostingItem> {
    const response = await this.client.patch(
      API_ENDPOINTS.POSTINGS.CLOSE(postingId),
      data
    );
    return response.data;
  }

  public async getLists(params: ListsQueryParams): Promise<ListsResponse> {
    const response = await this.client.get(API_ENDPOINTS.POSTINGS.LISTS, {
      params,
    });
    return response.data;
  }
}

export default PostingApi;
