import { z } from 'zod';

export const postLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
