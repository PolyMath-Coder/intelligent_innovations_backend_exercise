const { Router } = require('express');
const { userAuthentication } = require('../helpers/auth');
const router = Router();

router.use('/auth', require('../auth/auth.routes'));
router.use('/post', userAuthentication, require('../post/posts.routes'));

module.exports = router;
