import { Strategy, IStrategyOptions } from 'passport-local';

const options: IStrategyOptions = {
  // customize the names of the fields in the request here, like changing 'username' to 'email'. This is reflected in the type of the payload in the callback
  /*
  usernameField: 'email',
  passwordField: 'password',
  */
};

export const localStrategy = new Strategy(
  options,
  (username, password, done) => {
    // validate the username and password combination here
    if (username === 'admin' && password === 'admin') {
      return done(null, { username, password });
    }
    return done(null, false);
  },
);
