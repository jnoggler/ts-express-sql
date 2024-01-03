import { Request, Response } from 'express';

import { createHelloWorldResponse, login } from './publicService';
import config from '../../config';

export function getHelloWorld(req: Request, res: Response) {
  const message = createHelloWorldResponse();
  res.send({ message });
}

export function postLogin(req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;

  const token = login(username, password);

  res.cookie('token', token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
  });
  res.send({ token });
}
