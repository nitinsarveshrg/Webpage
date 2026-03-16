import React, { useState } from 'react';

const CATEGORIES = [
  {
    key: 'cloud', label: 'Cloud Platforms', color: '#f97316',
    skills: [
      { name: 'AWS', level: 4 }, { name: 'Azure', level: 3 }, { name: 'GCP', level: 2 },
    ],
  },
  {
    key: 'iac', label: 'Containers & IaC', color: '#a855f7',
    skills: [
      { name: 'Terraform', level: 4 }, { name: 'Docker', level: 4 },
      { name: 'Kubernetes', level: 3 }, { name: 'Helm', level: 3 }, { name: 'Ansible', level: 3 },
    ],
  },
  {
    key: 'cicd', label: 'CI / CD', color: '#06b6d4',
    skills: [
      { name: 'GitHub Actions', level: 4 }, { name: 'Jenkins', level: 3 }, { name: 'ArgoCD', level: 3 },
    ],
  },
  {
    key: 'code', label: 'Coding', color: '#22c55e',
    skills: [
      { name: 'Python', level: 3 }, { name: 'Bash', level: 3 },
      { name: 'SQL', level: 3 }, { name: 'JavaScript', level: 2 },
    ],
  },
  {
    key: 'obs', label: 'Observability', color: '#f59e0b',
    skills: [
      { name: 'CloudWatch', level: 4 }, { name: 'Prometheus', level: 3 },
      { name: 'Grafana', level: 3 }, { name: 'ELK Stack', level: 2 }, { name: 'Datadog', level: 2 },
    ],
  },
];

const LEVEL_LABEL = ['', 'Basic', 'Intermediate', 'Advanced', 'Expert'];

const Skills = () => {
  const [active, setActive] = useState('cloud');
  const cat = CATEGORIES.find((c) => c.key === active) || CATEGORIES[0];

  return (
    <section id="skills" className="nx-section sk-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="sk-chapter" aria-hidden="true">03</div>

      <div className="content-wrap">
        <div className="sk-header" data-reveal>
          <span className="section-label">ARSENAL</span>
          <h2 className="sk-title">Capability<br /><em>Depth</em></h2>
        </div>

        {/* Category selector */}
        <div className="sk-cats" data-reveal data-reveal-delay="2">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`sk-cat-btn ${c.key === active ? 'active' : ''}`}
              style={c.key === active ? { '--c': c.color } : {}}
              onClick={() => setActive(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Skills display */}
        <div className="sk-panel" style={{ '--c': cat.color }} data-reveal data-reveal-delay="3">
          <div className="sk-panel-label">
            <span style={{ color: cat.color }}>{cat.label}</span>
            <span className="sk-count">{cat.skills.length} skills</span>
          </div>
          <div className="sk-skill-rows">
            {cat.skills.map((s, i) => (
              <div key={s.name} className="sk-skill-row" style={{ '--delay': `${i * 60}ms` }}>
                <span className="sk-skill-name">{s.name}</span>
                <div className="sk-skill-track">
                  <div className="sk-skill-fill" style={{ width: `${(s.level / 4) * 100}%`, background: cat.color }} />
                </div>
                <span className="sk-skill-level" style={{ color: cat.color }}>{LEVEL_LABEL[s.level]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* All-tech strip */}
        <div className="sk-strip" data-reveal data-reveal-delay="4">
          {CATEGORIES.flatMap((c) => c.skills.map((s) => (
            <span key={`${c.key}-${s.name}`} className="sk-strip-tag" style={{ '--c': c.color }}>
              {s.name}
            </span>
          )))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
