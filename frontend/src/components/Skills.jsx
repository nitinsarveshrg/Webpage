import React, { useState } from 'react';

const CATEGORIES = [
  {
    key: 'cloud',
    label: 'Cloud',
    color: '#f97316',
    skills: [
      { name: 'AWS', level: 4, note: 'Advanced' },
      { name: 'Azure', level: 3, note: 'Intermediate' },
      { name: 'GCP', level: 2, note: 'Basic–Intermediate' },
    ],
  },
  {
    key: 'iac',
    label: 'Containers & IaC',
    color: '#a855f7',
    skills: [
      { name: 'Terraform', level: 4, note: 'Advanced' },
      { name: 'Docker', level: 4, note: 'Advanced' },
      { name: 'Kubernetes', level: 3, note: 'Intermediate+' },
      { name: 'Helm', level: 3, note: 'Intermediate' },
      { name: 'Ansible', level: 3, note: 'Intermediate' },
    ],
  },
  {
    key: 'cicd',
    label: 'CI/CD',
    color: '#06b6d4',
    skills: [
      { name: 'GitHub Actions', level: 4, note: 'Advanced' },
      { name: 'Jenkins', level: 3, note: 'Intermediate+' },
      { name: 'ArgoCD', level: 3, note: 'Intermediate' },
    ],
  },
  {
    key: 'code',
    label: 'Coding',
    color: '#22c55e',
    skills: [
      { name: 'Python', level: 3, note: 'Intermediate+' },
      { name: 'Bash', level: 3, note: 'Intermediate+' },
      { name: 'SQL', level: 3, note: 'Intermediate' },
      { name: 'JavaScript / TS', level: 2, note: 'Basic–Intermediate' },
    ],
  },
  {
    key: 'obs',
    label: 'Observability',
    color: '#f59e0b',
    skills: [
      { name: 'CloudWatch', level: 4, note: 'Advanced' },
      { name: 'Prometheus', level: 3, note: 'Intermediate+' },
      { name: 'Grafana', level: 3, note: 'Intermediate+' },
      { name: 'ELK Stack', level: 2, note: 'Basic–Intermediate' },
      { name: 'Datadog', level: 2, note: 'Basic–Intermediate' },
    ],
  },
];

const DOTS = 4;

const Skills = () => {
  const [active, setActive] = useState('cloud');
  const cat = CATEGORIES.find((c) => c.key === active) || CATEGORIES[0];

  return (
    <section id="skills" className="nx-section sk-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">

        {/* Header */}
        <div className="sk-header">
          <span className="sk-tag">SKILL MATRIX</span>
          <h2>Capability Depth</h2>
          <p>Real-world proficiency levels — no inflated bars.</p>
        </div>

        {/* Tab strip */}
        <div className="sk-tabs" role="tablist">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              role="tab"
              aria-selected={c.key === active}
              className={`sk-tab ${c.key === active ? 'active' : ''}`}
              style={{ '--cat-color': c.key === active ? c.color : undefined }}
              onClick={() => setActive(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Skill rows */}
        <div className="sk-body" style={{ '--cat-color': cat.color }}>
          <div className="sk-cat-label">
            <span style={{ color: cat.color }}>{cat.label}</span>
            <span className="sk-cat-count">{cat.skills.length} skills</span>
          </div>
          <div className="sk-rows">
            {cat.skills.map((s) => (
              <div key={s.name} className="sk-row">
                <span className="sk-row-name">{s.name}</span>
                <div className="sk-dots">
                  {Array.from({ length: DOTS }).map((_, i) => (
                    <span
                      key={i}
                      className={`sk-dot ${i < s.level ? 'filled' : ''}`}
                      style={i < s.level ? { background: cat.color, boxShadow: `0 0 8px ${cat.color}80` } : {}}
                    />
                  ))}
                </div>
                <span className="sk-row-note">{s.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech cloud */}
        <div className="sk-cloud">
          {CATEGORIES.flatMap((c) => c.skills.map((s) => (
            <span
              key={`${c.key}-${s.name}`}
              className="sk-cloud-tag"
              style={{ '--tag-color': c.color }}
            >
              {s.name}
            </span>
          )))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
