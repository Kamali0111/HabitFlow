import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color, trend }) => {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}% vs last week
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-${color}-500/10`}>
          <Icon className={`text-${color}-500`} size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
