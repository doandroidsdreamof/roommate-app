import z from 'zod';

export const emailSchema = z.object({
  email: z.email('Invalid email'),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must be numbers only'),
});

export type OTPSchema = z.infer<typeof otpSchema>;
export type EmailSchema = z.infer<typeof emailSchema>;
