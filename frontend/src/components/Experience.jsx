import React, { useState } from 'react';
import { portfolioData } from '../mock';

const highlight = (text) => {
  const parts = text.split(/(\d[\d,.]*\s*(?:%|\+|x|ms|s\b|hrs?|days?)?)/g);
  return parts.map((part, i) =>
    /^\d/.test(part) ? <em key={i} className="xp-num">{part}</em> : part
  );
};

const Experience = () => {
  const [open, setOpen] = useState(portfolioData.experience[0]?.id || null);

  return (
    <section id="experience" className="nx-section xp-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">

        {/* Left rail + content */}
        <div className="xp-layout">

          {/* Left: big label */}
          <div className="xp-rail">
            <div className="xp-rail-text">TIMELINE</div>
          </div>

          {/* Right: entries */}
          <div className="xp-entries">
            <div className="xp-header">
              <span className="xp-tag">CAREER LOG</span>
              <h2>Impact Over Titles</h2>
            </div>

            {portfolioData.experience.map((role, idx) => {
              const isOpen = open === role.id;
              return (
                <article key={role.id} className={`xp-entry ${isOpen ? 'xp-entry-open' : ''}`}>
                  {/* Index line */}
                  <div className="xp-entry-idx">
                    <span className="xp-idx-num">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="xp-idx-line" />
                  </div>

                  {/* Card */}
                  <div className="xp-card">
                    <button
                      className="xp-card-top"
                      onClick={() => setOpen(isOpen ? null : role.id)}
                    >
                      <div className="xp-card-meta">
                        <span className="xp-period">{role.period}</span>
                        <span className="xp-loc">{role.location}</span>
                      </div>
                      <h3 className="xp-role-title">{role.title}</h3>
                      <h4 className="xp-company">{role.company}</h4>
                      <span className={`xp-toggle ${isOpen ? 'open' : ''}`} aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    <p className="xp-desc">{role.description}</p>

                    {isOpen && (
                      <ul className="xp-achievements">
                        {role.achievements.map((item) => (
                          <li key={item}>
                            <span className="xp-chevron">›</span>
                            <span>{highlight(item)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
