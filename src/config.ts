import dotenv from 'dotenv';
import { z } from 'zod';

const configSchema = z.object({
  port: z.number(),
  jwtSecret: z.string(),
  nodeEnv: z.string(),
});

type Config = z.infer<typeof configSchema>;

dotenv.config();

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET || '', // TODO: what to do here?
  nodeEnv: process.env.NODE_ENV || 'development',
};

configSchema.parse(config);

export default config;
