const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('./user.model');
const moment = require('moment');

module.exports = (passport) => {
  passport.use(
    'user',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        //   passReqToCallback: true,
      },
      async (email, password, done) => {
        try {
          let data = {};
          const transformedMail = email.toLowerCase();
          data.email = transformedMail;
          const userName = email.split('@', 1)[0];
          const hashedPassword = await bcrypt.hash(password, 10);
          data.password = hashedPassword;
          data.name = userName;
          data.dateCreated = moment().toDate();
          const user = await User.create(data);

          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
  passport.use(
    'login',
    new localStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const transformedMail = email.toLowerCase();
          const user = await User.findOne({ email: transformedMail });
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
          const validate = await user.isPasswordMatch(password);

          if (!validate) {
            return done(null, false, {
              message: 'Incorrect password inputted...',
            });
          }
          const userData = JSON.parse(JSON.stringify(user));
          return done(null, userData, { message: 'Login Successful' });
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
