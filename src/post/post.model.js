const mongoose = require('mongoose');
const { schema } = require('../auth/user.model');

const { Schema } = mongoose;

const postSchema = new Schema({
  content: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  commentaries: [
    {
      comment: {
        type: String,
      },
      commentator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  timeOfPost: {
    type: String,
    required: true,
  },
  dateOfPost: {
    type: String,
    required: true,
  },

  likedBy: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    default: null,
  },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
