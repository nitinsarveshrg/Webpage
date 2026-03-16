import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GraduationCap, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../mock';

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.8, ease: [0.16, 0.86, 0.24, 1], delay },
});

const Certifications = () => (
  <>
    {/* ── Certifications ─────────────────────────────────────────── */}
    <section id="certifications" className="nx-section cert-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">

        <motion.div {...inView(0)}>
          <div className="section-label">Credentials</div>
          <h2 className="section-heading">
            Industry<br /><em>certifications.</em>
          </h2>
        </motion.div>

        <div className="cert-grid">
          {portfolioData.certifications.map((cert, i) => (
            <motion.div key={cert.id} className="cert-card" {...inView(0.08 + i * 0.06)}>
              <div className="cert-badge">
                <ShieldCheck size={20} />
              </div>
              <div className="cert-name">{cert.name}</div>
              <div className="cert-issuer">{cert.issuer}</div>
              <div className="cert-date">{cert.date}</div>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-verify-link"
                >
                  <ExternalLink size={11} /> Verify credential
                </a>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>

    {/* ── Education ──────────────────────────────────────────────── */}
    <section id="education" className="nx-section edu-section">
      <div className="content-wrap">

        <motion.div {...inView(0)}>
          <div className="section-label"><GraduationCap size={11} style={{ display: 'inline', marginRight: '0.3rem' }} />Education</div>
          <h2 className="section-heading">
            Academic<br /><em>background.</em>
          </h2>
        </motion.div>

        <div className="edu-list">
          {portfolioData.education.map((edu, i) => (
            <motion.div key={edu.id} className="edu-item" {...inView(0.12 + i * 0.10)}>
              <div className="edu-meta">
                <div className="edu-period">{edu.period}</div>
                <div className="edu-location">{edu.location}</div>
                {edu.gpa && <div className="edu-gpa">GPA {edu.gpa}</div>}
              </div>
              <div className="edu-body">
                <div className="edu-institution">{edu.institution}</div>
                <div className="edu-degree">{edu.degree}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  </>
);

export default Certifications;
