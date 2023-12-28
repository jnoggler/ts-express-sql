import { ExtractJwt, StrategyOptions, Strategy } from 'passport-jwt';

import config from '../config';
import logger from '../logger';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKeyProvider: (request, rawJwtToken, done) => {
    // possibility to return a user-specific secret like a concatenation of the user's password and the jwtSecret
    return done(null, config.jwtSecret);
  }
};

const jwtPassportStrategy = new Strategy(options, (jwtPayload, done) => {
    // do something with payload here, like checking if user still exists
    return done(null, jwtPayload);
    // if we want to reject, we would 'return done(null, false);'
});

export default jwtPassportStrategy;