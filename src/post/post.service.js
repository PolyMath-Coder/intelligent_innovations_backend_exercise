const moment = require('moment/moment');
const Post = require('./post.model');
const ApiError = require('../helpers/error');
const catchAsync = require('express-async-handler');

const createPost = async (data, user) => {
  data.timeOfPost = moment().format('hh:mm a');
  data.dateOfPost = moment().format('LL');
  data.author = user;
  const post = await Post.create(data);
  return post;
};

const likePost = async (userId, postId) => {
  const { likes, likedBy } = await Post.findById(postId);
  for (i = 0; i < likedBy.length; i++) {
    if (userId == likedBy[i]) {
      throw new ApiError(400, 'Oops! You already liked this twit earlier...');
    }
  }
  const actualLikes = likes + 1;

  await Post.findByIdAndUpdate(postId, { likes: actualLikes }, { new: true });
  return await Post.findByIdAndUpdate(
    postId,
    {
      $push: { likedBy: [userId] },
    },
    { new: true }
  );
};

const getTwits = async () => {
  const post = await Post.find().sort({ _id: -1 });
};

const makeComment = async (user, comment, postId) => {
  let data = {};
  data.comment = comment;
  data.commentator = user;
  return await Post.findByIdAndUpdate(
    postId,
    { $push: { commentaries: data } },
    { new: true }
  );
};

const deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

module.exports = { createPost, likePost, getTwits, makeComment, deletePost };
