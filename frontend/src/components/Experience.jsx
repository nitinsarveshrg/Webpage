import React from 'react';
import { Card } from './ui/card';
import { Calendar, MapPin, Briefcase, Terminal } from 'lucide-react';
import { portfolioData } from '../mock';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 font-mono">
            <Terminal className="inline mr-3" size={40} />
            &gt; cat /var/log/career.log
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 ml-16 mb-4"></div>
          <p className="text-zinc-400 text-lg font-mono ml-16">[ CHRONOLOGICAL_DEPLOYMENT_HISTORY ]</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-cyan-500/20"></div>

          <div className="space-y-12">
            {portfolioData.experience.map((job, index) => (
              <div
                key={job.id}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-black ring-2 ring-cyan-500/50"></div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <Card className="bg-black/50 border-cyan-500/30 p-6 hover:border-cyan-500 transition-all duration-300">
                    {/* Date badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs font-mono text-cyan-400 mb-4">
                      <Calendar size={12} />
                      {job.period}
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/50 rounded flex items-center justify-center flex-shrink-0">
                        <Briefcase className="text-cyan-400" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-cyan-400 mb-1 font-mono">{job.title}</h3>
                        <p className="text-green-400 font-semibold mb-2 font-mono">&gt; {job.company}</p>
                        <div className="flex items-center gap-1 text-sm text-zinc-400 font-mono">
                          <MapPin size={14} />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-zinc-300 mb-4 text-sm">{job.description}</p>
                    
                    <div className="space-y-2">
                      <div className="text-zinc-500 text-xs font-mono mb-2">&gt; KEY_ACHIEVEMENTS:</div>
                      {job.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-zinc-400 text-sm">
                          <span className="text-green-400 font-mono">[\u2713]</span>
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
