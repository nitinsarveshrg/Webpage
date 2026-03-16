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
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--orange)', marginTop: 'auto' }}
              >
                <ExternalLink size={11} /> Verify
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {portfolioData.education?.length > 0 && (
        <motion.div {...inView(0.2)} style={{ marginTop: '4rem' }}>
          <div className="section-label"><GraduationCap size={12} style={{ display: 'inline' }} /> Education</div>
          <div className="cert-grid" style={{ marginTop: '1.5rem' }}>
            {portfolioData.education.map((edu) => (
              <div key={edu.id} className="cert-card">
                <div className="cert-name">{edu.degree}</div>
                <div className="cert-issuer">{edu.institution}</div>
                <div className="cert-date">{edu.period} · {edu.location}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  </section>
);

export default Certifications;
