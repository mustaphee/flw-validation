const request = require('supertest');
const testData = require('./test-data');
const app = require('../src/app');

let server;
// Initialize app instance

beforeAll(() => {
  server = request(app);
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe('Home Tests', () => {
  it('should get home', async () => {
    const res = await server
      .get('/');

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');

    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('My Rule-Validation API');

    Object.keys(testData.homeData).forEach((key) => {
      expect(testData.homeData[key]).toEqual(res.body.data[key]);
    });
  });

  it('should return 404', async () => {
    const res = await server
      .get('/not-existing page');

    expect(res.statusCode).toEqual(404);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');

    expect(res.body.status).toEqual('error');
    expect(res.body.data).toBeNull();
    expect(res.body.message).toEqual('Route doesnt exist.');
  });
});
