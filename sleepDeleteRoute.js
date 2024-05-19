import express from 'express';
import Sleep from './sleepModel.js';

const router = express.Router();

router.delete("/:_id", async (req, res) => {
  try {
    const recordId = req.params._id;
    const deletedRecord = await Sleep.findByIdAndDelete(recordId);
    if (!deletedRecord) {
      return res.status(404).json({ message: "Sleep record not found" });
    }
    res.json({ message: "Sleep record deleted successfully", deletedRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
