import React from 'react';
import { Card } from './ui/card';
import { CheckCircle2, UserCircle } from 'lucide-react';
import { portfolioData } from '../mock';

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <UserCircle className="text-blue-400" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              About Me
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Bio */}
          <Card className="bg-slate-900/50 border-2 border-blue-500/30 p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Professional Background</h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              {portfolioData.about.bio}
            </p>
          </Card>

          {/* Highlights */}
          <Card className="bg-slate-900/50 border-2 border-blue-500/30 p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Key Highlights</h3>
            <div className="space-y-4">
              {portfolioData.about.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-300">{highlight}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
