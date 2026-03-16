import React from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    label: 'Cloud Platforms',
    color: '#f97316',
    skills: [
      { name: 'AWS', level: 95 },
      { name: 'Azure', level: 85 },
      { name: 'GCP', level: 80 },
      { name: 'ECS / Fargate', level: 90 },
    ],
  },
  {
    label: 'Containers & IaC',
    color: '#a855f7',
    skills: [
      { name: 'Kubernetes', level: 95 },
      { name: 'Docker', level: 95 },
      { name: 'Terraform', level: 95 },
      { name: 'Helm', level: 90 },
      { name: 'Ansible', level: 90 },
    ],
  },
  {
    label: 'CI / CD',
    color: '#06b6d4',
    skills: [
      { name: 'GitHub Actions', level: 90 },
      { name: 'Jenkins', level: 90 },
      { name: 'ArgoCD', level: 85 },
    ],
  },
  {
    label: 'Observability',
    color: '#f59e0b',
    skills: [
      { name: 'CloudWatch', level: 90 },
      { name: 'Prometheus', level: 90 },
      { name: 'Grafana', level: 90 },
      { name: 'Datadog', level: 80 },
      { name: 'ELK Stack', level: 85 },
    ],
  },
  {
    label: 'Coding',
    color: '#22c55e',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Bash', level: 95 },
      { name: 'SQL', level: 85 },
      { name: 'JavaScript', level: 75 },
    ],
  },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 56, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: false, amount: 0.1 },
  transition: { duration: 0.8, ease: [0.16, 0.86, 0.24, 1], delay },
});

const SkillBar = ({ name, level, color, delay }) => (
  <motion.div
    className="skill-bar-item"
    initial={{ opacity: 0, x: -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: false, amount: 0.1 }}
    transition={{ duration: 0.6, ease: [0.16, 0.86, 0.24, 1], delay }}
  >
    <div className="skill-bar-header">
      <span className="skill-bar-name">{name}</span>
      <span className="skill-bar-pct" style={{ color }}>{level}%</span>
    </div>
    <div className="skill-bar-track">
      <motion.div
        className="skill-bar-fill"
        style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: level / 100 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.1, ease: [0.16, 0.86, 0.24, 1], delay: delay + 0.15 }}
      />
    </div>
  </motion.div>
);

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
          <motion.div key={cat.label} className="skill-group-card" {...inView(0.10 + ci * 0.06)}>
            <div className="skill-group-label" style={{ color: cat.color }}>{cat.label}</div>
            <div className="skill-bars">
              {cat.skills.map((s, si) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  color={cat.color}
                  delay={0.14 + ci * 0.05 + si * 0.05}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default Skills;
