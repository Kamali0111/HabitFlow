const Habit = require('../models/Habit');
const HabitLog = require('../models/HabitLog');
const { calculateStreaks } = require('../utils/streak');

// @desc    Get all habits for user
// @route   GET /api/habits
// @access  Private
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id, isArchived: false });
    
    // Get today's logs for these habits
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const logs = await HabitLog.find({
      user: req.user._id,
      date: today
    });

    // Merge log status into habits
    const habitsWithStatus = habits.map(habit => {
      const log = logs.find(l => l.habit.toString() === habit._id.toString());
      return {
        ...habit._doc,
        isCompletedToday: !!log,
        status: log ? log.status : null,
        note: log ? log.note : null
      };
    });

    res.json({ success: true, data: habitsWithStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a habit
// @route   POST /api/habits
// @access  Private
const createHabit = async (req, res) => {
  const { name, description, category, frequency, color, emoji } = req.body;

  try {
    const habit = await Habit.create({
      user: req.user._id,
      name,
      description,
      category,
      frequency,
      color,
      emoji
    });

    res.status(201).json({ success: true, data: habit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a habit
// @route   PUT /api/habits/:id
// @access  Private
const updateHabit = async (req, res) => {
  try {
    let habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ success: true, data: habit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
// @access  Private
const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    // Soft delete
    habit.isArchived = true;
    await habit.save();

    res.json({ success: true, message: 'Habit removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Complete a habit for today
// @route   POST /api/habits/:id/complete
// @access  Private
const completeHabit = async (req, res) => {
  try {
    const { note } = req.body;
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already completed
    let log = await HabitLog.findOne({ habit: habit._id, date: today });

    if (log) {
      // Toggle off if already completed
      await HabitLog.findByIdAndDelete(log._id);
    } else {
      // Create new log with optional note
      log = await HabitLog.create({
        habit: habit._id,
        user: req.user._id,
        date: today,
        status: 'completed',
        note
      });
    }

    // Recalculate streaks
    const { current, longest } = await calculateStreaks(habit._id);
    
    habit.streak.current = current;
    if (longest > habit.streak.longest) {
      habit.streak.longest = longest;
    }
    habit.lastCompleted = log ? today : habit.lastCompleted;
    await habit.save();

    res.json({ 
      success: true, 
      data: { 
        isCompleted: !!log, 
        streak: habit.streak 
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Freeze a habit streak for today
// @route   POST /api/habits/:id/freeze
// @access  Private
const freezeHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already has a log for today
    let log = await HabitLog.findOne({ habit: habit._id, date: today });

    if (log) {
      return res.status(400).json({ success: false, message: 'Already has a log for today' });
    }

    // Check if user has used a freeze this week for this habit
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    const weeklyFreezes = await HabitLog.countDocuments({
      habit: habit._id,
      status: 'frozen',
      date: { $gte: startOfWeek }
    });

    if (weeklyFreezes >= 1) {
      return res.status(400).json({ success: false, message: 'Streak Freeze already used this week' });
    }

    log = await HabitLog.create({
      habit: habit._id,
      user: req.user._id,
      date: today,
      status: 'frozen'
    });

    // Recalculate streaks (freeze keeps streak alive)
    const { current, longest } = await calculateStreaks(habit._id);
    habit.streak.current = current;
    await habit.save();

    res.json({ success: true, data: { status: 'frozen', streak: habit.streak } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
  freezeHabit
};
