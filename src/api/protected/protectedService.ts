import prisma from '../../db/client';

export function createPrivateContent() {
  return 'Top Secret!';
}

export async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function createUser(username: string, password: string) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  return user;
}
