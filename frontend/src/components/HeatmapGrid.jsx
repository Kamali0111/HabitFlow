import React from 'react';

const HeatmapGrid = ({ data }) => {
  // Simple 7x13 grid for ~90 days
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const days = [];
  for (let i = 90; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const log = data.find(d => d.date === dateStr);
    days.push({
      date: dateStr,
      count: log ? log.count : 0
    });
  }

  const getColor = (count) => {
    if (count === 0) return 'bg-slate-800/50';
    if (count === 1) return 'bg-purple-900/40';
    if (count === 2) return 'bg-purple-700/60';
    if (count === 3) return 'bg-purple-500/80';
    return 'bg-purple-400';
  };

  return (
    <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
      {days.map((day, i) => (
        <div
          key={i}
          className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-150 cursor-pointer ${getColor(day.count)}`}
          title={`${day.date}: ${day.count} habits`}
        ></div>
      ))}
    </div>
  );
};

export default HeatmapGrid;
