import { z } from 'zod';

export const getCakeVerDataRes = z.object({
  nickname: z.string(),
  year: z.string(),
});
export type getCakeVerDataRes = z.infer<typeof getCakeVerDataRes>;

export const getCakeVerRes = z.object({
  data: getCakeVerDataRes,
  userId: z.string().nullable(),
});

export type getCakeVerRes = z.infer<typeof getCakeVerRes>;

export const getCakeDataRes = z.object({
  nickname: z.string(),
  candleImageUrl: z.string(),
  keyword: z.string().optional(),
  letterId: z.number(),
});
export type getCakeDataRes = z.infer<typeof getCakeDataRes>;

export const getPageRes = z.object({
  currentPage: z.number(),
  totalPage: z.number(),
});
export type getPageRes = z.infer<typeof getPageRes>;

export const getCakeLettersRes = z.object({
  data: z.array(getCakeDataRes),
  currentPage: z.number(),
  totalPage: z.number(),
});
export type getCakeLettersRes = z.infer<typeof getCakeLettersRes>;

export const getCakeNoDataRes = z.object({
  noData: z.boolean(),
});
export type getCakeNoDataRes = z.infer<typeof getCakeNoDataRes>;

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
