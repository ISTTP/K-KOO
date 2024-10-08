import { z } from 'zod';

const CakeColorType = z.union([
  z.literal('white'),
  z.literal('chocolate'),
  z.literal('strawberry'),
  z.literal('banana'),
  z.literal('mint'),
  z.literal('blueberry'),
]);

export const getCakeRes = z.object({
  nickname: z.string(),
  year: z.string(),
  sheetColor: CakeColorType.nullable(),
  creamColor: CakeColorType.nullable(),
  isBirthday: z.boolean(),
});

export type getCakeRes = z.infer<typeof getCakeRes>;

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
