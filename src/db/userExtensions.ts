import { Prisma } from '@prisma/client';

import { hashPassword } from '../auth/passwordUtility';

export const passwordObfuscation = Prisma.defineExtension({
  name: 'PasswordObfuscation',
  result: {
    user: {
      password: {
        compute: () => undefined,
      },
    },
  },
});

export const passwordHashing = Prisma.defineExtension({
  name: 'PasswordHashing',
  query: {
    user: {
      create: async ({ args, query }) => {
        const hashedPassword = await hashPassword(args.data.password);
        console.log('hashedPassword', hashedPassword);
        args.data.password = hashedPassword;
        return query(args);
      },
      update: async ({ args, query }) => {
        if (args.data.password) {
          const hashedPassword = await hashPassword(
            args.data.password.toString(), // not sure about this yet
          );
          console.log('hashedPassword', hashedPassword);
          args.data.password = hashedPassword;
        }
        return query(args);
      },
    },
  },
});
