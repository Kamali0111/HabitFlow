const Habit = require('../models/Habit');
const HabitLog = require('../models/HabitLog');

// @desc    Get AI-powered habit suggestions and insights
// @route   GET /api/ai/suggestions
// @access  Private
const getSuggestions = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id, isArchived: false });
    if (habits.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const logs = await HabitLog.find({
      user: req.user._id,
      date: { $gte: thirtyDaysAgo },
      status: { $in: ['completed', 'frozen'] }
    });

    const insights = [];

    // 1. Consistency Score
    const totalPossibleLogs = habits.length * 30;
    const actualLogs = logs.length;
    const consistencyScore = Math.round((actualLogs / totalPossibleLogs) * 100);
    
    insights.push({
      type: consistencyScore > 70 ? 'success' : consistencyScore > 40 ? 'info' : 'warning',
      icon: '📊',
      title: 'Overall Consistency',
      message: `Your consistency score is ${consistencyScore}%. ${consistencyScore > 70 ? 'Excellent work! Keep it up.' : 'Try to be more consistent to see better results.'}`
    });

    // 2. Best Day Detection
    const dayCounts = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat
    logs.forEach(log => {
      const day = new Date(log.date).getDay();
      dayCounts[day]++;
    });
    const maxDayIdx = dayCounts.indexOf(Math.max(...dayCounts));
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    if (Math.max(...dayCounts) > 0) {
      insights.push({
        type: 'success',
        icon: '🌟',
        title: 'Best Day',
        message: `You are most productive on ${dayNames[maxDayIdx]}s. Keep that energy flowing!`
      });
    }

    // 3. At-Risk Habit
    const habitCompletionCounts = {};
    logs.forEach(log => {
      const hId = log.habit.toString();
      habitCompletionCounts[hId] = (habitCompletionCounts[hId] || 0) + 1;
    });

    const atRiskHabit = habits.find(h => {
      const count = habitCompletionCounts[h._id.toString()] || 0;
      return (count / 30) < 0.4;
    });

    if (atRiskHabit) {
      insights.push({
        type: 'danger',
        icon: '⚠️',
        title: 'At-Risk Habit',
        message: `"${atRiskHabit.name}" has a low completion rate lately. Small steps lead to big changes!`
      });
    }

    // 4. Momentum Trend (Last 7 vs Previous 7)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    fourteenDaysAgo.setHours(0, 0, 0, 0);

    const last7Count = logs.filter(l => new Date(l.date) >= sevenDaysAgo).length;
    const prev7Count = logs.filter(l => new Date(l.date) >= fourteenDaysAgo && new Date(l.date) < sevenDaysAgo).length;

    if (last7Count > prev7Count) {
      insights.push({
        type: 'success',
        icon: '📈',
        title: 'Positive Momentum',
        message: 'Your activity has increased compared to last week. Great job!'
      });
    } else if (last7Count < prev7Count) {
      insights.push({
        type: 'warning',
        icon: '📉',
        title: 'Momentum Alert',
        message: 'You have been less active this week. Time to get back on track!'
      });
    }

    // 5. Overload Warning
    if (habits.length >= 7 && consistencyScore < 50) {
      insights.push({
        type: 'warning',
        icon: '🛑',
        title: 'Overload Warning',
        message: "You have a lot of habits but a low completion rate. Consider focusing on your top 3 first."
      });
    }

    // Sort or filter to return exactly 4-5
    res.json({ success: true, data: insights.slice(0, 5) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSuggestions
};
