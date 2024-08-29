import { z } from 'zod';

export const getUserYearRes = z.object({
  year: z.number(),
});

export type getUserYearRes = z.infer<typeof getUserYearRes>;
