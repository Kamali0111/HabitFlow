const mongoose = require('mongoose');

const habitLogSchema = new mongoose.Schema({
  habit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'missed', 'frozen'],
    default: 'completed'
  },
  note: {
    type: String,
    trim: true
  }
}, { timestamps: true });

// Create a compound index to ensure one log per habit per day
habitLogSchema.index({ habit: 1, date: 1 }, { unique: true });

const HabitLog = mongoose.model('HabitLog', habitLogSchema);
module.exports = HabitLog;
