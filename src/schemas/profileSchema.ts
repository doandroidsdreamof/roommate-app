import { z } from 'zod';

export const profileSetupSchema = z.object({
  name: z
    .string()
    .min(2, 'Name is required')
    .max(30, 'Name must be at most 30 characters'),
  gender: z.enum(['male', 'female', 'other']),
  city: z.string().min(1, 'City is required'),
  district: z.string().min(1, 'District is required'),
});

export const preferencesSetupSchema = z
  .object({
    budgetMin: z.number().int().positive().optional(),
    budgetMax: z.number().int().positive().optional(),
    ageMin: z.number().int().min(18, 'Minimum age is 18').max(100),
    ageMax: z.number().int().min(18).max(100, 'Maximum age is 100'),
    genderPreference: z.enum(['female_only', 'male_only', 'mixed']).optional(),
    smokingHabit: z.enum(['no', 'social', 'regular']).optional(),
    petOwnership: z.enum(['none', 'cat', 'dog', 'other']).optional(),
    petCompatibility: z.enum(['not_compatible', 'compatible']).optional(),
    alcoholConsumption: z
      .enum(['never', 'occasionally', 'regularly'])
      .optional(),
  })
  .refine((data) => data.ageMax >= data.ageMin, {
    message: 'Maximum age must be greater than or equal to minimum age',
    path: ['ageMax'],
  })
  .refine(
    (data) =>
      !data.budgetMin || !data.budgetMax || data.budgetMax > data.budgetMin,
    {
      message: 'Maximum budget must be greater than minimum budget',
      path: ['budgetMax'],
    }
  );

export type ProfileSetupForm = z.infer<typeof profileSetupSchema>;
export type PreferencesSetupForm = z.infer<typeof preferencesSetupSchema>;
