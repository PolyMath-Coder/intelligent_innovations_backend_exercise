const request = require('supertest');
const { connectToDatabase } = require('../config/mongoose');

const Post = require('../post/post.model');

const app = require('../index');

it('should create a post', async () => {
  // create blog in our db
  await Post.create({
    content: 'The fault in our stars',
    author: 'A6cuidowoi3900940ef',
    timeOfPost: moment().toDate('hh:mm a'),
    dateOfPost: moment().format('LL'),
    likes: 0,
  });

  const response = await request(app)
    .get('/api/post/create')
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('status', 'success');
  expect(response.body).toHaveProperty('message', 'Twit successfully Posted');
  expect(response.body).toHaveProperty('post');
});
