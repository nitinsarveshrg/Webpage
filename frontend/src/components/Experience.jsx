import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../mock';

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 56, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: false, amount: 0.08 },
  transition: { duration: 0.9, ease: [0.16, 0.86, 0.24, 1], delay },
});

const Experience = () => (
  <section id="experience" className="nx-section exp-section">
    <div className="section-anchor" aria-hidden="true" />
    <div className="content-wrap">

      <motion.div {...inView(0)}>
        <div className="section-label">Experience</div>
        <h2 className="section-heading">
          Impact<br /><em>timeline.</em>
        </h2>
      </motion.div>

      <div className="exp-list">
        {portfolioData.experience.map((role, idx) => (
          <motion.div key={role.id} className="exp-item" {...inView(0.12 + idx * 0.10)}>
            <div className="exp-meta">
              <div className="exp-period">{role.period}</div>
              <div className="exp-company">{role.company}</div>
              <div className="exp-location">{role.location}</div>
            </div>
            <div>
              <h3 className="exp-title">{role.title}</h3>
              <p className="exp-desc">{role.description}</p>
              <div className="exp-achievements">
                {role.achievements.map((a) => (
                  <div key={a} className="exp-achievement">{a}</div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default Experience;
