import React from 'react';
import { Award, Star, Zap, Shield } from 'lucide-react';

const AchievementCard = ({ milestone }) => {
  const isUnlocked = milestone.isUnlocked;

  return (
    <div className={`p-4 rounded-3xl border transition-all duration-500 ${
      isUnlocked 
        ? 'glass border-purple-500/30 shadow-lg shadow-purple-500/10' 
        : 'bg-white/5 border-white/5 opacity-40 grayscale'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
          milestone.level === 'Gold' ? 'bg-amber-500/20 text-amber-500' :
          milestone.level === 'Silver' ? 'bg-slate-300/20 text-slate-300' :
          'bg-orange-500/20 text-orange-500'
        }`}>
          {milestone.level === 'Gold' ? <Award size={24} /> : 
           milestone.level === 'Silver' ? <Zap size={24} /> : <Star size={24} />}
        </div>
        <div>
          <h4 className="font-bold text-sm">{milestone.title}</h4>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            {isUnlocked ? 'Unlocked' : 'Locked'} • {milestone.level}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
