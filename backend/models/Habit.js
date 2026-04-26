const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Habit name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['Health', 'Fitness', 'Study', 'Mindfulness', 'Finance', 'Other'],
    default: 'Other'
  },
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly'],
    default: 'Daily'
  },
  color: {
    type: String,
    default: '#8b5cf6' // Default purple
  },
  emoji: {
    type: String,
    default: '⭐'
  },
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 }
  },
  lastCompleted: {
    type: Date
  },
  isArchived: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;
