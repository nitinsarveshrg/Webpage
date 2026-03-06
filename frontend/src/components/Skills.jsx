import React, { useMemo, useState } from 'react';
import { Activity, Cloud, Code2, Container, GitBranch } from 'lucide-react';

const skillGroups = [
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

const signalLevel = (level) => {
  if (level.toLowerCase().includes('advanced')) return 92;
  if (level.toLowerCase().includes('intermediate+')) return 80;
  if (level.toLowerCase().includes('intermediate')) return 68;
  return 54;
};

const Skills = () => {
  const [active, setActive] = useState(skillGroups[0].key);
  const activeGroup = useMemo(() => skillGroups.find((group) => group.key === active) || skillGroups[0], [active]);
  const ActiveIcon = activeGroup.icon;

  return (
    <section id="skills" className="nx-section nx-block">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <header className="nx-head">
          <span>Skill Matrix</span>
          <h2>Capability Depth</h2>
          <p>No inflated percentages. Real-world levels tied to delivery ownership and production usage.</p>
        </header>

        <div className="nx-skills-shell">
          <aside className="nx-panel nx-skill-lanes">
            {skillGroups.map((group) => {
              const Icon = group.icon;
              const selected = group.key === active;
              return (
                <button
                  key={group.key}
                  className={selected ? 'active' : ''}
                  onClick={() => setActive(group.key)}
                >
                  <Icon size={16} />
                  <span>{group.title}</span>
                </button>
              );
            })}
          </aside>

          <article className="nx-panel nx-skill-focus">
            <header>
              <h3><ActiveIcon size={18} /> {activeGroup.title}</h3>
              <p>Signal quality map based on active delivery scope.</p>
            </header>

            <ul>
              {activeGroup.items.map(([name, level]) => (
                <li key={name}>
                  <div className="meta">
                    <span className="name">{name}</span>
                    <span className="level">{level}</span>
                  </div>
                  <div className="rail">
                    <span className="fill" style={{ width: `${signalLevel(level)}%` }} />
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
