import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Zap, BarChart3, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const Landing = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[140px] rounded-full animate-float"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[140px] rounded-full animate-pulse-slow"></div>
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-fuchsia-600/5 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 mb-8 bg-white/5 border border-white/10 rounded-full backdrop-blur-md animate-in slide-in-from-top duration-700">
              <span className="text-sm font-bold gradient-text">✨ New: AI Insights 2.0 is live!</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight text-white">
              Master Your<br />
              Daily Habits<br />
              <span className="gradient-text">Like a Pro.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl lg:mx-0 leading-relaxed">
              Transform your routines into automatic successes. Experience the most beautiful and intelligent habit tracker ever built.
            </p>
            <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-6">
              <Link to="/register" className="btn-primary text-xl px-12 py-5 shadow-2xl shadow-purple-600/40">
                Get Started Free →
              </Link>
              <Link to="/login" className="btn-secondary text-xl px-12 py-5">
                Live Preview
              </Link>
            </div>
          </div>

          <div className="flex-1 relative animate-float">
            <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full"></div>
            <img 
              src="/images/hero.png" 
              alt="HabitFlow Hero" 
              className="relative z-10 w-full max-w-lg mx-auto rounded-[3rem] shadow-2xl border border-white/10"
            />
          </div>
        </div>
      </section>

      {/* Stats / Proof */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Active Users', value: '50K+' },
            { label: 'Habits Tracked', value: '1M+' },
            { label: 'Avg. Consistency', value: '84%' },
            { label: 'User Satisfaction', value: '4.9/5' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why HabitFlow?</h2>
            <p className="text-slate-400">Everything you need to master your daily routine.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">AI-Powered Insights</h3>
              <p className="text-slate-400">Our engine analyzes your patterns and gives you actionable suggestions to improve your consistency.</p>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Advanced Analytics</h3>
              <p className="text-slate-400">Visualize your progress with detailed charts, heatmaps, and streak tracking that keeps you motivated.</p>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Streak Freeze</h3>
              <p className="text-slate-400">Life happens. Use our unique "Freeze" feature once a week to protect your hard-earned streaks when you need a break.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by over 50,000 users</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Jenkins",
                role: "Marketing Director",
                text: "HabitFlow changed how I approach my mornings. The AI insights actually helped me realize why I was failing on Tuesdays!",
                image: "SJ"
              },
              {
                name: "David Chen",
                role: "Software Engineer",
                text: "The cleanest UI I've ever seen in a habit tracker. The dark mode and glassmorphism design are absolutely stunning.",
                image: "DC"
              },
              {
                name: "Marcus Thorne",
                role: "Fitness Coach",
                text: "I recommend this to all my clients. The streak freeze feature is a game-changer for maintaining long-term motivation.",
                image: "MT"
              }
            ].map((t, i) => (
              <div key={i} className="card relative">
                <div className="absolute top-[-20px] left-8 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold border-4 border-slate-900">
                  {t.image}
                </div>
                <div className="pt-4">
                  <p className="text-slate-300 italic mb-6">"{t.text}"</p>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto card bg-gradient-to-br from-purple-600 to-indigo-700 text-center py-16 border-none">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to transform your life?</h2>
          <p className="text-purple-100 mb-10 max-w-xl mx-auto">Join thousands of others who are building better lives one habit at a time. No credit card required.</p>
          <Link to="/register" className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all transform hover:scale-105 inline-block">
            Get Started Now — It's Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
