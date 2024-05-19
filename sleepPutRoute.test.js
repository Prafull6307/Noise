import request from 'supertest';
import app from './index'; // Assuming your Express app is exported from index.js
import Sleep from './sleepModel'; // Assuming this is the model used for sleep records

describe('PUT /sleep/:recordId', () => {
  it('should update a sleep record by its ID', async () => {
    // Create a new sleep record to update
    const newSleep = new Sleep({
      userId: '2',
      hours: 8,
      timestamp: Date.now(),
    });
    await newSleep.save();

    const updatedData = {
      userId: '1',
      hours: 6,
      timestamp: Date.now(),
    };

    const res = await request(app)
      .put(`/sleep/${newSleep._id}`)
      .send(updatedData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Sleep record updated successfully');
    expect(res.body).toHaveProperty('updatedRecord');
    // Add more assertions based on the expected structure of the response updatedRecord object
  });

  it('should return 404 if record not found', async () => {
    const updatedData = {
      userId: 'updatedUserId',
      hours: 6,
      timestamp: Date.now(),
    };

    const nonExistingRecordId = 'non_existing_record_id'; // Provide a non-existing record ID

    const res = await request(app)
      .put(`/sleep/${nonExistingRecordId}`)
      .send(updatedData);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Sleep record not found');
  },10000);
});
