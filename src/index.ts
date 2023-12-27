import express from "express";
import pinoHttp from "pino-http";

import logger from "./logger";

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

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});