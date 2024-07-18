import { z } from 'zod';

export const user = z.object({
  userId: z.string(),
  id: z.string(),
  password: z.union([z.string(), z.null()]),
  nickname: z.string(),
  birthday: z.union([z.string(), z.date()]),
  point: z.number(),
  loginType: z.string(),
  sheetColor: z.union([z.string(), z.null()]),
  creamColor: z.union([z.string(), z.null()]),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

export type user = z.infer<typeof user>;
