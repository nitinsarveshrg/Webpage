import React from 'react';
import { ExternalLink, ShieldCheck, GraduationCap } from 'lucide-react';
import { portfolioData } from '../mock';

const Certifications = () => {
  return (
    <section id="certifications" className="page-section section-band">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <div className="section-headline">
          <span className="section-label">certs</span>
          <h2>Credentials + Education</h2>
          <p>Validated cloud certifications and formal academic grounding in networking, security, and virtualization.</p>
        </div>

        <div className="cert-layout-new">
          <div className="cert-column">
            {portfolioData.certifications.map((cert) => (
              <article key={cert.id} className="glass-card cert-card-new">
                <div className="cert-status">active</div>
                <h3><ShieldCheck size={16} /> {cert.name}</h3>
                <p>{cert.issuer}</p>
                <div className="cert-meta">{cert.date} · {cert.credentialId}</div>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                    <ExternalLink size={14} /> verify
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="edu-column">
            {portfolioData.education.map((edu) => (
              <article key={edu.id} className="glass-card edu-card-new">
                <h4><GraduationCap size={16} /> {edu.degree}</h4>
                <p>{edu.institution}</p>
                <div>{edu.period}</div>
                <small>{edu.location}</small>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
