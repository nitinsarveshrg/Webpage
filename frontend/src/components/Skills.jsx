import React, { useEffect, useState } from 'react';
import { Cloud, Container, Code, Activity } from 'lucide-react';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';
import TerminalCommand from './TerminalCommand';

const SkillLevelCounter = ({ value, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let rafId = null;
    let timeoutId = null;
    let start = null;
    const duration = 1100;

    timeoutId = window.setTimeout(() => {
      const tick = (timestamp) => {
        if (start === null) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setDisplayValue(Math.round(value * eased));

        if (progress < 1) {
          rafId = window.requestAnimationFrame(tick);
        }
      };

      rafId = window.requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [value, delay]);

  return <span className="text-green-400 text-xs font-bold skills-level-value">{displayValue}%</span>;
};

const SkillMeterRow = ({ name, level, revealDelay = '0ms', countDelay = 0 }) => {
  return (
    <div className="terminal-stagger-reveal skills-row-entry" style={{ '--reveal-delay': revealDelay }}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-zinc-300 text-xs">[{name}]</span>
        <span className="skills-level-badge">
          <SkillLevelCounter value={level} delay={countDelay} />
        </span>
      </div>
      <div className="skills-meter-track">
        <div className="skills-meter-fill" style={{ '--skill-width': `${level}%`, '--meter-delay': `${countDelay}ms` }}>
          <span className="skills-meter-sheen"></span>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [showContent, setShowContent] = useState(false);
  const [frameExpanded, setFrameExpanded] = useState(false);

  const skillCategories = [
    { title: 'Cloud Platforms', skills: portfolioData.skills.cloud, icon: Cloud },
    { title: 'DevOps Tools', skills: portfolioData.skills.devops, icon: Container },
    { title: 'Programming', skills: portfolioData.skills.programming, icon: Code },
    { title: 'Monitoring', skills: portfolioData.skills.monitoring, icon: Activity },
  ];
  const allSkills = skillCategories.flatMap((category) => category.skills);

  return (
    <section id="skills" className="portfolio-section bg-black">
      <div className={`section-shell max-w-7xl w-full mx-auto px-6 relative z-10 ${frameExpanded ? 'section-frame-grow' : 'section-frame-preroll'}`}>
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
              onRunStart={() => setFrameExpanded(true)}
              onCompleteChange={() => setShowContent(true)}
              outputClassName="ml-4 text-zinc-400 text-sm"
              triggerThreshold={0.78}
              triggerRootMargin="-10% 0px -18% 0px"
            >
              <div className="skills-command-stream">
                <div className="skills-command-line">Scanning technical capabilities...</div>
                <div className="skills-command-progress-wrap">
                  <div className="skills-command-progress-fill"></div>
                  <span className="text-zinc-300 text-xs">89% Complete</span>
                </div>
                <div className="skills-command-done">
                  <span className="text-green-400">[✓]</span>
                  <span>Skill analysis complete</span>
                  <span className="skills-command-ping"></span>
                </div>
              </div>
            </TerminalCommand>
          </div>

          {showContent && (
            <div className="section-elongate-load">
              <div className="skills-topbar terminal-stagger-reveal" style={{ '--reveal-delay': '40ms' }}>
                <div className="skills-top-title">LIVE PROFICIENCY CONSOLE</div>
                <div className="skills-top-tags">
                  <span className="skills-top-tag">{allSkills.length} SKILLS TRACKED</span>
                  <span className="skills-top-tag">AUTO-TUNED</span>
                  <span className="skills-top-tag">ZERO DOWNTIME</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {skillCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div
                      key={index}
                      className="terminal-panel skills-panel-clean terminal-stagger-reveal"
                      style={{ '--reveal-delay': `${120 + index * 160}ms` }}
                    >
                      <div className="skills-card-head">
                        <div className="flex items-center gap-2 text-cyan-400">
                          <IconComponent size={20} />
                          <span className="text-sm font-bold">&gt; {category.title.toUpperCase()}</span>
                        </div>
                        <span className="skills-card-pill">ACTIVE</span>
                      </div>

                      <div className="space-y-3">
                        {category.skills.map((skill, skillIndex) => (
                          <SkillMeterRow
                            key={skillIndex}
                            name={skill.name}
                            level={skill.level}
                            revealDelay={`${220 + index * 160 + skillIndex * 90}ms`}
                            countDelay={240 + index * 140 + skillIndex * 120}
                          />
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
