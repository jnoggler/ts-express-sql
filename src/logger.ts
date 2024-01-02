import pino, { LoggerOptions } from 'pino';
import pinoHttp from 'pino-http';

import config from './config';

const pinoConfig: LoggerOptions =
  config.nodeEnv === 'production'
    ? {
        level: 'info',
        // print to STDOUT in production
        transport: {
          target: 'pino/file',
          options: {
            destination: 1,
          },
        },
      }
    : {
        level: 'debug',
        // pretty print to STDOUT in every other environment
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      };

const logger = pino(pinoConfig);

export const httpLogger = pinoHttp({
  logger,
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    }
    // set the normal http request logging level to 'debug', to avoid logging every request in production.
    // Basic http request logging is most likely handled by a proxy like nginx in this case.
    return 'debug';
  },
});

export default logger;
