const { Router } = require('express');
const { registerUser, login } = require('./auth.controllers');
const { checkEmail } = require('../helpers/checkEmail');
const { authValidator } = require('../helpers/validate');

const passport = require('passport');
const router = Router();

router.post(
  '/register',
  authValidator,
  checkEmail,
  passport.authenticate('user', { session: false }),
  registerUser
);
router.post('/login', authValidator, login);

module.exports = router;
