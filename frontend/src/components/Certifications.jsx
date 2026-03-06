import React from 'react';
import { ExternalLink, GraduationCap, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../mock';

const Certifications = () => {
  return (
    <section id="certifications" className="nx-section nx-block nx-block-alt">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <header className="nx-head">
          <span>Credentials</span>
          <h2>Trust Signals Above The Fold</h2>
          <p>Certifications and education displayed clearly for faster recruiter validation.</p>
        </header>

        <div className="nx-cred-shell">
          <div className="nx-cred-left">
            {portfolioData.certifications.map((cert) => (
              <article key={cert.id} className="nx-panel nx-cert-card">
                <div className="status">active</div>
                <h3><ShieldCheck size={16} /> {cert.name}</h3>
                <p>{cert.issuer}</p>
                <small>{cert.date} • {cert.credentialId}</small>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={13} /> verify
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="nx-cred-right">
            {portfolioData.education.map((edu) => (
              <article key={edu.id} className="nx-panel nx-edu-card">
                <h3><GraduationCap size={16} /> {edu.degree}</h3>
                <p>{edu.institution}</p>
                <small>{edu.period} • {edu.location}</small>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
