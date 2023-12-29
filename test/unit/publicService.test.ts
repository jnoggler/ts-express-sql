import { expect, test, describe } from 'vitest';
import { verify } from 'jsonwebtoken';

import config from '../../src/config';

import {
  JwtPayload,
  createHelloWorldResponse,
  login,
} from '../../src/api/public/publicService';

describe('Public service tests', () => {
  test('Test hello world response', () => {
    const response = createHelloWorldResponse();
    expect(response).toBe('Hello World!');
  });

  test('Test login', () => {
    const token = login('admin', 'admin');
    expect(token).toBeTypeOf('string');

    const verified = verify(token, config.jwtSecret) as JwtPayload;
    expect(verified.username).toBe('admin');
  });
});
