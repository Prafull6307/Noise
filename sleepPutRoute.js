import express from 'express';
import Sleep from './sleepModel.js';

const router = express.Router();

router.put('/:recordId', async (req, res) => {
  try {
    const recordId = req.params.recordId;
    const { userId, hours, timestamp } = req.body;
    const updatedRecord = await Sleep.findByIdAndUpdate(recordId, { userId, hours, timestamp }, { new: true });
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Sleep record not found' });
    }
    res.json({ message: 'Sleep record updated successfully', updatedRecord });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
