import prisma from '../../db/client';

function createPrivateContent() {
  return 'Top Secret!';
}

async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

async function createUser(username: string, password: string) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  return user;
}

export const protectedService = {
  createPrivateContent,
  getUsers,
  createUser,
};
