import request from 'supertest';
import app from './index'; // Assuming your Express app is exported from index.js
import Sleep from './sleepModel'; // Assuming this is the model used for sleep records

describe('GET /sleep/:userId', () => {
  it('should get sleep records for a user by userId', async () => {
    // Assuming userId exists in the database
    const userId = '1'; // Provide an existing userId
    const res = await request(app).get(`/sleep/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('sleepRecords');
    // Add more assertions based on the expected structure of sleepRecords
  });

  it('should return 500 if an error occurs', async () => {
    // Mocking Sleep.find() to throw an error
    Sleep.find = jest.fn(() => {
      throw new Error('Mocked error');
    });

    const userId = 'exampleUserId'; // Provide a userId
    const res = await request(app).get(`/sleep/${userId}`);
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Mocked error');
  });
});
