const HabitLog = require('../models/HabitLog');
const Habit = require('../models/Habit');

/**
 * Calculates current and longest streak for a habit
 * @param {string} habitId 
 * @returns {Promise<{current: number, longest: number}>}
 */
const calculateStreaks = async (habitId) => {
  const logs = await HabitLog.find({ habit: habitId }).sort({ date: -1 });
  
  if (logs.length === 0) return { current: 0, longest: 0 };

  let current = 0;
  let longest = 0;
  let tempLongest = 0;
  
  // Sort logs by date descending for current streak
  // Sort logs by date ascending for longest streak calculation
  const sortedLogs = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if current streak is active (either completed today or yesterday)
  const lastLogDate = new Date(sortedLogs[0].date);
  lastLogDate.setHours(0, 0, 0, 0);

  if (lastLogDate.getTime() >= yesterday.getTime()) {
    let lastDate = lastLogDate;
    current = 1;
    
    for (let i = 1; i < sortedLogs.length; i++) {
      const currentDate = new Date(sortedLogs[i].date);
      currentDate.setHours(0, 0, 0, 0);
      
      const diffTime = lastDate.getTime() - currentDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        current++;
        lastDate = currentDate;
      } else {
        break;
      }
    }
  }

  // Longest streak calculation
  const ascLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));
  let streakCounter = 1;
  longest = 1;
  
  for (let i = 1; i < ascLogs.length; i++) {
    const prevDate = new Date(ascLogs[i-1].date);
    prevDate.setHours(0, 0, 0, 0);
    const currDate = new Date(ascLogs[i].date);
    currDate.setHours(0, 0, 0, 0);
    
    const diffTime = currDate.getTime() - prevDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streakCounter++;
    } else {
      streakCounter = 1;
    }
    
    if (streakCounter > longest) {
      longest = streakCounter;
    }
  }

  return { current, longest };
};

module.exports = { calculateStreaks };
