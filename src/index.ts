import express from "express";
import pinoHttp from "pino-http";
import helmet from "helmet";
import passport from "passport";

import logger from "./logger";
import config from "./config";
import passportJwtConfig from './auth/passportJwtConfig';

import routes from "./api/routes";

const app = express();

app.use(pinoHttp({
  logger,
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn'
    } else if (res.statusCode >= 500 || err) {
      return 'error'
    }
    return 'info'
  },
  customSuccessMessage: function (req, res) {
    if (res.statusCode === 404) {
      return `${req.method} resource not found`
    }
    return `${req.method} completed`
  },
  customErrorMessage: function (req, res, err) {
    return 'request errored with status code: ' + res.statusCode
  },
}));

app.use(helmet());

app.use(express.json({limit: '1mb'}));

passport.use(passportJwtConfig);
app.use(passport.initialize());

app.use(routes);

app.listen(config.port, () => {
  logger.info(`Server is running at http://localhost:${config.port}`);
});