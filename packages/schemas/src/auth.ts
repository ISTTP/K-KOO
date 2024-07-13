import { z } from 'zod';

export const SocialLoginSuccessType = z.object({
  success: z.boolean(),
  userId: z.string(),
  message: z.string(),
});

export const SocialLoginFailType = z.object({
  success: z.boolean(),
  message: z.string(),
  id: z.string(),
  loginType: z.string(),
});
