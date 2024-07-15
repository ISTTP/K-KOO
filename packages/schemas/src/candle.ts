import { z } from 'zod';

export const CandleType = z.object({
  candleId: z.number(),
  imageUrl: z.string(),
  point: z.number(),
});

export type CandleType = z.infer<typeof CandleType>;

export const CandleResponseType = z.array(CandleType);
export type CandleResponseType = z.infer<typeof CandleResponseType>;
