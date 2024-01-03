import express from 'express';
import helmet from 'helmet';
import nocache from 'nocache';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import passport from 'passport';

import { httpLogger } from './logger';
import { handleError } from './error/errorHandler';
import { jwtAuthHeaderStrategy, jwtCookieStrategy } from './auth/jwtAuth';
import { localStrategy } from './auth/localAuth';
import routes from './api/routes';

const app = express();

app.use(httpLogger);

app.use(helmet());
app.use(nocache());
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));

app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: [], // specify any custom response headers here
    origin: (requestOrigin, callback) => {
      // custom origin validation here.
      // If the origin is valid, call the callback with null and true, otherwise call it with an error.
      // In case only same origin requests should be allowed, set the 'origin' option to true.
      callback(null, true);
    },
  }),
);

passport.use('local', localStrategy);
passport.use('jwtHeader', jwtAuthHeaderStrategy);
passport.use('jwtCookie', jwtCookieStrategy);
app.use(passport.initialize());

app.use(routes);

app.use(handleError);

export default app;
