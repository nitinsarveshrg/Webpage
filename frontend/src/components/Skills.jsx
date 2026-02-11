import React, { useEffect, useMemo, useState } from 'react';
import { Cloud, Container, Code2, Activity, Waves, Radar } from 'lucide-react';
import { portfolioData } from '../mock';

const categories = [
  { key: 'cloud', label: 'Cloud Platforming', icon: Cloud },
  { key: 'devops', label: 'Delivery Toolchain', icon: Container },
  { key: 'programming', label: 'Automation Coding', icon: Code2 },
  { key: 'monitoring', label: 'Observability', icon: Activity },
];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const Skills = () => {
  const [active, setActive] = useState('devops');
  const [runtimeTick, setRuntimeTick] = useState(0);
  const [feedLines, setFeedLines] = useState(['matrix online · profile values locked']);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRuntimeTick((prev) => prev + 1);
    }, 1050);

    return () => window.clearInterval(id);
  }, []);

  const allSkills = useMemo(() => Object.values(portfolioData.skills).flat(), []);

  const activeSkills = useMemo(() => portfolioData.skills[active] || [], [active]);

  const liveSkills = useMemo(() => {
    return activeSkills.map((skill, index) => {
      const waveA = Math.sin((runtimeTick + index) * 0.74);
      const waveB = Math.cos((runtimeTick + index) * 0.39);
      const signal = clamp(Math.round(70 + waveA * 17 + waveB * 9), 44, 99);
      const stability = clamp(Math.round(92 - Math.abs(waveA) * 10), 78, 99);
      const trend = waveA > 0.15 ? 'rising' : waveA < -0.15 ? 'cooling' : 'steady';

      return {
        ...skill,
        liveLevel: skill.level,
        stability,
        signal,
        trend,
      };
    });
  }, [activeSkills, runtimeTick]);

  useEffect(() => {
    if (runtimeTick % 2 !== 0) return;

    const meanLevel =
      activeSkills.length > 0
        ? Math.round(activeSkills.reduce((acc, item) => acc + item.level, 0) / activeSkills.length)
        : 0;

    const meanSignal =
      liveSkills.length > 0
        ? Math.round(liveSkills.reduce((acc, item) => acc + item.signal, 0) / liveSkills.length)
        : 0;

    const line = `${active} lane locked ${String(meanLevel).padStart(2, '0')}% · signal ${meanSignal}%`;
    setFeedLines((prev) => [line, ...prev].slice(0, 5));
  }, [runtimeTick, liveSkills, activeSkills, active]);

  const activeCategory = categories.find((item) => item.key === active);

  return (
    <section id="skills" className="page-section section-band alt">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <div className="section-headline">
          <span className="section-label">stack</span>
          <h2>Capability Matrix</h2>
          <p>Hands-on engineering depth across cloud, delivery, coding, and observability.</p>
        </div>

        <div className="skills-layout-new">
          <aside className="glass-card skill-nav-card">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = category.key === active;
              return (
                <button
                  key={category.key}
                  className={`skill-nav-btn ${isActive ? 'skill-nav-btn-active' : ''}`}
                  onClick={() => setActive(category.key)}
                >
                  <Icon size={16} />
                  <span>{category.label}</span>
                </button>
              );
            })}

            <div className="skill-summary">
              <div>
                <span className="label">skills tracked</span>
                <strong>{allSkills.length}</strong>
              </div>
              <div>
                <span className="label">active lane</span>
                <strong>{activeCategory?.label || 'matrix'}</strong>
              </div>
            </div>
          </aside>

          <div className="glass-card skill-board-card">
            <div className="skill-board-head">
              <h3>{activeCategory?.label}</h3>
              <span>live proficiency feed</span>
            </div>

            <div className="skill-live-control">
              <span><Waves size={14} /> lane telemetry</span>
              <div className="skill-live-tags" aria-hidden="true">
                <span className="skill-live-tag">values locked</span>
                <span className="skill-live-tag">signal tracked</span>
                <span className="skill-live-tag">runtime synced</span>
              </div>
              <small>Skill percentages are fixed from your profile data.</small>
            </div>

            <div className="skill-rows-new">
              {liveSkills.map((skill) => (
                <div key={skill.name} className="skill-row-new">
                  <div className="skill-row-meta">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-row-track">
                    <div className="skill-row-fill" style={{ width: `${skill.level}%` }}>
                      <span className="skill-row-scan" />
                    </div>
                  </div>
                  <div className="skill-row-live-meta">
                    <span>{skill.trend}</span>
                    <span>stability {skill.stability}%</span>
                    <span>signal {skill.signal}%</span>
                  </div>
                  <div className="skill-row-signal-track">
                    <div className="skill-row-signal-fill" style={{ width: `${skill.signal}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="skill-live-panels">
              <div className="skill-live-panel">
                <span>$ watch -n 1 skill_probe</span>
                <strong>stream active</strong>
              </div>
              <div className="skill-live-panel">
                <span>pipeline compatibility</span>
                <strong>high</strong>
              </div>
              <div className="skill-live-panel">
                <span>delivery confidence</span>
                <strong>race-ready</strong>
              </div>
            </div>

            <div className="skill-feed-card">
              <div className="skill-feed-title"><Radar size={14} /> runtime feed</div>
              <div className="skill-feed-lines">
                {feedLines.map((line, index) => (
                  <div key={`${line}-${index}`} className="skill-feed-line">
                    <span className="dot" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
