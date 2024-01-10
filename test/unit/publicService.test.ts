import { expect, test, describe } from 'vitest';
import { verify } from 'jsonwebtoken';

import config from '../../src/config';

import { publicService } from '../../src/api/public/publicService';
import { JwtPayload } from '../../src/auth/types';

describe('Public service tests', () => {
  test('Test hello world response', () => {
    const response = publicService.createHelloWorldResponse();
    expect(response).toBe('Hello World!');
  });

  test('Test login', () => {
    const token = publicService.login('admin');
    expect(token).toBeTypeOf('string');

    const verified = verify(token, config.jwtSecret) as JwtPayload;
    expect(verified.username).toBe('admin');
  });
});
