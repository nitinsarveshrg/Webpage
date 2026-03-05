import React from 'react';
import { ExternalLink, GraduationCap, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../mock';

const Certifications = () => {
  return (
    <section id="certifications" className="page-section mk-section mk-band mk-band-muted">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <header className="mk-section-head">
          <span className="mk-section-kicker">Credentials</span>
          <h2>Verified Certifications and Academic Foundation</h2>
          <p>Quick trust signals recruiters and hiring managers look for first.</p>
        </header>

        <div className="mk-cred-grid">
          <div className="mk-cred-col">
            {portfolioData.certifications.map((cert) => (
              <article key={cert.id} className="mk-card mk-cert-item">
                <div className="mk-cert-badge">Active</div>
                <h3><ShieldCheck size={15} /> {cert.name}</h3>
                <p>{cert.issuer}</p>
                <div className="mk-cert-meta">{cert.date} • {cert.credentialId}</div>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="mk-inline-link">
                    <ExternalLink size={13} /> Verify Credential
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="mk-cred-col">
            {portfolioData.education.map((edu) => (
              <article key={edu.id} className="mk-card mk-edu-item">
                <h3><GraduationCap size={15} /> {edu.degree}</h3>
                <p>{edu.institution}</p>
                <div className="mk-cert-meta">{edu.period}</div>
                <div className="mk-edu-location">{edu.location}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
