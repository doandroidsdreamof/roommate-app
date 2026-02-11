import z from 'zod';

export const createProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(30),
  gender: z.enum(['male', 'female', 'other']),
  city: z.string().min(1, 'City is required').max(100),
  district: z.string().min(1, 'District is required').max(100),
});

export const updateAddressSchema = z.object({
  city: z.string().min(1, 'Şehir gereklidir').max(100),
  district: z.string().min(1, 'İlçe gereklidir').max(100),
});

const budgetSchema = z
  .number()
  .int('Bütçe tam sayı olmalıdır')
  .min(0, 'Bütçe negatif olamaz')
  .max(1_000_000, 'Bütçe çok yüksek (max 1M)')
  .optional();

export const updatePhotoSchema = z.object({
  photoUrl: z.url('Fotoğraf gereklidir'),
});

export const editProfileSchema = z.object({
  ...updateAddressSchema.shape,
  ...updatePhotoSchema.shape,
});

export const createPreferencesSchema = z
  .object({
    budgetMin: budgetSchema,
    budgetMax: budgetSchema,
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

export const updatePreferencesSchema = z
  .object({
    budgetMin: budgetSchema,
    budgetMax: budgetSchema,
    ageMin: z.number().int().min(18).max(100).optional(),
    ageMax: z.number().int().min(18).max(100).optional(),
    genderPreference: z.enum(['female_only', 'male_only', 'mixed']).optional(),
    smokingHabit: z.enum(['no', 'social', 'regular']).optional(),
    petOwnership: z.enum(['none', 'cat', 'dog', 'other']).optional(),
    petCompatibility: z.enum(['not_compatible', 'compatible']).optional(),
    alcoholConsumption: z
      .enum(['never', 'occasionally', 'regularly'])
      .optional(),
  })
  .refine(
    (data) => !data.ageMin || !data.ageMax || data.ageMax >= data.ageMin,
    {
      message: 'Maksimum yaş minimum yaştan büyük veya eşit olmalıdır',
      path: ['ageMax'],
    }
  )
  .refine(
    (data) =>
      !data.budgetMin || !data.budgetMax || data.budgetMin <= data.budgetMax,
    {
      message: 'Minimum bütçe maksimum bütçeden küçük veya eşit olmalıdır',
      path: ['budgetMin'],
    }
  );

export type CreateProfileDto = z.infer<typeof createProfileSchema>;
export type UpdateAddressDto = z.infer<typeof updateAddressSchema>;
export type UpdatePreferencesDto = z.infer<typeof updatePreferencesSchema>;

export type UpdatePhotoDto = z.infer<typeof updatePhotoSchema>;
export type CreatePreferencesDto = z.infer<typeof createPreferencesSchema>;
export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
