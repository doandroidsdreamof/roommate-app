import { z } from 'zod';

export const feedItemSchema = z.object({
  userId: z.string(),
  name: z.string(),
  ageRange: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  city: z.string(),
  district: z.string(),
  photoUrl: z.url().nullable(),
  photoVerified: z.boolean(),
  lastActiveAt: z.string().nullable(),
  budgetMin: z.number().nullable(),
  budgetMax: z.number().nullable(),
  smokingHabit: z.enum(['yes', 'no', 'occasionally']).nullable(),
  petOwnership: z.enum(['none', 'cat', 'dog', 'other']).nullable(),
  petCompatibility: z.enum(['yes', 'no']).nullable(),
  alcoholConsumption: z.enum(['yes', 'no', 'occasionally']).nullable(),
  genderPreference: z.enum(['male_only', 'female_only', 'no_preference']),
  houseSearcingType: z.enum(['looking_for_roommate', 'looking_for_house']),
  accountStatus: z.enum(['active', 'inactive', 'suspended']),
});

export type FeedItem = z.infer<typeof feedItemSchema>;
