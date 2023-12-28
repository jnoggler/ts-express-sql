import express from "express";
import helmet from "helmet";
import passport from "passport";

import logger, {httpLogger} from "./logger";
import config from "./config";
import passportJwtConfig from './auth/passportJwtConfig';
import routes from "./api/routes";

const app = express();

app.use(httpLogger);

app.use(helmet());

app.use(express.json({limit: '1mb'}));

passport.use(passportJwtConfig);
app.use(passport.initialize());

app.use(routes);

app.listen(config.port, () => {
  logger.info(`Server is running at http://localhost:${config.port}`);
});