import { z } from 'zod';

export const SocialLoginSuccessType = z.object({
  success: z.boolean(),
  userId: z.string(),
  message: z.string(),
});

export type SocialLoginSuccessType = z.infer<typeof SocialLoginSuccessType>;

export const SocialLoginFailType = z.object({
  success: z.boolean(),
  message: z.string(),
  id: z.string(),
  loginType: z.string(),
});

export type SocialLoginFailType = z.infer<typeof SocialLoginFailType>;

export const BirthdayType = z.object({
  birthday: z.date(),
});

export type BirthdayType = z.infer<typeof BirthdayType>;

export const getUserYearRes = z.object({
  year: z.number(),
});
export type getUserYearRes = z.infer<typeof getUserYearRes>;
