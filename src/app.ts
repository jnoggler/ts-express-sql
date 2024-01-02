import express from 'express';
import helmet from 'helmet';
import nocache from 'nocache';
import passport from 'passport';

import { httpLogger } from './logger';
import { handleError } from './error/errorHandler';
import jwtPassportStrategy from './auth/jwtPassportStrategy';
import localPassportStrategy from './auth/localPassportStrategy';
import routes from './api/routes';

const app = express();

app.use(httpLogger);

app.use(helmet());
app.use(nocache());

app.use(express.json({ limit: '1mb' }));

passport.use(localPassportStrategy);
passport.use(jwtPassportStrategy);
app.use(passport.initialize());

app.use(routes);

app.use(handleError);

export default app;
