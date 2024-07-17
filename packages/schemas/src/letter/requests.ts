import { z } from 'zod';

export const getLetterReq = z.object({
  params: z.object({
    letterId: z.coerce.number(),
  }),
});

export type getLetterReq = z.infer<typeof getLetterReq>;

export const LetterRequestType = z.object({
  senderId: z.string(),
  recipientId: z.string(),
  candleId: z.number(),
  nickname: z.string(),
  contents: z.string(),
});

export type LetterRequestType = z.infer<typeof LetterRequestType>;
