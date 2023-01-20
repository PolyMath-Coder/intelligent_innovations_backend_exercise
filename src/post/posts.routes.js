const { Router } = require('express');
const {
  createPost,
  likePost,
  addCommentary,
  getAllTwits,
  deletePost,
} = require('./post.controllers');
const { userAuthentication, authorAuthorization } = require('../helpers/auth');
const router = Router();

router.post('/create', userAuthentication, createPost);

router.get('/all', userAuthentication, getAllTwits);
router.put('/add/like', userAuthentication, likePost);
router.post('/add/comment/:_id', userAuthentication, addCommentary);

router.delete(
  '/delete/:id',
  userAuthentication,
  authorAuthorization,
  deletePost
);

module.exports = router;
