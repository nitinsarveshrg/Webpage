import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { portfolioData } from '../mock';

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 56, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: false, amount: 0.08 },
  transition: { duration: 0.9, ease: [0.16, 0.86, 0.24, 1], delay },
});

const Education = () => (
  <section id="education" className="nx-section edu-section">
    <div className="section-anchor" aria-hidden="true" />
    <div className="content-wrap">

      <motion.div {...inView(0)}>
        <div className="section-label">
          <GraduationCap size={11} style={{ display: 'inline', marginRight: '0.3rem' }} />
          Education
        </div>
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
);

export default Education;
