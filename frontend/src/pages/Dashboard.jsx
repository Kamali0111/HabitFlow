import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Plus, Sparkles, RefreshCw, Calendar, CheckCircle2, Award, Zap, Flame, Target, Edit2 } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import HabitCard from '../components/HabitCard';
import Modal from '../components/Modal';
import AIInsightCard from '../components/AIInsightCard';
import AchievementCard from '../components/AchievementCard';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const [habits, setHabits] = useState([]);
  const [stats, setStats] = useState(null);
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsightOpen, setIsInsightOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState('');
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [note, setNote] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    category: 'Health',
    emoji: '⭐',
    color: '#8b5cf6'
  });

  const handleUpdateGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/auth/profile', { dailyGoal: goalInput });
      setUser(res.data.data);
      localStorage.setItem('user', JSON.stringify(res.data.data));
      setIsEditingGoal(false);
      toast.success('Daily goal updated!');
    } catch (error) {
      toast.error('Failed to update goal');
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [habitsRes, statsRes] = await Promise.all([
        api.get('/habits'),
        api.get('/analytics/summary')
      ]);
      setHabits(habitsRes.data.data);
      setStats(statsRes.data.data);

      // Calculate milestones locally based on stats
      const maxStreak = statsRes.data.data.longestStreak || 0;
      setMilestones([
        { title: '1 Week Warrior', level: 'Bronze', threshold: 7, isUnlocked: maxStreak >= 7 },
        { title: 'Consistency King', level: 'Silver', threshold: 30, isUnlocked: maxStreak >= 30 },
        { title: 'Habit Master', level: 'Gold', threshold: 100, isUnlocked: maxStreak >= 100 }
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchInsights = async () => {
    setIsInsightOpen(true);
    try {
      const res = await api.get('/ai/suggestions');
      setInsights(res.data.data);
    } catch (error) {
      console.error('Error fetching AI insights:', error);
    }
  };

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    try {
      if (newHabit._id) {
        await api.put(`/habits/${newHabit._id}`, newHabit);
        toast.success('Habit updated!');
      } else {
        await api.post('/habits', newHabit);
        toast.success('Habit created! Let\'s go!');
      }
      setIsModalOpen(false);
      fetchData();
      setNewHabit({ name: '', description: '', category: 'Health', emoji: '⭐', color: '#8b5cf6' });
    } catch (error) {
      toast.error('Failed to save habit');
    }
  };

  const handleCompleteClick = (habit) => {
    if (habit.isCompletedToday) {
      handleComplete(habit._id);
    } else {
      setSelectedHabit(habit);
      setIsNoteModalOpen(true);
    }
  };

  const handleCompleteWithNote = async (e) => {
    e.preventDefault();
    await handleComplete(selectedHabit._id, note);
    setIsNoteModalOpen(false);
    setNote('');
    setSelectedHabit(null);
  };

  const handleComplete = async (id, note = '') => {
    try {
      const res = await api.post(`/habits/${id}/complete`, { note });
      const habit = habits.find(h => h._id === id);
      if (res.data.data.isCompleted) {
        toast.success(`${habit.emoji} ${habit.name} completed!`, {
          icon: '🔥',
          duration: 2000
        });
      } else {
        toast('Habit un-completed', { icon: '↩️' });
      }
      fetchData();
    } catch (error) {
      toast.error('Failed to update habit');
    }
  };

  const handleFreeze = async (id) => {
    try {
      await api.post(`/habits/${id}/freeze`);
      toast.success('Streak Frozen! ❄️');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to freeze habit');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        await api.delete(`/habits/${id}`);
        toast.success('Habit deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete habit');
      }
    }
  };

  const categories = ['Health', 'Fitness', 'Study', 'Mindfulness', 'Finance', 'Other'];
  const emojis = ['⭐', '💪', '🧘', '📚', '🥗', '💧', '💤', '📝', '🍎', '🏃', '💰', '🧠'];
  const colors = ['#8b5cf6', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Calendar size={16} />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
          <h1 className="text-3xl font-bold">{getGreeting()}, {user?.name.split(' ')[0]}!</h1>
          <p className="text-slate-400">You've completed {habits.filter(h => h.isCompletedToday).length} habits today. Keep it up!</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={fetchInsights}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 text-purple-400 rounded-xl hover:bg-purple-500/30 transition-all group"
          >
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
            AI Insights
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2 py-2"
          >
            <Plus size={18} />
            Add Habit
          </button>
        </div>
      </div>

      {/* Goal & Welcome Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 card flex flex-col md:flex-row items-center gap-8 overflow-hidden relative border-none bg-gradient-to-br from-purple-600 to-indigo-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
          <div className="flex-1 relative z-10 text-center md:text-left">
            <h2 className="text-3xl font-black mb-4 tracking-tight text-white">Your transformation is in progress.</h2>
            <p className="text-purple-100 text-lg max-w-xl mb-8 leading-relaxed">
              Every small action today builds the person you become tomorrow. Let AI guide your consistency.
            </p>
            <button onClick={() => setIsModalOpen(true)} className="bg-white text-purple-700 px-6 py-3 rounded-xl font-bold hover:bg-purple-50 transition-all">Add New Habit</button>
          </div>
          <div className="flex-shrink-0 relative z-10 animate-float">
            <img src="/images/welcome.png" alt="Welcome" className="w-40 h-40 object-contain" />
          </div>
        </div>

        <div className="card border-purple-500/30 bg-purple-500/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400">Daily Goal</h3>
              <Target size={20} className="text-purple-400" />
            </div>
            {isEditingGoal ? (
              <form onSubmit={handleUpdateGoal}>
                <input
                  autoFocus
                  className="w-full bg-slate-900/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 ring-purple-500/20 mb-4"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  onBlur={() => setIsEditingGoal(false)}
                />
                <button type="submit" className="hidden">Save</button>
              </form>
            ) : (
              <p 
                onClick={() => {
                  setGoalInput(user?.dailyGoal || '');
                  setIsEditingGoal(true);
                }}
                className="text-xl font-bold text-slate-200 cursor-pointer hover:text-white transition-colors group"
              >
                "{user?.dailyGoal || 'Set a daily goal...'}"
                <Edit2 size={14} className="inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            )}
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Consistency Score
            </div>
            <div className="text-xs font-bold text-emerald-400">
              +{stats?.completionRate || 0}% this month
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard 
          title="Total Habits" 
          value={stats?.totalHabits || 0} 
          icon={CheckCircle2} 
          color="purple" 
        />
        <StatsCard 
          title="Completion Rate" 
          value={`${stats?.completionRate || 0}%`} 
          icon={Zap} 
          color="emerald" 
        />
        <StatsCard 
          title="Current Streak" 
          value={`${stats?.currentStreak || 0} days`} 
          icon={Flame} 
          color="orange" 
        />
        <StatsCard 
          title="Longest Streak" 
          value={`${stats?.longestStreak || 0} days`} 
          icon={Award} 
          color="blue" 
        />
      </div>

      {/* Habit List */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">My Habits</h2>
          <div className="text-sm text-slate-500">
            Showing {habits.length} habits
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="card h-48 animate-pulse bg-slate-800/50"></div>
            ))}
          </div>
        ) : habits.length === 0 ? (
          <div className="card text-center py-16 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-3xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-2">No habits yet?</h3>
            <p className="text-slate-400 mb-8 max-w-sm">Every transformation starts with a single step. Add your first habit to begin your journey!</p>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary py-2">Add First Habit</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map(habit => (
              <HabitCard 
                key={habit._id} 
                habit={habit}
                onComplete={handleCompleteClick}
                onFreeze={handleFreeze}
                onDelete={handleDelete}
                onEdit={(h) => {
                  setNewHabit(h);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Achievements Section */}
      <div className="mt-20 mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">Recent Milestones</h2>
          <Link to="/profile" className="text-sm text-purple-400 hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <AchievementCard key={idx} milestone={m} />
          ))}
        </div>
      </div>

      {/* Complete with Note Modal */}
      <Modal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        title={`Complete: ${selectedHabit?.name}`}
      >
        <form onSubmit={handleCompleteWithNote} className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20">
            <div className="text-3xl">{selectedHabit?.emoji}</div>
            <div>
              <p className="text-sm text-slate-400">Add a quick note about your progress today (optional).</p>
            </div>
          </div>
          
          <textarea
            className="input-field min-h-[120px] py-4"
            placeholder="How did it go? (e.g. 'Feeling strong!', 'Finished 5 miles')"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            autoFocus
          ></textarea>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                handleComplete(selectedHabit._id);
                setIsNoteModalOpen(false);
              }}
              className="flex-1 btn-secondary"
            >
              Skip Note
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              Save & Complete
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Habit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={newHabit._id ? "Edit Habit" : "Create New Habit"}
      >
        <form onSubmit={handleCreateHabit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Habit Name</label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="e.g. Morning Meditation"
              value={newHabit.name}
              onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description (Optional)</label>
            <textarea
              className="input-field min-h-[100px] py-3"
              placeholder="Why is this habit important to you?"
              value={newHabit.description}
              onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select
                className="input-field py-3"
                value={newHabit.category}
                onChange={(e) => setNewHabit({...newHabit, category: e.target.value})}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Emoji</label>
              <div className="grid grid-cols-4 gap-2 p-2 bg-slate-900/50 rounded-xl border border-white/10">
                {emojis.slice(0, 8).map(e => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setNewHabit({...newHabit, emoji: e})}
                    className={`text-xl p-1 rounded-lg transition-all ${newHabit.emoji === e ? 'bg-purple-600' : 'hover:bg-white/10'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Color Accent</label>
            <div className="flex flex-wrap gap-3">
              {colors.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setNewHabit({...newHabit, color: c})}
                  className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 ${newHabit.color === c ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                ></button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 btn-secondary py-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary py-3"
            >
              {newHabit._id ? 'Save Changes' : 'Create Habit'}
            </button>
          </div>
        </form>
      </Modal>

      {/* AI Insights Modal */}
      <Modal
        isOpen={isInsightOpen}
        onClose={() => setIsInsightOpen(false)}
        title="AI Personal Insights"
      >
        <div className="space-y-4">
          {insights.length === 0 ? (
            <div className="text-center py-12">
              <RefreshCw className="mx-auto mb-4 animate-spin text-purple-500" />
              <p className="text-slate-400">Analyzing your habit data...</p>
            </div>
          ) : (
            insights.map((insight, idx) => (
              <AIInsightCard key={idx} insight={insight} />
            ))
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
