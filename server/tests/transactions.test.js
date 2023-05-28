const request = require('supertest');
const express = require('express');
const axios = require('axios');

const app = express();
const router = require('../routes/transactions');

app.use('/', router);

describe('Backend Unit Tests', () => {
  test('GET / should return the array of transactions', async () => {
    const response = await request(app).get('/').query({
      fromAddress: '0x123456789',
      toAddress: '0x987654321',
      aboveValue: '100',
      belowValue: '1000',
      limit: '10',
      offset: '0',
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  jest.mock('axios');

  test('GET / should filter by "fromAddress"', async () => {
    const fromAddress = '0xb4e9ebefb3d41eb2cbbdef6407f816e682392b37';
    const response = await request(app).get('/').query({ fromAddress });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ from: fromAddress })]),
    );
  });

  test('GET / should filter by "toAddress"', async () => {
    const toAddress = '0x693c188e40f760ecf00d2946ef45260b84fbc43e';
    const response = await request(app).get('/').query({ toAddress });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ to: toAddress })]),
    );
  });

  test('should filter transactions by "aboveValue"', async () => {
    const aboveValue = 200;

    // Make a GET request to the endpoint with the "aboveValue" query parameter
    const response = await request(app).get('/').query({ aboveValue: 200 });

    expect(response.status).toBe(200);
    expect(+response.body[0].value).toBeGreaterThan(aboveValue);
  });

  test('should filter transactions by "aboveValue"', async () => {
    const belowValue = 100000;

    // Make a GET request to the endpoint with the "aboveValue" query parameter
    const response = await request(app).get('/').query({ belowValue: 100000 });

    expect(response.status).toBe(200);
    expect(+response.body[0].value).toBeLessThan(belowValue);
  });

  test('GET / should apply "limit"', async () => {
    const limit = '10';
    const response = await request(app).get('/').query({ limit });

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeLessThanOrEqual(Number(limit));
  });

  test('GET / should apply "offset"', async () => {
    const offset = '10';
    const response = await request(app).get('/').query({ offset });

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(Number(offset));
  });

  //This test should be the last one in the file
  test('GET / should handle API error', async () => {
    // Mock the axios.get method to throw an error
    axios.get = jest.fn().mockRejectedValue(new Error('API request failed'));

    const response = await request(app).get('/').query({
      fromAddress: '0x123456789',
      toAddress: '0x987654321',
      aboveValue: '100',
      belowValue: '1000',
      limit: '10',
      offset: '0',
    });
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});
