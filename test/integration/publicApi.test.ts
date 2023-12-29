import {describe, test, expect} from 'vitest';
import supertest from 'supertest';
import {verify} from 'jsonwebtoken';

import config from '../../src/config';
import app from '../../src/app';

describe('Public API tests', () => {
    test('Test hello world response', async () => {
        const response = await supertest(app).get('/public/hello-world');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'Hello World!'});
    });
    
    test('Test login', async () => {
        const response = await supertest(app).post('/public/login').send({username: 'admin', password: 'admin'});
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');

        const verified = verify(response.body.token, config.jwtSecret) as any;
        expect(verified.username).toBe('admin');
    });
});