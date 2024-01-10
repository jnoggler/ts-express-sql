import { Request, Response } from 'express';

import { protectedService } from './protectedService';

function getPrivateContent(req: Request, res: Response) {
  const message = protectedService.createPrivateContent();
  res.send({ message });
}

async function getUsers(req: Request, res: Response) {
  const users = await protectedService.getUsers();
  res.send(users);
}

async function createUser(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await protectedService.createUser(username, password);
  res.send(user);
}

export const protectedController = {
  getPrivateContent,
  getUsers,
  createUser,
};
