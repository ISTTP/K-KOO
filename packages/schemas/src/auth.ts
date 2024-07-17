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

export const UserType = z.object({
  userId: z.string(),
  id: z.string(),
  password: z.union([z.string(), z.null()]),
  nickname: z.string(),
  birthday: z.union([z.string(), z.date()]),
  point: z.number(),
  loginType: z.string(),
  sheetColor: z.union([z.string(), z.null()]),
  creamColor: z.union([z.string(), z.null()]),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

export type UserType = z.infer<typeof UserType>;

export const BirthdayType = z.object({
  birthday: z.date(),
});

export type BirthdayType = z.infer<typeof BirthdayType>;

export const getUserYearRes = z.object({
  year: z.number(),
});
export type getUserYearRes = z.infer<typeof getUserYearRes>;
