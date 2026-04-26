require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to HabitFlow API' });
});

// Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Habit Routes
app.use('/api/habits', require('./routes/habitRoutes'));

// Analytics Routes
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// AI Routes
app.use('/api/ai', require('./routes/aiRoutes'));

// Notification Routes
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5001;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
