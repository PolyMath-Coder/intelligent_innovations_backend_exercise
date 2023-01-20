const postService = require('./post.service');
const catchAsync = require('express-async-handler');

const createPost = catchAsync(async (req, res) => {
  const post = await postService.createPost(req.body, req.user._id);
  res
    .status(200)
    .json({ status: 'success', message: 'Twit successfully Posted...', post });
});

const likePost = catchAsync(async (req, res) => {
  const post = await postService.likePost(req.user._id, req.query.postId);

  res
    .status(200)
    .json({ status: true, message: 'You successfully liked this twit!' });
});

const addCommentary = async (req, res) => {
  const post = await postService.makeComment(
    req.user._id,
    req.body.comment,
    req.params._id
  );
  res.status(200).json({
    status: true,
    message: `Your commentary was added to the twit ${req.params._id}`,
    post,
  });
};

const deletePost = async (req, res) => {
  const post = await postService.deletePost(req.params.id);
  res.status(200).json({
    status: 'success',
    message: `Twit with the id ${req.params.id} is now deleted...`,
  });
};

module.exports = { createPost, deletePost, likePost, addCommentary };
