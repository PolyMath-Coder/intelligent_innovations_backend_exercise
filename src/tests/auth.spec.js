const request = require('supertest');
const { connectToDatabase } = require('../config/mongoose');

const User = require('../auth/user.model');

const app = require('../index');

describe('Auth: Signup', () => {
  let conn;

  beforeAll(async () => {
    conn = await connect();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it('should signup a user', async () => {
    const response = await request(app)
      .post('/register')
      .set('content-type', 'application/json')
      .send({
        email: 'john_doe@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('name', 'john_doe');
    expect(response.body.user).toHaveProperty('email', 'tobi@mail.com');
    expect(response.body.user).toHaveProperty(
      'password',
      'tiosijgidoodoiiaoi$ksodkfiojdsoi'
    );
    expect(response.body).toHaveProperty('token');
  });

  it('should login a user', async () => {
    // create user in out db
    const user = await User.create({
      email: 'john_doe@gmail.com',
      password: '123456',
    });

    // login user
    const response = await request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        name: 'john_doe',
        email: 'john_doe@gmail.com',
        password: 'password',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
