const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


jest.mock('../lib/utils/github');

describe('quotes testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });


it('should get the quotes', async() => {
    const quotes = [
        {
            author: expect.any(String),
            content: expect.any(String),
        },
        {
            author: expect.any(String),
            content: expect.any(String),
        },
        {
            author: expect.any(String),
            content: expect.any(String),
        },
    ];
    const req = await request(app)
        .get('/api/v1/quotes');

        expect(req.body).toEqual(quotes);
    });
});