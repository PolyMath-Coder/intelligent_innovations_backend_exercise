const { Router } = require('express');
const { registerUser, loginUser } = require('./auth.controllers');
const passport = require('passport');
const router = Router();

router.post(
  '/register',
  passport.authenticate('user', { session: false }),
  registerUser
);
router.post('/login', loginUser);

module.exports = router;
