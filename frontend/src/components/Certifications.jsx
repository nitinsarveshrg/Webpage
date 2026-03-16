import React from 'react';
import { ExternalLink, GraduationCap, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../mock';

const Certifications = () => (
  <section id="certifications" className="nx-section cred-section">
    <div className="section-anchor" aria-hidden="true" />
    <div className="content-wrap">

      <div className="cred-eyebrow">
        <div className="cred-eyebrow-line" />
        <span className="cred-eyebrow-tag">CREDENTIALS</span>
        <div className="cred-eyebrow-line" />
      </div>

      <h2 className="cred-title">Trust Signals</h2>
      <p className="cred-sub">Active certifications and formal education — validated and verified.</p>

      {/* Cert cards row */}
      <div className="cred-grid">
        {portfolioData.certifications.map((cert, i) => (
          <article key={cert.id} className="cred-card">
            <div className="cred-card-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="cred-card-badge">
              <ShieldCheck size={22} />
            </div>
            <div className="cred-card-body">
              <span className="cred-status">● ACTIVE</span>
              <h3>{cert.name}</h3>
              <p className="cred-issuer">{cert.issuer}</p>
              <p className="cred-date">{cert.date}</p>
              {cert.credentialId && (
                <p className="cred-id">ID: {cert.credentialId}</p>
              )}
            </div>
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cred-verify"
                aria-label={`Verify ${cert.name}`}
              >
                <ExternalLink size={13} /> verify
              </a>
            )}
          </article>
        ))}
      </div>

      {/* Education block */}
      <div className="cred-edu-wrap">
        <div className="cred-edu-label">
          <GraduationCap size={14} />
          <span>Academic Record</span>
        </div>
        <div className="cred-edu-row">
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
