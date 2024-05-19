import express from 'express';
import Sleep from './sleepModel.js';

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, hours, timestamp } = req.body;
    const newSleep = new Sleep({
      userId,
      hours,
      timestamp,
    });
    await newSleep.save();
    res.status(201).json({ message: 'Sleep data saved successfully', sleep: newSleep });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
