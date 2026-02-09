import React, { useState } from 'react';
import { Cloud, Container, Code, Activity } from 'lucide-react';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';
import TerminalCommand from './TerminalCommand';

const Skills = () => {
  const [showContent, setShowContent] = useState(false);

  const skillCategories = [
    { title: 'Cloud Platforms', skills: portfolioData.skills.cloud, icon: Cloud },
    { title: 'DevOps Tools', skills: portfolioData.skills.devops, icon: Container },
    { title: 'Programming', skills: portfolioData.skills.programming, icon: Code },
    { title: 'Monitoring', skills: portfolioData.skills.monitoring, icon: Activity },
  ];

  return (
    <section id="skills" className="portfolio-section scroll-mt-24 bg-black">
      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-cyan-400 text-sm ml-4">root@cloud-devops: ~/skills</span>
          </div>
        </div>

        <div className="terminal-body terminal-overlay">
          <div className="text-green-400 mb-6">
            <TerminalCommand
              className="mb-1"
              prompt="root@cloud-devops:~$"
              command="./analyze_skills.sh --verbose"
              onCompleteChange={() => setShowContent(true)}
              outputClassName="ml-4 text-zinc-400 text-sm"
              outputLines={[
                'Scanning technical capabilities...',
                '█████████████████░░░ 89% Complete',
                '[✓] Skill analysis complete',
              ]}
            />
          </div>

          {showContent && (
            <div className="section-elongate-load">
              <div className="grid md:grid-cols-2 gap-6">
                {skillCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div
                      key={index}
                      className="terminal-panel terminal-stagger-reveal"
                      style={{ '--reveal-delay': `${120 + index * 160}ms` }}
                    >
                      <div className="flex items-center gap-2 mb-4 text-cyan-400">
                        <IconComponent size={20} />
                        <span className="text-sm font-bold">&gt; {category.title.toUpperCase()}</span>
                      </div>
                      <div className="space-y-3">
                        {category.skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className="terminal-stagger-reveal"
                            style={{ '--reveal-delay': `${220 + index * 160 + skillIndex * 90}ms` }}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-zinc-300 text-xs">[{skill.name}]</span>
                              <span className="text-green-400 text-xs font-bold">{skill.level}%</span>
                            </div>
                            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-cyan-500/20">
                              <div className="h-full bg-gradient-to-r from-cyan-500 to-green-500" style={{ width: `${skill.level}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 text-green-400 text-sm terminal-stagger-reveal" style={{ '--reveal-delay': '640ms' }}>
                <ScrollTypingLine prompt="$" text={`echo "Skills assessment completed"`} speed={24} />
                <div className="ml-4">Skills assessment completed</div>
                <div className="mt-2"><span className="text-cyan-400">$</span> <span className="animate-pulse">_</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
