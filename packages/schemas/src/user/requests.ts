import { z } from 'zod';

export const putUserMeReq = z.object({
  nickname: z.string().optional(),
  birthday: z.string().optional(),
});
