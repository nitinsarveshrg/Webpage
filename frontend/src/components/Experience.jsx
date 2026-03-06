import React, { useState } from 'react';
import { BriefcaseBusiness, CalendarDays, ChevronDown, MapPin } from 'lucide-react';
import { portfolioData } from '../mock';

const Experience = () => {
  const [expandedId, setExpandedId] = useState(portfolioData.experience[0]?.id || null);

  return (
    <section id="experience" className="nx-section nx-block nx-block-alt">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <header className="nx-head">
          <span>Career Timeline</span>
          <h2>Impact Over Titles</h2>
          <p>Each role focused on measurable reliability, speed, and automation outcomes.</p>
        </header>

        <div className="nx-timeline-shell">
          <div className="nx-timeline-line" aria-hidden="true" />

          {portfolioData.experience.map((role, index) => {
            const open = expandedId === role.id;
            return (
              <article key={role.id} className={`nx-panel nx-role ${open ? 'open' : ''}`}>
                <div className="nx-role-node">{String(index + 1).padStart(2, '0')}</div>

                <div className="nx-role-main">
                  <button onClick={() => setExpandedId(open ? null : role.id)} className="nx-role-head">
                    <div>
                      <h3>{role.title}</h3>
                      <h4>{role.company}</h4>
                    </div>
                    <ChevronDown size={17} className={open ? 'open' : ''} />
                  </button>

                  <div className="nx-role-meta">
                    <span><CalendarDays size={13} /> {role.period}</span>
                    <span><MapPin size={13} /> {role.location}</span>
                    <span><BriefcaseBusiness size={13} /> full-time</span>
                  </div>

                  <p>{role.description}</p>

                  {open && (
                    <ul>
                      {role.achievements.map((item) => (
                        <li key={item}>{item}</li>
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
