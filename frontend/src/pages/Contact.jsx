import React from 'react';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6">Get in <span className="gradient-text">Touch.</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Have questions about HabitFlow? We're here to help you on your journey to peak consistency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="card">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-slate-400 mb-4">Our team typically responds within 24 hours.</p>
                <a href="mailto:support@habitflow.ai" className="text-purple-400 font-bold hover:underline">support@habitflow.ai</a>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 flex-shrink-0">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                <p className="text-slate-400 mb-4">Available for Pro members 24/7.</p>
                <button className="text-indigo-400 font-bold hover:underline">Start a conversation</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Headquarters</h3>
                <p className="text-slate-400">123 Consistency Way<br />Silicon Valley, CA 94025</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Name</label>
                <input type="text" className="input-field" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Email</label>
                <input type="email" className="input-field" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Subject</label>
              <select className="input-field py-3">
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Billing Question</option>
                <option>Feature Request</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Message</label>
              <textarea className="input-field min-h-[150px] py-4" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-4">
              <Send size={20} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
