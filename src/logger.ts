import pino from "pino";
import pinoHttp from "pino-http";

import config from "./config";

const logger = pino({
    level: config.nodeEnv === 'production' ? 'info' : 'debug',
});

export const httpLogger = pinoHttp({
    logger,
    customLogLevel: function (req, res, err) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn'
      } else if (res.statusCode >= 500 || err) {
        return 'error'
      }
      return 'info';
    },
});

export default logger;