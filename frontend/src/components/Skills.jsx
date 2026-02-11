import React, { useEffect, useMemo, useState } from 'react';
import { Cloud, Container, Code, Activity } from 'lucide-react';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';
import TerminalCommand from './TerminalCommand';
import SectionModeBanner from './SectionModeBanner';
import SectionFrame from './SectionFrame';

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

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const seedMetrics = () => ({
  cpu: randomInt(31, 66),
  mem: randomInt(44, 78),
  pods: randomInt(19, 34),
  latency: randomInt(11, 29),
  spark: Array.from({ length: 24 }, () => randomInt(28, 86)),
});

const Skills = () => {
  const [showContent, setShowContent] = useState(false);
  const [frameExpanded, setFrameExpanded] = useState(false);
  const [liveMetrics, setLiveMetrics] = useState(seedMetrics);

  const skillCategories = [
    { title: 'Cloud Platforms', skills: portfolioData.skills.cloud, icon: Cloud },
    { title: 'DevOps Tools', skills: portfolioData.skills.devops, icon: Container },
    { title: 'Programming', skills: portfolioData.skills.programming, icon: Code },
    { title: 'Monitoring', skills: portfolioData.skills.monitoring, icon: Activity },
  ];
  const allSkills = skillCategories.flatMap((category) => category.skills);
  const moduleTelemetry = useMemo(
    () => [
      { label: 'scheduler', load: clamp(Math.round(liveMetrics.cpu * 0.92), 24, 99), state: 'RUNNING' },
      { label: 'autoscaler', load: clamp(Math.round(liveMetrics.mem * 0.88), 24, 99), state: 'HEALTHY' },
      { label: 'deploy-gate', load: clamp(Math.round(liveMetrics.pods * 2.2), 24, 99), state: 'SYNCED' },
      { label: 'telemetry', load: clamp(Math.round((38 - liveMetrics.latency) * 2.5), 24, 99), state: 'STREAMING' },
    ],
    [liveMetrics]
  );
  const sparkPoints = useMemo(
    () => liveMetrics.spark.map((value, index) => `${(index / (liveMetrics.spark.length - 1)) * 100},${100 - value}`).join(' '),
    [liveMetrics.spark]
  );

  useEffect(() => {
    if (!showContent) return undefined;

    const intervalId = window.setInterval(() => {
      setLiveMetrics((previous) => {
        const nextPoint = clamp(previous.spark[previous.spark.length - 1] + randomInt(-11, 11), 18, 92);
        return {
          cpu: clamp(previous.cpu + randomInt(-4, 4), 24, 78),
          mem: clamp(previous.mem + randomInt(-3, 3), 34, 86),
          pods: clamp(previous.pods + randomInt(-2, 2), 14, 39),
          latency: clamp(previous.latency + randomInt(-3, 3), 7, 34),
          spark: [...previous.spark.slice(1), nextPoint],
        };
      });
    }, 1500);

    return () => window.clearInterval(intervalId);
  }, [showContent]);

  return (
    <section id="skills" className="portfolio-section bg-black">
      <div className={`section-shell max-w-7xl w-full mx-auto px-6 relative z-10 ${frameExpanded ? 'section-frame-grow' : 'section-frame-preroll'}`}>
        <SectionFrame path="root@cloud-devops: ~/skills" label="MATRIX" bodyClassName="terminal-overlay">
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
              <SectionModeBanner
                className="mb-4"
                mode="SKILLS_MATRIX"
                command="watch -n 1 /usr/bin/skill-probe --stream"
                status="STREAMING"
                tags={['LINUX_KERNEL', 'AUTO_TUNED', 'PROD_SIGNAL']}
              />

              <div className="skills-module-wall terminal-stagger-reveal" style={{ '--reveal-delay': '25ms' }}>
                {moduleTelemetry.map((module, index) => (
                  <div key={module.label} className="skills-module-card" style={{ '--module-delay': `${index * 120}ms` }}>
                    <div className="skills-module-head">
                      <span className="skills-module-name">{module.label}</span>
                      <span className="skills-module-state">{module.state}</span>
                    </div>
                    <div className="skills-module-meter">
                      <span className="skills-module-fill" style={{ '--module-width': `${module.load}%` }} />
                    </div>
                    <div className="skills-module-foot">load {module.load}%</div>
                  </div>
                ))}
              </div>

              <div className="skills-topbar terminal-stagger-reveal" style={{ '--reveal-delay': '40ms' }}>
                <div className="skills-top-title">TACTICAL SKILL MAP</div>
                <div className="skills-top-tags">
                  <span className="skills-top-tag">{allSkills.length} SKILLS TRACKED</span>
                  <span className="skills-top-tag">LIVE TELEMETRY</span>
                  <span className="skills-top-tag">RACE READY</span>
                </div>
              </div>

              <div className="skills-live-grid terminal-stagger-reveal" style={{ '--reveal-delay': '90ms' }}>
                <div className="linux-live-chip">
                  <span className="linux-live-label">CPU</span>
                  <span className="linux-live-value">{liveMetrics.cpu}%</span>
                </div>
                <div className="linux-live-chip">
                  <span className="linux-live-label">MEM</span>
                  <span className="linux-live-value">{liveMetrics.mem}%</span>
                </div>
                <div className="linux-live-chip">
                  <span className="linux-live-label">PODS</span>
                  <span className="linux-live-value">{liveMetrics.pods}</span>
                </div>
                <div className="linux-live-chip">
                  <span className="linux-live-label">LATENCY</span>
                  <span className="linux-live-value">{liveMetrics.latency}ms</span>
                </div>
                <div className="skills-spark-panel">
                  <div className="skills-spark-head">
                    <span className="text-cyan-400">$</span> tail -f /var/log/perf.log
                  </div>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="skills-sparkline">
                    <polyline points={sparkPoints} />
                  </svg>
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
        </SectionFrame>
      </div>
    </section>
  );
};

export default Skills;
