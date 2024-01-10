import { expect, test, describe, beforeEach } from 'vitest';

import { protectedService } from '../../src/api/protected/protectedService';
import prisma from '../../src/db/client';

describe('Protected service tests', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
    await prisma.user.create({
      data: {
        username: 'test',
        password: 'test',
      },
    });
  });

  test('Test private content response', () => {
    const response = protectedService.createPrivateContent();
    expect(response).toBe('Top Secret!');
  });

  test('Test get users', async () => {
    const users = await protectedService.getUsers();
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBe(1);
    expect(users[0].username).toBe('test');
  });

  test('Test create user', async () => {
    const createdUser = await protectedService.createUser('test2', 'test2');
    expect(createdUser).toBeInstanceOf(Object);
    expect(createdUser.username).toBe('test2');

    const lookupUser = await prisma.user.findUnique({
      where: {
        username: 'test2',
      },
    });
    expect(lookupUser?.id).toBe(createdUser.id);
  });
});
