import jwt from 'jsonwebtoken';

import config from '../../config';

export function createHelloWorldResponse() {
  return 'Hello World!';
}

export type JwtPayload = {
  username: string;
};

export function login(username: string, password: string) {
  if (username !== 'admin' || password !== 'admin') {
    throw new Error('Invalid credentials');
  }

  const jwtPayload: JwtPayload = { username };

  const token = jwt.sign(jwtPayload, config.jwtSecret, { expiresIn: '1h' });
  return token;
}
