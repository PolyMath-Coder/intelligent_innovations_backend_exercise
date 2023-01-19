const { Router } = require('express');
const { registerUser, login } = require('./auth.controllers');
const passport = require('passport');
const router = Router();

router.post(
  '/register',
  passport.authenticate('user', { session: false }),
  registerUser
);
router.post('/login', login);

module.exports = router;
