require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Habit = require('./models/Habit');
const HabitLog = require('./models/HabitLog');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Habit.deleteMany({});
    await HabitLog.deleteMany({});

    console.log('🗑️  Cleared old data');

    // Create User
    const user = await User.create({
      name: 'Alex Johnson',
      email: 'alex@demo.com',
      password: 'demo1234'
    });

    console.log('👤 Created User: Alex Johnson');

    // Create 5 Habits
    const habitsData = [
      { name: 'Morning Meditation', category: 'Mindfulness', color: '#8b5cf6', emoji: '🧘', frequency: 'Daily' },
      { name: 'Workout', category: 'Fitness', color: '#ef4444', emoji: '💪', frequency: 'Daily' },
      { name: 'Read 20 Pages', category: 'Study', color: '#3b82f6', emoji: '📚', frequency: 'Daily' },
      { name: 'Healthy Meal', category: 'Health', color: '#10b981', emoji: '🥗', frequency: 'Daily' },
      { name: 'Journaling', category: 'Mindfulness', color: '#f59e0b', emoji: '📝', frequency: 'Daily' }
    ];

    const habits = [];
    for (const data of habitsData) {
      const habit = await Habit.create({ ...data, user: user._id });
      habits.push(habit);
    }

    console.log('✅ Created 5 Habits');

    // Create 30 days of varied logs
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      for (const habit of habits) {
        // Varied logic: some habits more consistent than others
        let shouldComplete = Math.random() > 0.3; // 70% overall chance
        
        if (habit.name === 'Morning Meditation') shouldComplete = Math.random() > 0.1; // 90%
        if (habit.name === 'Workout') shouldComplete = Math.random() > 0.5; // 50%
        
        if (shouldComplete) {
          await HabitLog.create({
            habit: habit._id,
            user: user._id,
            date: date,
            status: 'completed'
          });
        }
      }
    }

    console.log('📅 Created 30 days of logs');

    // Update streaks for habits
    const { calculateStreaks } = require('./utils/streak');
    for (const habit of habits) {
      const { current, longest } = await calculateStreaks(habit._id);
      habit.streak.current = current;
      habit.streak.longest = longest;
      await habit.save();
    }

    console.log('🔥 Updated habit streaks');
    console.log('✨ Seeding complete!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
