import { z } from 'zod';

export const LetterTypeReq = z.object({
  params: z.object({
    letterId: z.string(),
  }),
});
export type LetterTypeReq = z.infer<typeof LetterTypeReq>;
