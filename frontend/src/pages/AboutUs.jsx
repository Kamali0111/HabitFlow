import React from 'react';
import { Target, Heart, Award, Shield } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-black mb-6">About <span className="gradient-text">HabitFlow.</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          We are on a mission to help 1 million people build better lives through consistency and artificial intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full"></div>
          <img 
            src="/images/welcome.png" 
            alt="Our Vision" 
            className="relative z-10 w-full max-w-md mx-auto animate-float"
          />
        </div>
        <div className="flex flex-col justify-center space-y-8">
          <h2 className="text-3xl font-bold">Our Vision</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            HabitFlow was born out of the idea that small, daily actions are the building blocks of a great life. We believe that tracking these actions shouldn't be a chore, but a rewarding experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                <Target size={20} />
              </div>
              <div>
                <h4 className="font-bold">Goal Oriented</h4>
                <p className="text-xs text-slate-500">Helping you hit every target.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 flex-shrink-0">
                <Heart size={20} />
              </div>
              <div>
                <h4 className="font-bold">User Centric</h4>
                <p className="text-xs text-slate-500">Designed for your success.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card text-center py-16">
        <h2 className="text-3xl font-bold mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mx-auto mb-6">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Privacy First</h3>
            <p className="text-slate-400">Your data stays your data. Our AI processing is designed to protect your identity.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto mb-6">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Over Quantity</h3>
            <p className="text-slate-400">We focus on meaningful habits that drive real-world transformation.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Infinite Growth</h3>
            <p className="text-slate-400">We believe in continuous improvement for both our platform and our users.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
