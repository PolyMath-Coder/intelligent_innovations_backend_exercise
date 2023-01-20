const { Router } = require('express');
const { createPost, deletePost } = require('./post.controllers');
const { userAuthentication, authorAuthorization } = require('../helpers/auth');
const router = Router();

router.post('/create', userAuthentication, createPost);
router.delete(
  '/delete/:id',
  userAuthentication,
  authorAuthorization,
  deletePost
);

module.exports = router;
