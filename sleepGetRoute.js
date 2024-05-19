import express from 'express';
import Sleep from './sleepModel.js';

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const sleepRecords = await Sleep.find({ userId }).sort({ timestamp: 'asc' });
    res.json({ sleepRecords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
