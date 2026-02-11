import React, { useEffect, useMemo, useState } from 'react';
import { Cloud, Container, Code2, Activity, Waves } from 'lucide-react';
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
  const [volatility, setVolatility] = useState(2);
  const [pulseSeed, setPulseSeed] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPulseSeed((prev) => prev + 1);
    }, 1300);

    return () => window.clearInterval(id);
  }, []);

  const allSkills = useMemo(() => Object.values(portfolioData.skills).flat(), []);

  const avgSkill = useMemo(() => {
    if (allSkills.length === 0) return 0;
    const sum = allSkills.reduce((acc, skill) => acc + skill.level, 0);
    return Math.round(sum / allSkills.length);
  }, [allSkills]);

  const activeSkills = useMemo(() => portfolioData.skills[active] || [], [active]);

  const liveSkills = useMemo(() => {
    return activeSkills.map((skill, index) => {
      const wave = Math.sin((pulseSeed + index) * 0.85) * volatility;
      const level = clamp(Math.round(skill.level + wave), Math.max(skill.level - 5, 40), 100);
      return { ...skill, liveLevel: level };
    });
  }, [activeSkills, pulseSeed, volatility]);

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
                <span className="label">average score</span>
                <strong>{avgSkill}%</strong>
              </div>
            </div>
          </aside>

          <div className="glass-card skill-board-card">
            <div className="skill-board-head">
              <h3>{categories.find((item) => item.key === active)?.label}</h3>
              <span>live proficiency feed</span>
            </div>

            <div className="skill-live-control">
              <span><Waves size={14} /> pulse</span>
              <input
                type="range"
                min={1}
                max={6}
                value={volatility}
                onChange={(event) => setVolatility(Number(event.target.value))}
              />
              <small>intensity {volatility}</small>
            </div>

            <div className="skill-rows-new">
              {liveSkills.map((skill) => (
                <div key={skill.name} className="skill-row-new">
                  <div className="skill-row-meta">
                    <span>{skill.name}</span>
                    <span>{skill.liveLevel}%</span>
                  </div>
                  <div className="skill-row-track">
                    <div className="skill-row-fill" style={{ width: `${skill.liveLevel}%` }} />
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
