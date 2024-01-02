import dotenv from 'dotenv';
import { z } from 'zod';

/*
 * NOTE: log statements in this file will not be logged by pino, because it is not yet initialized.
 */

const configSchema = z.object({
  port: z.number(),
  jwtSecret: z.string(),
  nodeEnv: z.string(),
});

type Config = z.infer<typeof configSchema>;

dotenv.config();

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET as string, // we do not want a default value here, to make sure that the app crashes if the secret is not set
  nodeEnv: process.env.NODE_ENV || 'development',
};

try {
  configSchema.parse(config);
} catch (error) {
  console.error('config validation error');
  throw error;
}

if (config.nodeEnv !== 'production') {
  console.log('config', config);
}

export default config;
