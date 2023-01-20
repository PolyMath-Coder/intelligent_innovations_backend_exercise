const { Router } = require('express');

const router = Router();

router.use('/auth', require('../auth/auth.routes'));
router.use('/post', require('../post/posts.routes'));

module.exports = router;
