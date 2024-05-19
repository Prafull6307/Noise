import request from 'supertest';
import app from './index'; // Assuming your Express app is exported from index.js
import Sleep from './sleepModel'; // Assuming this is the model used for sleep records

// Mocking the Sleep Model
jest.mock('./sleepModel', () => ({
  findByIdAndDelete: jest.fn(),
}));

describe('DELETE /sleep/:_id', () => {
  it('should delete a sleep record by its ID', async () => {
    // Mocking the response of findByIdAndDelete
    const deletedRecord = { _id: '66491d5d036108f8b955187d' };
    Sleep.findByIdAndDelete.mockResolvedValue(deletedRecord);

    const res = await request(app).delete('/sleep/66491d5d036108f8b955187d');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Sleep record deleted successfully');
    expect(res.body).toHaveProperty('deletedRecord', deletedRecord);
  });

  it('should return 404 if record not found', async () => {
    // Mocking the response of findByIdAndDelete to simulate record not found
    Sleep.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app).delete('/sleep/non_existing_record_id');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'Sleep record not found');
  });

  it('should return 500 if an error occurs during deletion', async () => {
    // Mocking the response of findByIdAndDelete to simulate an error
    const errorMessage = 'Internal Server Error';
    Sleep.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

    const res = await request(app).delete('/sleep/66491d5d036108f8b955187d');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', errorMessage);
  });
});
