import jwt from 'jsonwebtoken';

import config from '../../config';

export function createHelloWorldResponse() {
    return 'Hello World!';
}

export function login(username: string, password: string) {
    if (username !== 'admin' || password !== 'admin') {
        throw new Error('Invalid credentials');
    }

    const jwtPayload = {username};

    const token = jwt.sign(jwtPayload, config.jwtSecret, {expiresIn: '1h'});
    return token;
}