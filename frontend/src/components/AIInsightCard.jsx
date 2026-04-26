import React from 'react';

const AIInsightCard = ({ insight }) => {
  const getStyles = () => {
    switch (insight.type) {
      case 'success': return 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400';
      case 'warning': return 'border-amber-500/20 bg-amber-500/5 text-amber-400';
      case 'danger': return 'border-rose-500/20 bg-rose-500/5 text-rose-400';
      default: return 'border-blue-500/20 bg-blue-500/5 text-blue-400';
    }
  };

  return (
    <div className={`p-4 rounded-2xl border ${getStyles()} flex gap-4 animate-in slide-in-from-right duration-500`}>
      <div className="text-2xl flex-shrink-0">{insight.icon}</div>
      <div>
        <h4 className="font-bold mb-1">{insight.title}</h4>
        <p className="text-sm opacity-80 leading-relaxed">{insight.message}</p>
      </div>
    </div>
  );
};

export default AIInsightCard;
