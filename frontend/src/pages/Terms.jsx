import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-black mb-8">Terms of <span className="gradient-text">Service.</span></h1>
      <div className="card space-y-8 text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using HabitFlow, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on HabitFlow's website for personal, non-commercial transitory viewing only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">3. Disclaimer</h2>
          <p>
            The materials on HabitFlow's website are provided on an 'as is' basis. HabitFlow makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">4. Limitations</h2>
          <p>
            In no event shall HabitFlow or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on HabitFlow's website.
          </p>
        </section>
        
        <div className="pt-8 border-t border-white/10 text-sm text-slate-500">
          Last updated: April 26, 2026
        </div>
      </div>
    </div>
  );
};

export default Terms;
