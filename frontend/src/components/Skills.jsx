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
    <section id="skills" className="page-section section-band alt">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <div className="section-headline">
          <span className="section-label">stack</span>
          <h2>Skill Levels</h2>
          <p>Practical proficiency mapped as production-ready levels.</p>
        </div>

        <article className="glass-card skills-manifest-card">
          <div className="section-command static">$ cat skills.levels</div>

          <div className="skills-manifest-grid">
            {skillManifest.map((group) => {
              const Icon = group.icon;
              return (
                <section key={group.key} className="skills-manifest-group">
                  <h3>
                    <Icon size={16} />
                    <span>{group.title}</span>
                  </h3>

                  <ul className="skills-manifest-list">
                    {group.items.map(([name, level]) => (
                      <li key={name}>
                        <span className="dot">•</span>
                        <span className="name">{name}</span>
                        <span className="level">{level}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Skills;
