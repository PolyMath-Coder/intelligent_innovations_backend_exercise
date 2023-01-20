const tokenService = require('./token.service');
const ApiError = require('../helpers/error');
const passport = require('passport');
const { sendOnboardingMail } = require('../helpers/email');

const registerUser = async (req, res) => {
  let data = req.user;
  console.log(data);
  const authToken = await tokenService.generateAuthTokens(data);
  sendOnboardingMail(data.name, data.email);
  res
    .status(200)
    .json({ status: 'Account Creation Successful!', data, authToken });
};

const login = (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const err = new ApiError(
          400,
          'Ooopss! You have either inputted an incorrect password or an unregistered email...'
        );
        return next(err);
      }
      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        const body = {
          _id: user._id,
          email: user.email,
          name: user.name,
        };
        const token = await tokenService.generateAuthTokens(body);
        res.status(200).json({
          status: 'success',
          message: 'Login Successful!',
          body,
          token: token.access.token,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const logOut = async (req, res) => {
  await tokenService.expireUserToken(req.user._id);
  res.redirect('/');
};

module.exports = { login, registerUser, logOut };
