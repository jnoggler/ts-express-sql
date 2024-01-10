import { Request, Response } from 'express';

import { publicService } from './publicService';
import config from '../../config';

function getHelloWorld(req: Request, res: Response) {
  const message = publicService.createHelloWorldResponse();
  res.send({ message });
}

function login(req: Request, res: Response) {
  const username = req.body.username;
  const token = publicService.login(username);

  res.cookie('token', token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
  });
  res.send({ token });
}

export const publicController = {
  getHelloWorld,
  login,
};
