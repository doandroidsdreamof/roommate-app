import { z } from 'zod';

export const profileSetupSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(30, 'Name must be at most 30 characters'),
  gender: z.enum(['male', 'female', 'other']),
  city: z.string().min(1, 'City is required'),
  district: z.string().min(1, 'District is required'),
});

export const preferencesSetupSchema = z
  .object({
    ageMin: z.number().int().min(18, 'Minimum age is 18').max(100),
    ageMax: z.number().int().min(18).max(100, 'Maximum age is 100'),
    budgetMin: z.number().int().min(0).optional(),
    budgetMax: z.number().int().min(0).optional(),
    genderPreference: z.enum(['female_only', 'male_only', 'mixed']).optional(),
  })
  .refine((data) => data.ageMax >= data.ageMin, {
    message: 'Maximum age must be greater than or equal to minimum age',
    path: ['ageMax'],
  });

export type ProfileSetupForm = z.infer<typeof profileSetupSchema>;
export type PreferencesSetupForm = z.infer<typeof preferencesSetupSchema>;
