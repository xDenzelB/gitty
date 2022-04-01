const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { post } = require('../lib/app');
const Post = require('../lib/models/Post');

jest.mock('../lib/utils/github');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  
  it('should redirect to the github oauth page upon login', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });
  it('should login and redirect users to /api/v1/github/posts', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(req.body).toEqual({
      id: expect.any(String),
      username: 'fake_github_user',
      email: 'not-real@example.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });


  it('should be able to get posts for authenticated users', async () => {
    const agent = request.agent(app);
    await agent
    .get('/api/v1/github/login/callback?code=42')
    .redirects(1);

    const res = await agent.get('/api/v1/posts');

    expect(res.body).toEqual([{
      user_id: expect.any(String),
      username: 'fake_github_user',
      avatar: expect.any(String),
      post:  'This app rocks!!',
    }]);
 });

 it('Should be able to create a post for authenticated users', async () => {
   const agent = request.agent(app);
   await agent
   .get('/api/v1/github/login/callback?code=42')
   .redirects(1);

   const res = await agent.get('/api/v1/posts');

   const post = await Post.insert({
    user_id: expect.any(String),
    username: 'fake_github_user',
    avatar: expect.any(String),
    post:  'What does the fox say?',
   });

   expect(res.body).toEqual([{ 
    user_id: expect.any(String),
    username: 'fake_github_user',
    avatar: expect.any(String),
    post:  'What does the fox say?',
    }]);
 });
});
