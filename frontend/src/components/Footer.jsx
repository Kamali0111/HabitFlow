import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12 glass dark:glass-dark border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="text-xl font-bold gradient-text">HabitFlow</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              The AI-powered habit tracker designed to help you build consistency, track your progress, and transform your life through smart insights.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/#features" className="hover:text-purple-400 transition-colors">Features</Link></li>
              <li><Link to="/analytics" className="hover:text-purple-400 transition-colors">Analytics</Link></li>
              <li><Link to="/dashboard" className="hover:text-purple-400 transition-colors">AI Insights</Link></li>
              <li><Link to="/register" className="hover:text-purple-400 transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} HabitFlow. All rights reserved. Built with ❤️ for better habits.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
