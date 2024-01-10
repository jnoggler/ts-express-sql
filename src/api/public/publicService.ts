import jwt from 'jsonwebtoken';

import config from '../../config';
import { JwtPayload } from '../../auth/types';

function createHelloWorldResponse() {
  return 'Hello World!';
}

function login(username: string) {
  const jwtPayload: JwtPayload = { username };

  const token = jwt.sign(jwtPayload, config.jwtSecret, { expiresIn: '1h' });
  return token;
}

export const publicService = {
  createHelloWorldResponse,
  login,
};
