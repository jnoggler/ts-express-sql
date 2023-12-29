import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || '', // TODO: what to do here?
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;
