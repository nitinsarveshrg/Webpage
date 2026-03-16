import React, { useState } from 'react';
import { Camera, Flag, GitBranch, Mountain, Music2, Plane } from 'lucide-react';
import { portfolioData } from '../mock';

const iconForHobby = (hobby) => {
  const text = hobby.toLowerCase();
  if (text.includes('photography')) return Camera;
  if (text.includes('travel')) return Plane;
  if (text.includes('hiking')) return Mountain;
  if (text.includes('music')) return Music2;
  if (text.includes('open-source') || text.includes('open source')) return GitBranch;
  if (text.includes('formula 1') || text.includes('f1')) return Flag;
  return Camera;
};

const METRICS = [
  { value: '5+', label: 'Years Cloud', sub: 'AWS · Azure · GCP' },
  { value: '3', label: 'Hyperscalers', sub: 'Multi-cloud certified' },
  { value: '50+', label: 'Deployments', sub: 'Zero-downtime' },
  { value: '99.9%', label: 'SLA Uptime', sub: 'Production SRE' },
];

const About = () => {
  const [activeHobby, setActiveHobby] = useState(portfolioData.about.hobbies[0]);

  return (
    <section id="about" className="nx-section ab-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">

        {/* Top label */}
        <div className="ab-eyebrow">
          <span className="ab-eyebrow-tag">WHOAMI</span>
          <div className="ab-eyebrow-line" />
        </div>

        {/* Hero heading */}
        <div className="ab-heading-row">
          <h2 className="ab-title">Operator<br /><span>Profile</span></h2>
          <p className="ab-lead">{portfolioData.about.bio}</p>
        </div>

        {/* Metrics strip */}
        <div className="ab-metrics">
          {METRICS.map((m) => (
            <div key={m.label} className="ab-metric">
              <span className="ab-metric-val">{m.value}</span>
              <span className="ab-metric-label">{m.label}</span>
              <span className="ab-metric-sub">{m.sub}</span>
            </div>
          ))}
        </div>

        {/* Highlights + Hobbies row */}
        <div className="ab-lower">
          {/* Highlights */}
          <div className="ab-card ab-highlights">
            <div className="ab-card-head">
              <span className="ab-card-tag">$ cat highlights.log</span>
            </div>
            <ul className="ab-list">
              {portfolioData.about.highlights.map((item) => (
                <li key={item}>
                  <span className="ab-bullet">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hobbies */}
          <div className="ab-card ab-hobbies">
            <div className="ab-card-head">
              <span className="ab-card-tag">$ cat interests.md</span>
            </div>
            <div className="ab-hobby-grid">
              {portfolioData.about.hobbies.map((hobby) => {
                const Icon = iconForHobby(hobby);
                const active = activeHobby === hobby;
                return (
                  <button
                    key={hobby}
                    className={`ab-hobby-btn ${active ? 'active' : ''}`}
                    onClick={() => setActiveHobby(hobby)}
                  >
                    <Icon size={14} />
                    <span>{hobby}</span>
                  </button>
                );
              })}
            </div>
            {activeHobby && (
              <div className="ab-hobby-detail">
                <strong>{activeHobby}</strong>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
