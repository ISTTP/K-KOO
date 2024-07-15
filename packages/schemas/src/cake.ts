import { z } from 'zod';

export const CakeUserTypeResponse = z.object({
  nickname: z.string(),
  year: z.string(),
});
export type CakeUserTypeResponse = z.infer<typeof CakeUserTypeResponse>;

export const CakeUserResponse = z.object({
  data: CakeUserTypeResponse,
  userId: z.string().nullable(),
});

export type CakeUserResponse = z.infer<typeof CakeUserResponse>;

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

export const LettersResponse = z.object({
  data: z.array(CakeTypeResponse),
  currentPage: z.number(),
  totalPage: z.number(),
});
export type LettersResponse = z.infer<typeof LettersResponse>;

export const LettersTypeReq = z.object({
  params: z.object({
    userId: z.string(),
    year: z.string(),
  }),
  query: z.object({
    keyword: z.string().optional(),
    page: z.string().optional(),
  }),
});

export type LettersTypeReq = z.infer<typeof LettersTypeReq>;

export const CakeVerTypeReq = z.object({
  query: z.object({
    cakeUserId: z.string(),
  }),
});

export type CakeVerTypeReq = z.infer<typeof CakeVerTypeReq>;
