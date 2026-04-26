import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { Calendar, TrendingUp, Target, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import HeatmapGrid from '../components/HeatmapGrid';

const Analytics = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [journal, setJournal] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const [weekly, monthly, heatmap, summ, categories, journalRes] = await Promise.all([
          api.get('/analytics/weekly'),
          api.get('/analytics/monthly'),
          api.get('/analytics/heatmap'),
          api.get('/analytics/summary'),
          api.get('/analytics/categories'),
          api.get('/analytics/journal')
        ]);
        setWeeklyData(weekly.data.data);
        setMonthlyData(monthly.data.data);
        setHeatmapData(heatmap.data.data);
        setSummary(summ.data.data);
        setCategoryData(categories.data.data);
        setJournal(journalRes.data.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-dark p-3 border border-white/10 rounded-xl shadow-xl">
          <p className="text-xs text-slate-400 mb-1">{label}</p>
          <p className="text-sm font-bold text-purple-400">
            {payload[0].value} Habits Completed
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center">Loading Analytics...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Advanced Analytics</h1>
        <p className="text-slate-400">Deep dive into your habit performance and trends.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Weekly Performance */}
        <div className="lg:col-span-2 card min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar size={20} className="text-purple-500" />
              Weekly Performance
            </h3>
          </div>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
                <Bar 
                  dataKey="completed" 
                  fill="url(#colorPurple)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40} 
                />
                <defs>
                  <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Column */}
        <div className="space-y-8">
          <div className="card bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border-purple-500/20">
            <h4 className="text-slate-400 text-sm font-bold uppercase mb-4 tracking-wider">Consistency Score</h4>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-extrabold text-white">{summary?.completionRate || 0}%</span>
              <TrendingUp className="text-emerald-400 mb-2" size={24} />
            </div>
            <p className="text-sm text-slate-400">Across all {summary?.totalHabits || 0} active habits in the last 30 days.</p>
          </div>

          <div className="card h-full flex flex-col">
            <h4 className="text-slate-400 text-sm font-bold uppercase mb-6 tracking-wider">Category Breakdown</h4>
            <div className="flex-grow min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 5]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.slice(0, 4).map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 5] }}></div>
                    <span className="text-slate-400">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap & Monthly Line */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-500" />
            Monthly Momentum
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  hide 
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorArea)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card flex flex-col">
          <h3 className="text-xl font-bold mb-4">Activity Heatmap</h3>
          <p className="text-slate-400 text-sm mb-8">Visualization of your completion frequency over the last 90 days.</p>
          <div className="flex-grow flex items-center justify-center">
            <HeatmapGrid data={heatmapData} />
          </div>
          <div className="mt-8 flex items-center justify-between text-xs text-slate-500">
            <span>Less active</span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-slate-800"></div>
              <div className="w-3 h-3 rounded-sm bg-purple-900/40"></div>
              <div className="w-3 h-3 rounded-sm bg-purple-700/60"></div>
              <div className="w-3 h-3 rounded-sm bg-purple-500/80"></div>
              <div className="w-3 h-3 rounded-sm bg-purple-400"></div>
            </div>
            <span>More active</span>
          </div>
        </div>
      </div>

      {/* Daily Journal */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-8">Daily Journal</h3>
        {journal.length === 0 ? (
          <div className="card text-center py-12 text-slate-500">
            No notes recorded yet. Start adding notes when you complete your habits!
          </div>
        ) : (
          <div className="space-y-4">
            {journal.map((entry) => (
              <div key={entry._id} className="card">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${entry.habit.color}20`, color: entry.habit.color }}>
                      {entry.habit.emoji}
                    </div>
                    <div>
                      <h4 className="font-bold">{entry.habit.name}</h4>
                      <p className="text-xs text-slate-500">{new Date(entry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/5 italic text-slate-300">
                    "{entry.note}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
