const moment = require('moment/moment');
const Post = require('./post.model');

const createPost = async (data, user) => {
  data.timeOfPost = moment().format('hh:mm a');
  data.dateOfPost = moment().format('LL');
  data.author = user;
  const post = await Post.create(data);
  return post;
};

const deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

module.exports = { createPost, deletePost };
