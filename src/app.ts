import express from 'express';
import helmet from 'helmet';
import passport from 'passport';

import { httpLogger } from './logger';
import { handleError } from './error/errorHandler';
import passportJwtConfig from './auth/passportJwtConfig';
import routes from './api/routes';

const app = express();

app.use(httpLogger);

app.use(helmet());

app.use(express.json({ limit: '1mb' }));

passport.use(passportJwtConfig);
app.use(passport.initialize());

app.use(routes);

app.use(handleError);

export default app;
