import React, { useMemo, useState } from 'react';
import { Cloud, Container, Code2, Activity } from 'lucide-react';
import { portfolioData } from '../mock';

const categories = [
  { key: 'cloud', label: 'Cloud Platforming', icon: Cloud },
  { key: 'devops', label: 'Delivery Toolchain', icon: Container },
  { key: 'programming', label: 'Automation Coding', icon: Code2 },
  { key: 'monitoring', label: 'Observability', icon: Activity },
];

const Skills = () => {
  const [active, setActive] = useState('devops');

  const allSkills = useMemo(() => Object.values(portfolioData.skills).flat(), []);
  const activeSkills = useMemo(() => portfolioData.skills[active] || [], [active]);
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
              <span>verified proficiency</span>
            </div>

            <div className="skill-rows-new">
              {activeSkills.map((skill) => (
                <div key={skill.name} className="skill-row-new">
                  <div className="skill-row-meta">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-row-track">
                    <div className="skill-row-fill" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
