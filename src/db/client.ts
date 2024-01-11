import { PrismaClient } from '@prisma/client';

import { passwordHashing, passwordObfuscation } from './userExtensions';
import config from '../config';

const prisma = new PrismaClient({
  errorFormat: config.nodeEnv === 'production' ? 'minimal' : 'pretty',
})
  .$extends(passwordHashing)
  .$extends(passwordObfuscation);

export default prisma;
