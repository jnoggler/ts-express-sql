import { describe, test, expect, beforeAll } from 'vitest';
import supertest from 'supertest';

import { publicService } from '../../src/api/public/publicService';
import app from '../../src/app';

describe('Protected API tests', () => {
  let token: string;

  beforeAll(() => {
    token = publicService.login('admin');
    if (!token) {
      throw new Error('Could not log in');
    }
  });

  test('Test private content response with Bearer token', async () => {
    const response = await supertest(app)
      .get('/protected/private-content')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Top Secret!' });
  });

  test('Test private content response without token', async () => {
    const response = await supertest(app).get('/protected/private-content');
    expect(response.status).toBe(401);
  });

  test('Test private content response with valid token in cookie', async () => {
    const agent = supertest.agent(app);
    const response = await agent
      .get('/protected/private-content')
      .set('Cookie', [`token=${token}`])
      .send();
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Top Secret!' });
  });
});
