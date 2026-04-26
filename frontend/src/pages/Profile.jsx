import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { User, Mail, Moon, Sun, Shield, LogOut, Award, Calendar, Edit2, Check, X, Ruler, Weight, UserCircle } from 'lucide-react';

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const { isDarkMode, toggleTheme, themeColor, changeThemeColor } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    weight: user?.weight || '',
    height: user?.height || '',
    bio: user?.bio || '',
    dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : ''
  });

  const themeColors = [
    { id: 'purple', name: 'HabitFlow Purple', color: '#8b5cf6' },
    { id: 'blue', name: 'Ocean Blue', color: '#3b82f6' },
    { id: 'green', name: 'Emerald Forest', color: '#10b981' },
    { id: 'red', name: 'Ruby Sunset', color: '#ef4444' },
  ];

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/auth/profile', formData);
      setUser(res.data.data);
      localStorage.setItem('user', JSON.stringify(res.data.data));
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-slate-400">Manage your health metrics and preferences.</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
            isEditing ? 'border-red-500/30 text-red-400 bg-red-500/10' : 'border-purple-500/30 text-purple-400 bg-purple-500/10'
          }`}
        >
          {isEditing ? <><X size={18} /> Cancel</> : <><Edit2 size={18} /> Edit Profile</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="card text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl text-white font-bold mb-6 shadow-2xl animate-float">
              {user?.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold mb-1">{user?.name}</h2>
            <p className="text-slate-400 text-sm mb-6">{user?.email}</p>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-500/30 text-red-400 rounded-2xl hover:bg-red-500/10 transition-all font-bold"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-slate-500">About Me</h3>
            {isEditing ? (
              <textarea
                className="input-field min-h-[100px] text-sm py-2"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-sm text-slate-300 leading-relaxed italic">
                {user?.bio || "No bio added yet. Click edit to add one!"}
              </p>
            )}
          </div>
        </div>

        {/* Form / Details */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleUpdateProfile} className="card">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Shield size={20} className="text-purple-500" />
              Health & Personal Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="input-field py-2"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                      <UserCircle size={18} className="text-slate-500" />
                      <span className="font-bold">{user?.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      className="input-field py-2"
                      value={formData.dob}
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                      <Calendar size={18} className="text-slate-500" />
                      <span className="font-bold">{user?.dob ? new Date(user.dob).toLocaleDateString() : 'Not set'}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Weight (kg)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        className="input-field py-2"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <Weight size={18} className="text-slate-500" />
                        <span className="font-bold">{user?.weight || '--'}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Height (cm)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        className="input-field py-2"
                        value={formData.height}
                        onChange={(e) => setFormData({...formData, height: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <Ruler size={18} className="text-slate-500" />
                        <span className="font-bold">{user?.height || '--'}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Age</label>
                  {isEditing ? (
                    <input
                      type="number"
                      className="input-field py-2"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                      <User size={18} className="text-slate-500" />
                      <span className="font-bold">{user?.age || '--'} years</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-8 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
                >
                  <Check size={18} /> Save Changes
                </button>
              </div>
            )}
          </form>

          <div className="card">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Sun size={20} className="text-amber-500" />
              Preferences
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div>
                  <div className="font-bold">Display Mode</div>
                  <div className="text-xs text-slate-500">Switch between light and dark themes.</div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`p-3 rounded-xl transition-all ${isDarkMode ? 'bg-slate-800 text-amber-400' : 'bg-amber-100 text-amber-600'}`}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              <div>
                <div className="font-bold mb-4">Dashboard Theme</div>
                <div className="grid grid-cols-2 gap-3">
                  {themeColors.map(c => (
                    <button
                      key={c.id}
                      onClick={() => changeThemeColor(c.id)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                        themeColor === c.id 
                          ? 'border-purple-500 bg-purple-500/10' 
                          : 'border-white/5 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color }}></div>
                      <span className="text-sm font-medium">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
