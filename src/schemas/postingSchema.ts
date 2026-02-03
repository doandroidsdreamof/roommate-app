import { z } from 'zod';

export const GENDER_PREFERENCE = {
  FEMALE_ONLY: 'female_only',
  MALE_ONLY: 'male_only',
  MIXED: 'mixed',
} as const;

export const OCCUPANT_GENDER_COMPOSITION = {
  ALL_MALE: 'all_male',
  ALL_FEMALE: 'all_female',
  MIXED: 'mixed',
} as const;

export const PET_OWNERSHIP = {
  CAT: 'cat',
  DOG: 'dog',
  OTHER: 'other',
  NONE: 'none',
} as const;

export const ageRangeSchema = z
  .object({
    ageMin: z
      .number()
      .int()
      .min(18, 'Minimum age must be at least 18')
      .max(100),
    ageMax: z.number().int().min(18).max(100),
  })
  .refine((data) => data.ageMax >= data.ageMin, {
    message: 'Maximum age must be greater than or equal to minimum age',
    path: ['ageMax'],
  });

export const postingImageSchema = z.object({
  url: z.url('Must be a valid URL'),
  order: z.number().int().min(0).max(4),
});

export const postingSpecsSchema = z
  .object({
    description: z
      .string()
      .min(10, 'Açıklama en az 10 karakter olmalıdır')
      .max(2000, 'Açıklama en fazla 2000 karakter olabilir'),
    ageMin: z.number().int().min(18, 'Minimum yaş 18 olmalıdır'),
    ageMax: z.number().int().min(18).max(100, 'Maximum yaş 100 olabilir'),
    depositAmount: z
      .number()
      .int()
      .nonnegative('Depozito tutarı negatif olamaz'),
    billsIncluded: z.boolean(),
    floor: z.number().int().min(0, 'Kat en az 0 olmalıdır'),
    totalFloors: z
      .number()
      .int()
      .positive('Toplam kat sayısı pozitif olmalıdır'),
    hasBalcony: z.boolean(),
    hasParking: z.boolean(),
    hasElevator: z.boolean(),
    currentOccupants: z.number().int().nonnegative().optional(),
    totalCapacity: z.number().int().positive().optional(),
    availableRooms: z.number().int().positive().optional(),
    occupantGenderComposition: z
      .enum(['all_male', 'all_female', 'mixed'])
      .optional(),
    smokingAllowed: z.boolean().optional(),
    alcoholFriendly: z.boolean().optional(),
    hasPets: z.boolean().optional(),
    currentPetOwnership: z.enum(['cat', 'dog', 'other', 'none']).optional(),
    nearbyTransport: z.string().max(500).optional(),
  })
  .refine((data) => data.ageMax >= data.ageMin, {
    message: 'Maximum yaş minimum yaştan büyük veya eşit olmalıdır',
    path: ['ageMax'],
  });

export const createPostingSchema = z.object({
  title: z
    .string()
    .min(10, 'Başlık en az 10 karakter olmalıdır')
    .max(100, 'Başlık en fazla 100 karakter olabilir'),
  coverImageUrl: z.url('Geçerli bir URL olmalıdır'),
  city: z.string().min(1, 'Şehir zorunludur').max(100),
  district: z.string().min(1, 'İlçe zorunludur').max(100),
  neighborhoodId: z.number().int().positive('Mahalle ID pozitif olmalıdır'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  rentAmount: z.number().int().positive('Kira bedeli pozitif olmalıdır'),
  roomCount: z.number().int().min(1, 'Oda sayısı en az 1 olmalıdır'),
  bathroomCount: z.number().int().min(1, 'Banyo sayısı en az 1 olmalıdır'),
  squareMeters: z.number().int().positive('Metrekare pozitif olmalıdır'),
  isFurnished: z.boolean(),
  preferredRoommateGender: z.enum(['female_only', 'male_only', 'mixed']),
  availableFrom: z.string(),
  specs: postingSpecsSchema,
  images: z
    .array(postingImageSchema)
    .max(5, 'Maksimum 5 resim eklenebilir')
    .optional(),
});

export const updatePostingSchema = z.object({
  rentAmount: z.number().int().positive().optional(),
  roomCount: z.number().int().min(1).optional(),
  bathroomCount: z.number().int().min(1).optional(),
  squareMeters: z.number().int().positive().optional(),
  isFurnished: z.boolean().optional(),
  preferredRoommateGender: z
    .enum(['female_only', 'male_only', 'mixed'])
    .optional(),
  availableFrom: z.string().optional(),
  specs: postingSpecsSchema.optional(),
});

export type CreatePostingFormData = z.infer<typeof createPostingSchema>;
export type UpdatePostingFormData = z.infer<typeof updatePostingSchema>;
export type PostingSpecs = z.infer<typeof postingSpecsSchema>;
export type PostingImage = z.infer<typeof postingImageSchema>;
