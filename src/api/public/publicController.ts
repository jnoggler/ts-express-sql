import { Request, Response } from 'express';

import { createHelloWorldResponse, login } from './publicService';
import logger from '../../logger';

export function getHelloWorld(req: Request, res: Response) {
  const message = createHelloWorldResponse();
  res.send({message});
};

export function postLogin(req: Request, res: Response) {
  logger.info('request body:', req.body);
  const username = req.body.username;
  const password = req.body.password;

  logger.info(`username: ${username}, password: ${password}`);

  const token = login(username, password);

  logger.info(`token: ${token}`);
  res.send({token});
};