import React from 'react';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { portfolioData } from '../mock';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-cyan-400 text-sm ml-4">root@cloud-devops: ~/experience</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="terminal-body terminal-overlay">
          <div className="text-green-400 mb-6">
            <div className="mb-2"><span className="text-cyan-400">root@cloud-devops:~$</span> cat career.log | tail -n 20</div>
            <div className="ml-4 text-zinc-400 text-sm mb-4">Loading employment history...</div>
          </div>

          <div className="space-y-6">
            {portfolioData.experience.map((job, index) => (
              <div
                key={job.id}
                className="terminal-panel"
              >
                {/* Job header */}
                <div className="flex items-start gap-3 mb-3 pb-3 border-b border-cyan-500/20">
                  <Briefcase className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-cyan-400 font-bold text-sm">[{portfolioData.experience.length - index}]</span>
                      <span className="text-white font-bold">{job.title}</span>
                    </div>
                    <div className="text-green-400 text-sm mb-1">&gt; {job.company}</div>
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{job.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <div className="text-green-400 text-xs mb-1">$ cat description.txt</div>
                  <p className="text-zinc-300 text-xs ml-2">{job.description}</p>
                </div>

                {/* Achievements */}
                <div>
                  <div className="text-green-400 text-xs mb-1">$ grep "achievement" logs/*.log</div>
                  <div className="space-y-1 ml-2">
                    {job.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-1 text-xs text-zinc-400">
                        <span className="text-green-400">[✓]</span>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Command output */}
          <div className="mt-6 text-green-400 text-sm">
            <div><span className="text-cyan-400">$</span> wc -l career.log</div>
            <div className="ml-4">{portfolioData.experience.length} positions listed</div>
            <div className="mt-2"><span className="text-cyan-400">$</span> <span className="animate-pulse">_</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
