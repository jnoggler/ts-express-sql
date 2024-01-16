import { expect, test, describe, beforeEach } from 'vitest';

import prisma from '../../src/db/client';

describe('Database User Extension tests', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
    await prisma.user.create({
      data: {
        username: 'test',
        password: 'test',
      },
    });
  });

  test('Test password hashing on user creation', async () => {
    const user = await prisma.user.findUnique({
      where: {
        username: 'test',
        password: 'test',
      },
    });
    expect(user).to.not.exist;
  });

  test('Test password hashing on user update', async () => {
    await prisma.user.update({
      where: {
        username: 'test',
      },
      data: {
        password: 'test2',
      },
    });
    const user = await prisma.user.findUnique({
      where: {
        username: 'test',
        password: 'test2',
      },
    });
    expect(user).to.not.exist;
  });

  test('Test password obfuscation on returned user', async () => {
    const user = await prisma.user.findUnique({
      where: {
        username: 'test',
      },
    });
    expect(user?.password).to.be.undefined;
  });
});
