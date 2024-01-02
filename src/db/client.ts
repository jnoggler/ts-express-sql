import { PrismaClient } from '@prisma/client';

import config from '../config';

const prisma = new PrismaClient({
  errorFormat: config.nodeEnv === 'production' ? 'minimal' : 'pretty',
});

export default prisma;
