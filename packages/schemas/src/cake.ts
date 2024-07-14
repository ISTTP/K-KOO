import { z } from 'zod';

export const CakeUserTypeResponse = z.object({
  nickname: z.string(),
  year: z.string(),
});
export type CakeUserTypeResponse = z.infer<typeof CakeUserTypeResponse>;

export const CakeTypeResponse = z.object({
  nickname: z.string(),
  candleImageUrl: z.string(),
  keyword: z.string().optional(),
  letterId: z.number(),
});
export type CakeTypeResponse = z.infer<typeof CakeTypeResponse>;

export const PageTypeResponse = z.object({
  currentPage: z.number(),
  totalPage: z.number(),
});
export type PageTypeResponse = z.infer<typeof PageTypeResponse>;
