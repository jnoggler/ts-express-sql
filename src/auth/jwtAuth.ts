import {
  ExtractJwt,
  StrategyOptions,
  Strategy,
  SecretOrKeyProvider,
  VerifyCallback,
} from 'passport-jwt';

import config from '../config';

const secretOrKeyProvider: SecretOrKeyProvider = (
  request,
  rawJwtToken,
  done,
) => {
  // possibility to return a user-specific secret like a concatenation of the user's password and the jwtSecret
  return done(null, config.jwtSecret);
};

const verifyCallback: VerifyCallback = (jwtPayload, done) => {
  // do something with payload here, like checking if user still exists
  return done(null, jwtPayload);
  // if we want to reject, we would 'return done(null, false);'
};

const jwtAuthHeaderOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKeyProvider,
};

export const jwtAuthHeaderStrategy = new Strategy(
  jwtAuthHeaderOptions,
  verifyCallback,
);

const jwtCookieOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (request) => {
      let token = null;
      console.log('request cookies', request.cookies);
      if (request && request.cookies) {
        token = request.cookies['token'];
      }
      return token;
    },
  ]),
  secretOrKeyProvider,
};

export const jwtCookieStrategy = new Strategy(jwtCookieOptions, verifyCallback);
