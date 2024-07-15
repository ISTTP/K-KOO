import { z } from 'zod';

export const LetterTypeReq = z.object({
  params: z.object({
    letterId: z.string(),
  }),
});
export type LetterTypeReq = z.infer<typeof LetterTypeReq>;

export const LetterTypeResponse = z.object({
  isOpen: z.boolean(),
  nickname: z.string().optional(),
  candleImageUrl: z.string().optional(),
  contents: z.string().optional(),
});
export type LetterTypeResponse = z.infer<typeof LetterTypeResponse>;
