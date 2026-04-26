import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogOut, User as UserIcon, LayoutDashboard, BarChart3, Menu, X } from 'lucide-react';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-[100] glass dark:glass-dark border-b border-white/5 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="text-xl font-bold gradient-text">HabitFlow</span>
            </Link>

            {user && (
              <div className="hidden md:flex items-center gap-6">
                <Link to="/dashboard" className="flex items-center gap-2 hover:text-purple-500 transition-colors">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/analytics" className="flex items-center gap-2 hover:text-purple-500 transition-colors">
                  <BarChart3 size={18} />
                  <span>Analytics</span>
                </Link>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user && <NotificationBell />}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="group-hover:text-purple-500 transition-colors">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="px-4 py-2 hover:text-purple-500 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary py-2 px-4">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-white/10"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-dark border-t border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/analytics" 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Analytics
                </Link>
                <Link 
                  to="/profile" 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10">
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg bg-purple-600 text-white">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
