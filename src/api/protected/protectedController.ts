import { Request, Response } from 'express';

import {
  createPrivateContent,
  // TODO: need to find a naming convention for service functions to differentiate from controller functions
  getUsers as internalGetUsers,
  createUser,
} from './protectedService';

export function getPrivateContent(req: Request, res: Response) {
  const message = createPrivateContent();
  res.send({ message });
}

export async function getUsers(req: Request, res: Response) {
  const users = await internalGetUsers();
  res.send(users);
}

export async function postCreateUser(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await createUser(username, password);
  res.send(user);
}
