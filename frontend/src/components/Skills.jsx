import React, { useMemo, useState } from 'react';
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

const levelToScore = (level) => {
  if (level.toLowerCase().includes('advanced')) return 92;
  if (level.toLowerCase().includes('intermediate+')) return 80;
  if (level.toLowerCase().includes('intermediate')) return 68;
  return 52;
};

const Skills = () => {
  const [active, setActive] = useState(skillManifest[0].key);
  const activeGroup = useMemo(
    () => skillManifest.find((group) => group.key === active) || skillManifest[0],
    [active]
  );
  const ActiveIcon = activeGroup.icon;

  return (
    <section id="skills" className="page-section mk-section mk-band">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <header className="mk-section-head">
          <span className="mk-section-kicker">Skills</span>
          <h2>Practical Proficiency Matrix</h2>
          <p>Capability levels aligned with real delivery ownership and production use.</p>
        </header>

        <div className="mk-skill-focus">
          <aside className="mk-card mk-skill-lanes">
            {skillManifest.map((group) => {
              const Icon = group.icon;
              const isActive = group.key === active;
              return (
                <button
                  key={group.key}
                  className={`mk-skill-lane ${isActive ? 'active' : ''}`}
                  onClick={() => setActive(group.key)}
                >
                  <Icon size={16} />
                  <span>{group.title}</span>
                </button>
              );
            })}
          </aside>

          <article className="mk-card mk-skill-spotlight">
            <div className="mk-skill-spotlight-head">
              <ActiveIcon size={18} />
              <h3>{activeGroup.title}</h3>
            </div>

            <ul className="mk-skill-rows">
              {activeGroup.items.map(([name, level]) => (
                <li key={name}>
                  <div className="mk-skill-meta">
                    <span className="name">{name}</span>
                    <span className="level">{level}</span>
                  </div>
                  <div className="mk-skill-rail">
                    <span className="mk-skill-fill" style={{ width: `${levelToScore(level)}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Skills;
