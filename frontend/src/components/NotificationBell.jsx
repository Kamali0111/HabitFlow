import React, { useState, useEffect } from 'react';
import { Bell, Check, Info, AlertTriangle, Zap } from 'lucide-react';
import api from '../api/axios';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll for notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl hover:bg-white/10 transition-colors relative"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 glass-dark border border-white/10 rounded-2xl shadow-2xl z-[200] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h4 className="font-bold">Notifications</h4>
            <span className="text-xs text-slate-500">{unreadCount} New</span>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                No notifications yet.
              </div>
            ) : (
              notifications.map((n) => (
                <div 
                  key={n._id}
                  onClick={() => markAsRead(n._id)}
                  className={`p-4 border-b border-white/5 cursor-pointer transition-colors hover:bg-white/5 ${!n.isRead ? 'bg-purple-500/5' : ''}`}
                >
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      n.type === 'streak' ? 'bg-orange-500/20 text-orange-400' :
                      n.type === 'milestone' ? 'bg-amber-500/20 text-amber-400' :
                      n.type === 'alert' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {n.type === 'streak' ? <Zap size={16} /> : <Info size={16} />}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{n.title}</div>
                      <div className="text-xs text-slate-400 line-clamp-2">{n.message}</div>
                      <div className="text-[10px] text-slate-600 mt-1">{new Date(n.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
