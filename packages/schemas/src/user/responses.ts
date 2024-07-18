import { z } from 'zod';

export const getUserMeRes = z.object({
  userId: z.string(),
});

export type getUserMeRes = z.infer<typeof getUserMeRes>;

export const getUserYearRes = z.object({
  year: z.number(),
});

export type getUserYearRes = z.infer<typeof getUserYearRes>;
