import { AxiosInstance } from 'axios';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { CreatePostingFormData } from '@/schemas/postingSchema';

// TODO migrate from those to zod schema
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
  status: 'inactive' | 'rented';
}

export interface ListsQueryParams {
  // Pagination
  cursor?: string;
  limit?: number;

  // Location
  city?: string;
  province?: string;
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
  sortBy?: 'createdAt' | 'rentAmount' | 'viewCount' | 'bookmarkCount';
  sortOrder?: 'asc' | 'desc';

  // Search
  search?: string;

  bathroomCount?: number;
}

export interface PostingImage {
  url: string;
  order: number;
}

export interface PostingImages {
  id: string;
  postingSpecsId: string;
  images: PostingImage[];
  isVerified: boolean;
}

export interface PostingSpec {
  id: string;
  postingId: string;
  description: string;
  depositAmount: number;
  billsIncluded: boolean;
  floor: number;
  totalFloors: number;
  hasBalcony: boolean;
  hasParking: boolean;
  hasElevator: boolean;
  currentOccupants: number | null;
  totalCapacity: number | null;
  availableRooms: number | null;
  occupantGenderComposition: 'all_female' | 'all_male' | 'mixed' | null;
  ageMin: number;
  ageMax: number;
  smokingAllowed: boolean | null;
  alcoholFriendly: boolean | null;
  hasPets: boolean;
  currentPetOwnership: 'none' | 'has_cats' | 'has_dogs' | 'has_both' | null;
  nearbyTransport: string | null;
  images?: PostingImages | null;
}

export interface PostingItem {
  id: string;
  title: string;
  city: string;
  latitude: string;
  longitude: string;
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
  isBookmarked: boolean;
}

export interface PostingDetail {
  id: string;
  userId: string;
  title: string;
  coverImageUrl: string;
  isVerified: boolean;
  city: string;
  district: string;
  neighborhoodId: number;
  latitude: string;
  longitude: string;
  rentAmount: number;
  roomCount: number;
  bathroomCount: number;
  squareMeters: number;
  isFurnished: boolean;
  preferredRoommateGender: 'female_only' | 'male_only' | 'mixed';
  availableFrom: string;
  deletedAt: string | null;
  specs: PostingSpec | null;
  user: {
    id: string;
    firstName: string;
    profileImageUrl: string | null;
  };
  isBookmarked: boolean;
}

export interface ListsResponse {
  lists: PostingItem[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface GetPostingResponse {
  data: PostingDetail;
}

export class PostingApi {
  constructor(private client: AxiosInstance) {}

  public async create(data: CreatePostingFormData): Promise<PostingItem> {
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

    return response.data.data;
  }

  public async getPosting(postingId: string): Promise<GetPostingResponse> {
    const response = await this.client.get(
      API_ENDPOINTS.POSTINGS.GET(postingId)
    );
    return response.data;
  }

  public async getUserPostings(): Promise<{ data: PostingItem[] }> {
    const response = await this.client.get(API_ENDPOINTS.POSTINGS.USER_POSTING);
    return response.data;
  }
}
