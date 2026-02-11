import React, { useState } from 'react';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';
import TerminalCommand from './TerminalCommand';
import SectionModeBanner from './SectionModeBanner';
import SectionFrame from './SectionFrame';

const Experience = () => {
  const [showContent, setShowContent] = useState(false);
  const [frameExpanded, setFrameExpanded] = useState(false);

  return (
    <section id="experience" className="portfolio-section bg-black">
      <div className={`section-shell max-w-7xl w-full mx-auto px-6 relative z-10 ${frameExpanded ? 'section-frame-grow' : 'section-frame-preroll'}`}>
        <SectionFrame path="root@cloud-devops: ~/experience" label="OPS_LOG" bodyClassName="terminal-overlay">
          <div className="text-green-400 mb-6">
            <TerminalCommand
              className="mb-1"
              prompt="root@cloud-devops:~$"
              command="cat career.log | tail -n 20"
              onRunStart={() => setFrameExpanded(true)}
              onCompleteChange={() => setShowContent(true)}
              outputClassName="ml-4 text-zinc-400 text-sm"
              outputLines={['Loading employment history...']}
            />
          </div>

          {showContent && (
            <div className="section-elongate-load">
              <SectionModeBanner
                className="mb-6"
                mode="OPS_HISTORY"
                command="journalctl -u career.service --since='5 years ago'"
                status="INDEXED"
                tags={['TIMELINE', 'PRODUCTION', 'IMPACT']}
              />

              <div className="space-y-6">
                {portfolioData.experience.map((job, index) => (
                  <div
                    key={job.id}
                    className="terminal-panel terminal-stagger-reveal"
                    style={{ '--reveal-delay': `${120 + index * 180}ms` }}
                  >
                    <div className="flex items-start gap-3 mb-3 pb-3 border-b border-cyan-500/20">
                      <Briefcase className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-cyan-400 font-bold text-sm">[{portfolioData.experience.length - index}]</span>
                          <span className="text-white font-bold">{job.title}</span>
                        </div>
                        <div className="text-green-400 text-sm mb-1">&gt; {job.company}</div>
                        <div className="flex items-center gap-3 text-xs text-zinc-400">
                          <div className="flex items-center gap-1"><Calendar size={12} /><span>{job.period}</span></div>
                          <div className="flex items-center gap-1"><MapPin size={12} /><span>{job.location}</span></div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <ScrollTypingLine className="text-green-400 text-xs mb-1" prompt="$" text="cat description.txt" speed={20} />
                      <p className="text-zinc-300 text-xs ml-2">{job.description}</p>
                    </div>

                    <div>
                      <ScrollTypingLine className="text-green-400 text-xs mb-1" prompt="$" text={`grep "achievement" logs/*.log`} speed={20} />
                      <div className="space-y-1 ml-2">
                        {job.achievements.map((achievement, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-1 text-xs text-zinc-400 terminal-stagger-reveal"
                            style={{ '--reveal-delay': `${240 + index * 180 + idx * 90}ms` }}
                          >
                            <span className="text-green-400">[✓]</span>
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-green-400 text-sm terminal-stagger-reveal" style={{ '--reveal-delay': '720ms' }}>
                <ScrollTypingLine prompt="$" text="wc -l career.log" speed={24} />
                <div className="ml-4">{portfolioData.experience.length} positions listed</div>
                <div className="mt-2"><span className="text-cyan-400">$</span> <span className="animate-pulse">_</span></div>
              </div>
            </div>
          )}
        </SectionFrame>
      </div>
    </section>
  );
};

export default Experience;
