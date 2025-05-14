import { z } from 'zod';

export const userAuthSchema = z.object({
  email: z.string().min(1, { message: 'Email cannot be empty' }).email({ message: 'Invalid email format' }),
  userName: z.string().min(1, { message: 'Username cannot be empty' }),
  password: z.string().min(4, { message: 'Password must be at least 4 characters long' }),
  avatar: z.any().optional(),
});

export const userLoginAuthSchema = z.object({
  email: z.string().min(1, { message: 'Email cannot be empty' }).email({ message: 'Invalid email format' }),
  password: z.string().min(4, { message: 'Password must be at least 4 characters long' }),

});
// 3. verify otp
export const userLoginVerifyOtpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be 5 digits." }),
    deviceToken: z.string(),
    mobile: z.string(),


});
