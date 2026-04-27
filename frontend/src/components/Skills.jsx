import React from 'react';
import { motion } from 'framer-motion';
import { inView } from '../lib/animations';

const CATEGORIES = [
  {
    label: 'Cloud Platforms',
    color: '#f97316',
    skills: [
      { name: 'AWS', level: 90 },
      { name: 'Azure', level: 75 },
      { name: 'GCP', level: 70 },
    ],
  },
  {
    label: 'Containers & IaC',
    color: '#a855f7',
    skills: [
      { name: 'Kubernetes', level: 85 },
      { name: 'Docker', level: 90 },
      { name: 'Terraform', level: 85 },
      { name: 'Helm', level: 80 },
      { name: 'Ansible', level: 80 },
    ],
  },
  {
    label: 'CI / CD',
    color: '#06b6d4',
    skills: [
      { name: 'GitHub Actions', level: 85 },
      { name: 'Jenkins', level: 80 },
      { name: 'ArgoCD', level: 75 },
    ],
  },
  {
    label: 'Observability',
    color: '#f59e0b',
    skills: [
      { name: 'CloudWatch', level: 85 },
      { name: 'Prometheus', level: 80 },
      { name: 'Grafana', level: 80 },
      { name: 'Datadog', level: 75 },
      { name: 'ELK Stack', level: 75 },
    ],
  },
  {
    label: 'Coding',
    color: '#22c55e',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Bash', level: 90 },
      { name: 'SQL', level: 75 },
      { name: 'JavaScript', level: 70 },
    ],
  },
];

const proficiency = (level) => {
  if (level >= 90) return { text: 'Expert', tier: 'expert' };
  if (level >= 80) return { text: 'Advanced', tier: 'advanced' };
  if (level >= 70) return { text: 'Proficient', tier: 'proficient' };
  return { text: 'Intermediate', tier: 'intermediate' };
};

const Skills = () => (
  <section id="skills" className="nx-section skills-section">
    <div className="section-anchor" aria-hidden="true" />
    <div className="content-wrap">

      <motion.div {...inView(0)}>
        <div className="section-label">Skills</div>
        <h2 className="section-heading">
          Full-stack<br /><em>infrastructure.</em>
        </h2>
      </motion.div>

      <div className="skills-grid">
        {CATEGORIES.map((cat, ci) => (
          <motion.div key={cat.label} className="skill-group-card" {...inView(0.10 + ci * 0.07)}>
            <div className="skill-group-label" style={{ color: cat.color }}>{cat.label}</div>
            <div className="skill-badges">
              {cat.skills.map((s) => {
                const prof = proficiency(s.level);
                return (
                  <span key={s.name} className={`skill-badge skill-badge--${prof.tier}`}>
                    <span className="skill-badge-name">{s.name}</span>
                    <span className="skill-badge-tier">{prof.text}</span>
                  </span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default Skills;
