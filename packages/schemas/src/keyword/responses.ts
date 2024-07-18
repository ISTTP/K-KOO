import { z } from 'zod';

export const getKeywordRes = z.object({
  hashtag: z.string(),
});

export type getKeywordRes = z.infer<typeof getKeywordRes>;
