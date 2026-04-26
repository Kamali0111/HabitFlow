import React from 'react';
import { Check, Flame, Snowflake, MoreVertical, Trash2, Edit2 } from 'lucide-react';

const HabitCard = ({ habit, onComplete, onFreeze, onDelete, onEdit }) => {
  const isCompleted = habit.isCompletedToday;
  const isFrozen = habit.status === 'frozen';

  return (
    <div className={`card group relative overflow-hidden ${isCompleted ? 'border-purple-500/50' : ''}`}>
      {isCompleted && (
        <div className="absolute top-0 right-0 p-1 bg-purple-500 text-white rounded-bl-xl">
          <Check size={14} />
        </div>
      )}

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner animate-float"
            style={{ backgroundColor: `${habit.color}20`, color: habit.color }}
          >
            {habit.emoji}
          </div>
          <div>
            <h3 className="font-bold text-xl leading-tight group-hover:text-purple-400 transition-colors">{habit.name}</h3>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{habit.category}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
          <button onClick={() => onEdit(habit)} className="p-2.5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
            <Edit2 size={18} />
          </button>
          <button onClick={() => onDelete(habit._id)} className="p-2.5 hover:bg-red-500/10 rounded-xl text-slate-400 hover:text-red-400 transition-all">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-6 line-clamp-2 min-h-[40px] leading-relaxed">
        {habit.description || 'Consistency is the key to transformation.'}
      </p>

      {habit.note && (
        <div className="mb-6 p-3 bg-white/5 rounded-xl border border-white/5 text-xs text-slate-400 italic flex gap-2">
          <Edit2 size={12} className="flex-shrink-0 mt-0.5" />
          "{habit.note}"
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-orange-400 bg-orange-400/10 px-2 py-1 rounded-lg">
            <Flame size={18} fill="currentColor" />
            <span className="font-bold text-sm">{habit.streak?.current || 0}</span>
          </div>
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
            Best: <span className="text-slate-300 ml-1">{habit.streak?.longest || 0}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isCompleted && !isFrozen && (
            <button
              onClick={() => onFreeze(habit._id)}
              className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:scale-110 transition-all active:scale-95"
              title="Streak Freeze"
            >
              <Snowflake size={20} />
            </button>
          )}
          
          <button
            onClick={() => onComplete(habit)}
            disabled={isFrozen}
            className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 transform active:scale-95 ${
              isCompleted 
                ? 'bg-purple-600 text-white shadow-xl shadow-purple-600/30' 
                : isFrozen 
                  ? 'bg-blue-500/20 text-blue-400 cursor-not-allowed opacity-50'
                  : 'bg-white/10 text-white hover:bg-purple-600 hover:shadow-xl hover:shadow-purple-600/30'
            }`}
          >
            {isCompleted ? <Check size={20} /> : isFrozen ? 'Frozen' : 'Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
