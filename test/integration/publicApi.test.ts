import { describe, test, expect } from 'vitest';
import supertest from 'supertest';
import { verify } from 'jsonwebtoken';

import config from '../../src/config';
import app from '../../src/app';
import { JwtPayload } from '../../src/auth/types';

describe('Public API tests', () => {
  test('Test hello world response', async () => {
    const response = await supertest(app).get('/public/hello-world');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World!' });
  });

  test('Test login and verify bearer token', async () => {
    const response = await supertest(app)
      .post('/public/login')
      .send({ username: 'admin', password: 'admin' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    const verifiedBodyToken = verify(
      response.body.token,
      config.jwtSecret,
    ) as JwtPayload;
    expect(verifiedBodyToken.username).toBe('admin');
  });

  test('Test login and verify cookie', async () => {
    const agent = supertest.agent(app);
    const response = await agent.post('/public/login').send({
      username: 'admin',
      password: 'admin',
    });

    expect(response.header['set-cookie']).toHaveLength(1);
    const verifiedCookieToken = verify(
      response.header['set-cookie'][0].split(';')[0].split('=')[1],
      config.jwtSecret,
    ) as JwtPayload;
    expect(verifiedCookieToken.username).toBe('admin');
  });

  test('Test login with invalid credentials', async () => {
    const response = await supertest(app)
      .post('/public/login')
      .send({ username: 'admin', password: 'wrong' });
    expect(response.status).toBe(401);
  });

  test('Test login with invalid payload', async () => {
    const response = await supertest(app).post('/public/login').send({});
    expect(response.status).toBe(400);
  });
});
