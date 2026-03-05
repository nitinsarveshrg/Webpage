import React, { useState } from 'react';
import { BriefcaseBusiness, CalendarDays, ChevronDown, MapPin } from 'lucide-react';
import { portfolioData } from '../mock';

const Experience = () => {
  const [activeId, setActiveId] = useState(portfolioData.experience[0]?.id || null);

  return (
    <section id="experience" className="page-section mk-section mk-band mk-band-muted">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <header className="mk-section-head">
          <span className="mk-section-kicker">Timeline</span>
          <h2>Career Timeline</h2>
          <p>Open each role to inspect outcomes, impact metrics, and technical ownership.</p>
        </header>

        <div className="mk-timeline">
          {portfolioData.experience.map((job, index) => {
            const expanded = activeId === job.id;

            return (
              <article key={job.id} className={`mk-card mk-role-card ${expanded ? 'expanded' : ''}`}>
                <div className="mk-role-index">0{index + 1}</div>

                <div className="mk-role-content">
                  <button className="mk-role-head" onClick={() => setActiveId(expanded ? null : job.id)}>
                    <div>
                      <h3>{job.title}</h3>
                      <div className="mk-role-company">{job.company}</div>
                    </div>
                    <ChevronDown size={16} className={`mk-role-chevron ${expanded ? 'open' : ''}`} />
                  </button>

                  <div className="mk-role-meta">
                    <span><CalendarDays size={13} /> {job.period}</span>
                    <span><MapPin size={13} /> {job.location}</span>
                    <span><BriefcaseBusiness size={13} /> full-time</span>
                  </div>

                  <p>{job.description}</p>

                  {expanded && (
                    <ul>
                      {job.achievements.map((item) => (
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
