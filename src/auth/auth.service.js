const localStrategy = require('passport-local').Strategy;

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
          console.log(email, password);
          let data;
          //   data = req.body;
          //   data.email = req.body.email.toLowerCase();
          return done(null);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
