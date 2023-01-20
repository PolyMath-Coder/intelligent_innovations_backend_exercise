const postService = require('./post.service');
const catchAsync = require('express-async-handler');

const createPost = catchAsync(async (req, res) => {
  const post = await postService.createPost(req.body, req.user._id);
  res
    .status(200)
    .json({ status: 'success', message: 'Twit successfully Posted...', post });
});

const deletePost = async (req, res) => {
  const post = await postService.deletePost(req.params.id);
  res.status(200).json({
    status: 'success',
    message: `Twit with the id ${req.params.id} is now deleted...`,
  });
};

module.exports = { createPost, deletePost };
