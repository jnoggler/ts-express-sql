import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || '', // TODO: what to do here?
};

export default config;