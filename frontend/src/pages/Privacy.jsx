import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-black mb-8">Privacy <span className="gradient-text">Policy.</span></h1>
      <div className="card space-y-8 text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
          <p>
            Welcome to HabitFlow. We value your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">2. Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li><strong>Identity Data</strong> includes first name, last name, and username.</li>
            <li><strong>Contact Data</strong> includes email address.</li>
            <li><strong>Technical Data</strong> includes IP address, browser type, and version.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website and habits.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">3. AI and Data Processing</h2>
          <p>
            Our AI Insights feature processes your habit data locally to provide suggestions. We do not sell your personal data to third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">4. Your Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, or erasure of your personal data.
          </p>
        </section>
        
        <div className="pt-8 border-t border-white/10 text-sm text-slate-500">
          Last updated: April 26, 2026
        </div>
      </div>
    </div>
  );
};

export default Privacy;
