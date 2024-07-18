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
