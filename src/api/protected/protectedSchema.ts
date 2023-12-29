import { z } from 'zod';

export const postCreateUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});
