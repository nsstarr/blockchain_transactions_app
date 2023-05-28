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
