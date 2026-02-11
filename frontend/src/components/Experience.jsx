import React from 'react';
import { CalendarDays, MapPin, BriefcaseBusiness } from 'lucide-react';
import { portfolioData } from '../mock';

const Experience = () => {
  return (
    <section id="experience" className="page-section section-band alt">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <div className="section-headline">
          <span className="section-label">timeline</span>
          <h2>Career Timeline</h2>
          <p>Progression from hands-on cloud engineering to production-grade DevOps ownership.</p>
        </div>

        <div className="timeline-new">
          {portfolioData.experience.map((job, index) => (
            <article key={job.id} className="glass-card timeline-card">
              <div className="timeline-index">0{index + 1}</div>

              <div className="timeline-main">
                <h3>{job.title}</h3>
                <div className="timeline-company">{job.company}</div>

                <div className="timeline-meta">
                  <span><CalendarDays size={13} /> {job.period}</span>
                  <span><MapPin size={13} /> {job.location}</span>
                  <span><BriefcaseBusiness size={13} /> full-time</span>
                </div>

                <p>{job.description}</p>

                <ul>
                  {job.achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
