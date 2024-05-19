
import mongoose from 'mongoose';

const sleepSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  hours: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Sleep', sleepSchema);
