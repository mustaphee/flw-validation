/* eslint-disable max-len */
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

describe('Validation Endpoint Tests', () => {
  it('should not validate', async () => {
    const res = await server
      .post('/validate-rule');

    expect(res.statusCode).toEqual(400);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');

    expect(res.body.status).toEqual('error');
    expect(res.body.data).toBeNull();
    expect(res.body.message).toEqual('rule is required.');
  });

  it('should validate - Example 1 - nested gte', async () => {
    const res = await server
      .post('/validate-rule')
      .send(testData.example1);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.data).toHaveProperty('validation');

    expect(res.body.status).toEqual('success');
    expect(res.body.data.validation.error).toBeFalsy();

    expect(res.body.data.validation.field).toEqual(testData.example1.rule.field);
    expect(res.body.data.validation.condition).toEqual(testData.example1.rule.condition);
    expect(res.body.data.validation.condition_value).toEqual(testData.example1.rule.condition_value);
    // expect(res.body.data.validation.field).toEqual(testData.example1.rule.field);

    expect(res.body.message).toEqual('field missions.count successfully validated.');
  });

  it('should NOT validate - Example 2 - eq', async () => {
    const res = await server
      .post('/validate-rule')
      .send(testData.example2);

    expect(res.statusCode).toEqual(400);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.data).toHaveProperty('validation');

    expect(res.body.status).toEqual('error');
    expect(res.body.data.validation.error).toBeTruthy();

    expect(res.body.data.validation.field).toEqual(testData.example2.rule.field);
    expect(res.body.data.validation.condition).toEqual(testData.example2.rule.condition);
    expect(res.body.data.validation.condition_value).toEqual(testData.example2.rule.condition_value);
    // expect(res.body.data.validation.field).toEqual(testData.example1.rule.field);

    expect(res.body.message).toEqual('field 0 failed validation.');
  });

  it('should NOT validate - Example 3 - contains', async () => {
    const res = await server
      .post('/validate-rule')
      .send(testData.example3);

    expect(res.statusCode).toEqual(400);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');

    expect(res.body.status).toEqual('error');

    expect(res.body.message).toEqual('field 5 is missing from data.');
  });

  it('should validate - Example 4 - contains', async () => {
    const res = await server
      .post('/validate-rule')
      .send(testData.example4);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.data).toHaveProperty('validation');

    expect(res.body.status).toEqual('success');
    expect(res.body.data.validation.error).toBeFalsy();

    expect(res.body.data.validation.field).toEqual(testData.example4.rule.field);
    expect(res.body.data.validation.condition).toEqual(testData.example4.rule.condition);
    expect(res.body.data.validation.condition_value).toEqual(testData.example4.rule.condition_value);

    expect(res.body.message).toEqual('field zoo.2 successfully validated.');
  });

  it('should validate- Example 5 - eq', async () => {
    const res = await server
      .post('/validate-rule')
      .send(testData.example5);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.data).toHaveProperty('validation');

    expect(res.body.status).toEqual('success');
    expect(res.body.data.validation.error).toBeFalsy();

    expect(res.body.data.validation.field).toEqual(testData.example5.rule.field);
    expect(res.body.data.validation.condition).toEqual(testData.example5.rule.condition);
    expect(res.body.data.validation.condition_value).toEqual(testData.example5.rule.condition_value);

    expect(res.body.message).toEqual('field zoo.2 successfully validated.');
  });

  it('should validate- Example 6 - gte', async () => {
    const res = await server
      .post('/validate-rule')
      .send(testData.example6);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.data).toHaveProperty('validation');

    expect(res.body.status).toEqual('success');
    expect(res.body.data.validation.error).toBeFalsy();

    expect(res.body.data.validation.field).toEqual(testData.example6.rule.field);
    expect(res.body.data.validation.condition).toEqual(testData.example6.rule.condition);
    expect(res.body.data.validation.condition_value).toEqual(testData.example6.rule.condition_value);

    expect(res.body.message).toEqual('field zoo.2 successfully validated.');
  });

  it('should validate- Example 7 - neqs', async () => {
    const res = await server
      .post('/validate-rule')
      .send(testData.example7);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.data).toHaveProperty('validation');

    expect(res.body.status).toEqual('success');
    expect(res.body.data.validation.error).toBeFalsy();

    expect(res.body.data.validation.field).toEqual(testData.example7.rule.field);
    expect(res.body.data.validation.condition).toEqual(testData.example7.rule.condition);
    expect(res.body.data.validation.condition_value).toEqual(testData.example7.rule.condition_value);

    expect(res.body.message).toEqual(`field ${res.body.data.validation.field} successfully validated.`);
  });
});
