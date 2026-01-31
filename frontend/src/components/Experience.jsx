import React from 'react';
import { Card } from './ui/card';
import { Calendar, MapPin, Briefcase, Clock } from 'lucide-react';
import { portfolioData } from '../mock';

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-blue-400" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Work Experience
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
          <p className="text-slate-400 text-lg mt-4">Professional journey building cloud infrastructure</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 opacity-30"></div>

          <div className="space-y-12">
            {portfolioData.experience.map((job, index) => (
              <div
                key={job.id}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full border-4 border-slate-900 shadow-lg shadow-blue-500/50 z-10"></div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <Card className="bg-slate-900/50 border-2 border-blue-500/30 p-6 hover:border-blue-500/60 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20">
                    {/* Date badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-400 mb-4">
                      <Calendar size={12} />
                      {job.period}
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Briefcase className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                        <p className="text-blue-400 font-semibold mb-2">{job.company}</p>
                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <MapPin size={14} />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4 text-sm">{job.description}</p>
                    
                    <div className="space-y-2">
                      <div className="text-slate-500 text-xs font-semibold mb-2 uppercase tracking-wide">Key Achievements</div>
                      {job.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-slate-400 text-sm">
                          <span className="text-green-400">✓</span>
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
