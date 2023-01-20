const { Router } = require('express');
const { createPost, likePost, deletePost } = require('./post.controllers');
const { userAuthentication, authorAuthorization } = require('../helpers/auth');
const router = Router();

router.post('/create', userAuthentication, createPost);

router.put('/add/like', userAuthentication, likePost);

router.delete(
  '/delete/:id',
  userAuthentication,
  authorAuthorization,
  deletePost
);

module.exports = router;
