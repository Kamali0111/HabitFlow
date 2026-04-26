const Habit = require('../models/Habit');
const HabitLog = require('../models/HabitLog');

// @desc    Get summary stats
// @route   GET /api/analytics/summary
// @access  Private
const getSummary = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id, isArchived: false });
    const totalHabits = habits.length;

    if (totalHabits === 0) {
      return res.json({
        success: true,
        data: { totalHabits: 0, completionRate: 0, currentStreak: 0, longestStreak: 0 }
      });
    }

    const currentStreaks = habits.map(h => h.streak.current);
    const longestStreaks = habits.map(h => h.streak.longest);

    const maxCurrentStreak = Math.max(...currentStreaks);
    const maxLongestStreak = Math.max(...longestStreaks);

    // Calculate completion rate for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const totalLogs = await HabitLog.countDocuments({
      user: req.user._id,
      date: { $gte: thirtyDaysAgo },
      status: { $in: ['completed', 'frozen'] }
    });

    const completionRate = Math.round((totalLogs / (totalHabits * 30)) * 100);

    res.json({
      success: true,
      data: {
        totalHabits,
        completionRate: Math.min(completionRate, 100),
        currentStreak: maxCurrentStreak,
        longestStreak: maxLongestStreak
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get weekly data (last 7 days)
// @route   GET /api/analytics/weekly
// @access  Private
const getWeeklyData = async (req, res) => {
  try {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const startOfDay = new Date();
      startOfDay.setDate(startOfDay.getDate() - i);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(startOfDay);
      endOfDay.setHours(23, 59, 59, 999);

      const count = await HabitLog.countDocuments({
        user: req.user._id,
        date: { $gte: startOfDay, $lte: endOfDay },
        status: { $in: ['completed', 'frozen'] }
      });

      data.push({
        day: startOfDay.toLocaleDateString('en-US', { weekday: 'short' }),
        date: startOfDay.toISOString().split('T')[0],
        completed: count
      });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get monthly data (last 30 days)
// @route   GET /api/analytics/monthly
// @access  Private
const getMonthlyData = async (req, res) => {
  try {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const startOfDay = new Date();
      startOfDay.setDate(startOfDay.getDate() - i);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(startOfDay);
      endOfDay.setHours(23, 59, 59, 999);

      const count = await HabitLog.countDocuments({
        user: req.user._id,
        date: { $gte: startOfDay, $lte: endOfDay },
        status: { $in: ['completed', 'frozen'] }
      });

      data.push({
        date: startOfDay.toISOString().split('T')[0],
        completed: count
      });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get heatmap data (last 90 days)
// @route   GET /api/analytics/heatmap
// @access  Private
const getHeatmapData = async (req, res) => {
  try {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    ninetyDaysAgo.setHours(0, 0, 0, 0);

    const logs = await HabitLog.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: ninetyDaysAgo },
          status: { $in: ['completed', 'frozen'] }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const formattedData = logs.map(log => ({
      date: log._id,
      count: log.count
    }));

    res.json({ success: true, data: formattedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get category-wise performance breakdown
// @route   GET /api/analytics/categories
// @access  Private
const getCategoryBreakdown = async (req, res) => {
  try {
    const logs = await HabitLog.aggregate([
      {
        $match: {
          user: req.user._id,
          status: { $in: ['completed', 'frozen'] }
        }
      },
      {
        $lookup: {
          from: 'habits',
          localField: 'habit',
          foreignField: '_id',
          as: 'habitInfo'
        }
      },
      { $unwind: '$habitInfo' },
      {
        $group: {
          _id: '$habitInfo.category',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedData = logs.map(log => ({
      name: log._id,
      value: log.count
    }));

    res.json({ success: true, data: formattedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all logs with notes (Journal)
// @route   GET /api/analytics/journal
// @access  Private
const getJournal = async (req, res) => {
  try {
    const logs = await HabitLog.find({
      user: req.user._id,
      note: { $exists: true, $ne: '' }
    })
    .sort({ date: -1 })
    .populate('habit', 'name emoji color')
    .limit(50);

    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSummary,
  getWeeklyData,
  getMonthlyData,
  getHeatmapData,
  getCategoryBreakdown,
  getJournal
};
