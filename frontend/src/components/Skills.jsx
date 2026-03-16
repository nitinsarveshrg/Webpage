import React from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    label: 'Cloud Platforms',
    skills: ['AWS', 'Azure', 'GCP', 'ECS', 'Fargate', 'Lambda', 'CloudFormation'],
  },
  {
    label: 'Containers & IaC',
    skills: ['Kubernetes', 'Docker', 'Helm', 'Terraform', 'Ansible', 'Pulumi'],
  },
  {
    label: 'CI / CD',
    skills: ['GitHub Actions', 'Jenkins', 'ArgoCD', 'GitLab CI', 'CircleCI'],
  },
  {
    label: 'Observability',
    skills: ['Prometheus', 'Grafana', 'Datadog', 'CloudWatch', 'ELK Stack', 'Dynatrace'],
  },
  {
    label: 'Coding',
    skills: ['Python', 'Bash', 'SQL', 'JavaScript', 'TypeScript', 'Go'],
  },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.8, ease: [0.16, 0.86, 0.24, 1], delay },
});

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

      <div className="skills-groups">
        {CATEGORIES.map((cat, ci) => (
          <motion.div key={cat.label} {...inView(0.10 + ci * 0.06)}>
            <div className="skill-group-label">{cat.label}</div>
            <div className="skill-chips">
              {cat.skills.map((s, si) => (
                <motion.span
                  key={s}
                  className="skill-chip"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.12 + ci * 0.05 + si * 0.03 }}
                >
                  <span className="skill-chip-dot" />
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default Skills;
