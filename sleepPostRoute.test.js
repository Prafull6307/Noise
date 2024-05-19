import request from 'supertest';
import app from './index'; // Assuming your Express app is exported from index.js
import Sleep from './sleepModel'; // Assuming this is the model used for sleep records

describe('POST /sleep', () => {
  it('should create a new sleep record', async () => {
    const requestBody = {
      userId: '1',
      hours: 8,
      timestamp: '2024-05-18T21:27:57.703Z',
    };

    const res = await request(app)
      .post('/sleep')
      .send(requestBody);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Sleep data saved successfully');
    expect(res.body).toHaveProperty('sleep');
    // Add more assertions based on the expected structure of the response sleep object
  });

  it('should return 500 if an error occurs', async () => {
    // Mocking Sleep.save() to throw an error
    Sleep.prototype.save = jest.fn(() => {
      throw new Error('Mocked error');
    });

    const requestBody = {
      userId: '1',
      hours: 8,
      timestamp: Date.now(),
    };

    const res = await request(app)
      .post('/sleep')
      .send(requestBody);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Mocked error');
  });
});
