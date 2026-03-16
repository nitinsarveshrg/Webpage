import React, { useState } from 'react';
import { Camera, Flag, GitBranch, Mountain, Music2, Plane } from 'lucide-react';
import { portfolioData } from '../mock';

const iconFor = (h) => {
  const t = h.toLowerCase();
  if (t.includes('photography')) return Camera;
  if (t.includes('travel')) return Plane;
  if (t.includes('hiking')) return Mountain;
  if (t.includes('music')) return Music2;
  if (t.includes('open-source') || t.includes('open source')) return GitBranch;
  if (t.includes('formula 1') || t.includes('f1')) return Flag;
  return Camera;
};

const METRICS = [
  { value: '5+', label: 'Years', sub: 'Cloud Engineering' },
  { value: '3', label: 'Clouds', sub: 'AWS · Azure · GCP' },
  { value: '50+', label: 'Deploys', sub: 'Zero-downtime' },
  { value: '99.9%', label: 'Uptime', sub: 'SLA maintained' },
];

const About = () => {
  const [hobby, setHobby] = useState(portfolioData.about.hobbies[0]);

  return (
    <section id="about" className="nx-section about-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="about-chapter" aria-hidden="true">01</div>

      <div className="content-wrap">
        <div className="about-intro">
          <div className="about-intro-left" data-reveal>
            <span className="section-label">WHOAMI</span>
            <h2 className="about-title">Operator<br /><em>Profile</em></h2>
          </div>
          <p className="about-bio" data-reveal data-reveal-delay="2">{portfolioData.about.bio}</p>
        </div>

        {/* Metrics */}
        <div className="about-metrics">
          {METRICS.map((m, i) => (
            <div key={m.label} className="about-metric" data-reveal data-reveal-delay={i + 1}>
              <span className="about-metric-val">{m.value}</span>
              <span className="about-metric-label">{m.label}</span>
              <span className="about-metric-sub">{m.sub}</span>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="about-lower">
          <div className="about-highlights" data-reveal data-reveal-delay="2">
            <span className="section-label">HIGHLIGHTS</span>
            <ul>
              {portfolioData.about.highlights.map((item) => (
                <li key={item}><span className="about-bullet">▸</span>{item}</li>
              ))}
            </ul>
          </div>

          <div className="about-hobbies" data-reveal data-reveal-delay="3">
            <span className="section-label">INTERESTS</span>
            <div className="about-hobby-grid">
              {portfolioData.about.hobbies.map((h) => {
                const Icon = iconFor(h);
                return (
                  <button key={h} className={`about-hobby-btn ${hobby === h ? 'active' : ''}`} onClick={() => setHobby(h)}>
                    <Icon size={13} /><span>{h}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
