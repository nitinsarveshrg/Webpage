import React, { useState } from 'react';
import { portfolioData } from '../mock';

const hl = (text) => {
  const parts = text.split(/(\d[\d,.]*\s*(?:%|\+|x|ms|s\b|hrs?|days?)?)/g);
  return parts.map((p, i) => /^\d/.test(p) ? <em key={i} className="xp-num">{p}</em> : p);
};

const Experience = () => {
  const [open, setOpen] = useState(portfolioData.experience[0]?.id || null);

  return (
    <section id="experience" className="nx-section xp-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="xp-chapter" aria-hidden="true">04</div>

      <div className="content-wrap">
        <div className="xp-header" data-reveal>
          <span className="section-label">CAREER LOG</span>
          <h2 className="xp-title">Impact<br /><em>Timeline</em></h2>
        </div>

        <div className="xp-list">
          {portfolioData.experience.map((role, idx) => {
            const isOpen = open === role.id;
            return (
              <article key={role.id} className={`xp-entry ${isOpen ? 'open' : ''}`} data-reveal data-reveal-delay={idx + 1}>
                <div className="xp-entry-side">
                  <span className="xp-idx">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="xp-line" />
                </div>
                <div className="xp-entry-main">
                  <button className="xp-toggle-btn" onClick={() => setOpen(isOpen ? null : role.id)}>
                    <div className="xp-meta">
                      <span className="xp-period">{role.period}</span>
                      <span className="xp-loc">{role.location}</span>
                    </div>
                    <h3 className="xp-role">{role.title}</h3>
                    <h4 className="xp-company">{role.company}</h4>
                    <span className="xp-arrow">{isOpen ? '−' : '+'}</span>
                  </button>
                  <p className="xp-desc">{role.description}</p>
                  {isOpen && (
                    <ul className="xp-bullets">
                      {role.achievements.map((a) => (
                        <li key={a}><span className="xp-chevron">›</span><span>{hl(a)}</span></li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
