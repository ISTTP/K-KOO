import { z } from 'zod';

export const getCakeLettersReq = z.object({
  params: z.object({
    userId: z.string(),
    year: z.coerce.number(),
  }),
  query: z.object({
    keyword: z.string().optional(),
    page: z.coerce.number().optional(),
  }),
});

export type getCakeLettersReq = z.infer<typeof getCakeLettersReq>;

export const getCakeVerReq = z.object({
  query: z.object({
    cakeUserId: z.string(),
  }),
});

export type getCakeVerReq = z.infer<typeof getCakeVerReq>;
