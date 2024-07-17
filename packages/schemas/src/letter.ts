import { z } from 'zod';

export const LetterType = z.object({
  senderId: z.string(),
  recipientId: z.string(),
  candleId: z.number(),
  nickname: z.string(),
  contents: z.string(),
  keyword: z.string(),
  year: z.number(),
});

export type LetterType = z.infer<typeof LetterType>;

export const LetterRequestType = z.object({
  senderId: z.string(),
  recipientId: z.string(),
  candleId: z.number(),
  nickname: z.string(),
  contents: z.string(),
});

export type LetterRequestType = z.infer<typeof LetterRequestType>;

export const LetterResponseType = z.object({
  letterId: z.number(),
  senderId: z.string(),
  recipientId: z.string(),
  candleId: z.number(),
  nickname: z.string(),
  contents: z.string(),
  keyword: z.string(),
  year: z.number(),
});

export type LetterResponseType = z.infer<typeof LetterResponseType>;

export const getLetterReq = z.object({
  params: z.object({
    letterId: z.coerce.number(),
  }),
});

export type getLetterReq = z.infer<typeof getLetterReq>;

export const getLetterRes = z.object({
  isOpen: z.boolean(),
  nickname: z.string().optional(),
  candleImageUrl: z.string().optional(),
  contents: z.string().optional(),
});

export type getLetterRes = z.infer<typeof getLetterRes>;
