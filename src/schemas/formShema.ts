import z from 'zod';

const otpSchema = z.object({
  email: z.email('Invalid email'),
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must be numbers only'),
});

type OTPFormData = z.infer<typeof otpSchema>;
