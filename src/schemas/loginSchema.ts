import z from 'zod';

export const loginSchema = z.object({
  stepOne: z.object({
    email: z.email('Invalid email format').min(1, 'Email is required'),
  }),
  stepTwo: z.object({
    otp: z.string().min(1, 'OTP is required'),
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
