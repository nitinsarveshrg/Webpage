import React from 'react';
import { Activity, Cloud, Code2, Container, GitBranch } from 'lucide-react';

const skillManifest = [
  {
    key: 'cloud',
    title: 'Cloud',
    icon: Cloud,
    items: [
      ['AWS', 'Advanced'],
      ['Azure', 'Intermediate'],
      ['GCP', 'Basic-Intermediate'],
    ],
  },
  {
    key: 'containers-iac',
    title: 'Containers & IaC',
    icon: Container,
    items: [
      ['Terraform', 'Advanced'],
      ['Docker', 'Advanced'],
      ['Kubernetes', 'Intermediate+'],
      ['Helm / Ansible', 'Intermediate'],
    ],
  },
  {
    key: 'cicd',
    title: 'CI/CD',
    icon: GitBranch,
    items: [
      ['GitHub Actions, Jenkins, ArgoCD', 'Advanced-Intermediate'],
    ],
  },
  {
    key: 'coding',
    title: 'Coding',
    icon: Code2,
    items: [
      ['Python, Bash', 'Intermediate+'],
      ['SQL', 'Intermediate'],
      ['JavaScript/TypeScript', 'Basic-Intermediate'],
    ],
  },
  {
    key: 'observability',
    title: 'Observability',
    icon: Activity,
    items: [
      ['CloudWatch', 'Advanced-Intermediate'],
      ['Prometheus/Grafana', 'Intermediate+'],
      ['ELK, Datadog, Dynatrace', 'Basic-Intermediate'],
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="page-section mk-section mk-band">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <header className="mk-section-head">
          <span className="mk-section-kicker">Skills</span>
          <h2>Practical Proficiency Matrix</h2>
          <p>Capability levels aligned with real delivery ownership and production use.</p>
        </header>

        <div className="mk-skill-grid">
          {skillManifest.map((group) => {
            const Icon = group.icon;
            return (
              <article key={group.key} className="mk-card mk-skill-card">
                <h3>
                  <Icon size={16} />
                  <span>{group.title}</span>
                </h3>

                <ul>
                  {group.items.map(([name, level]) => (
                    <li key={name}>
                      <span className="name">{name}</span>
                      <span className="level">{level}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
