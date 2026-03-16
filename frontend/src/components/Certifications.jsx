import React from 'react';
import { ExternalLink, GraduationCap, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../mock';

const Certifications = () => (
  <section id="certifications" className="nx-section cred-section">
    <div className="section-anchor" aria-hidden="true" />
    <div className="cred-chapter" aria-hidden="true">02</div>

    <div className="content-wrap">
      <div className="cred-header" data-reveal>
        <span className="section-label">CREDENTIALS</span>
        <h2 className="cred-title">Trust<br /><em>Signals</em></h2>
      </div>

      <div className="cred-list">
        {portfolioData.certifications.map((cert, i) => (
          <article key={cert.id} className="cred-row" data-reveal data-reveal-delay={i + 1}>
            <span className="cred-row-num">{String(i + 1).padStart(2, '0')}</span>
            <div className="cred-row-icon"><ShieldCheck size={18} /></div>
            <div className="cred-row-body">
              <h3>{cert.name}</h3>
              <p>{cert.issuer} · {cert.date}</p>
            </div>
            <span className="cred-row-status">● ACTIVE</span>
            {cert.link && (
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cred-row-link" aria-label="Verify">
                <ExternalLink size={13} />
              </a>
            )}
          </article>
        ))}
      </div>

      <div className="cred-edu" data-reveal>
        <span className="section-label"><GraduationCap size={12} /> EDUCATION</span>
        <div className="cred-edu-cards">
          {portfolioData.education.map((edu) => (
            <article key={edu.id} className="cred-edu-card">
              <h3>{edu.degree}</h3>
              <p>{edu.institution}</p>
              <small>{edu.period} · {edu.location}</small>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Certifications;
