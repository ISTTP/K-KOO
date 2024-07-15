import { z } from 'zod';

export const LetterTypeReq = z.object({
  params: z.object({
    letterId: z.string(),
  }),
});
export type LetterTypeReq = z.infer<typeof LetterTypeReq>;

export const LetterTypeResponse = z.object({
  nickname: z.string(),
  candleImageUrl: z.string(),
  contents: z.string(),
});
export type LetterTypeResponse = z.infer<typeof LetterTypeResponse>;
