import React, { useState } from 'react';
import { CalendarDays, MapPin, BriefcaseBusiness, ChevronDown } from 'lucide-react';
import { portfolioData } from '../mock';

const Experience = () => {
  const [activeId, setActiveId] = useState(portfolioData.experience[0]?.id || null);

  return (
    <section id="experience" className="page-section section-band alt">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <div className="section-headline">
          <span className="section-label">timeline</span>
          <h2>Career Timeline</h2>
          <p>Interactive timeline: open each role to inspect impact, outcomes, and technical ownership.</p>
        </div>

        <div className="timeline-new">
          {portfolioData.experience.map((job, index) => {
            const expanded = activeId === job.id;

            return (
              <article key={job.id} className={`glass-card timeline-card ${expanded ? 'timeline-card-expanded' : ''}`}>
                <div className="timeline-index">0{index + 1}</div>

                <div className="timeline-main">
                  <button className="timeline-head-btn" onClick={() => setActiveId(expanded ? null : job.id)}>
                    <div>
                      <h3>{job.title}</h3>
                      <div className="timeline-company">{job.company}</div>
                    </div>
                    <ChevronDown size={16} className={`timeline-chevron ${expanded ? 'open' : ''}`} />
                  </button>

                  <div className="timeline-meta">
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
