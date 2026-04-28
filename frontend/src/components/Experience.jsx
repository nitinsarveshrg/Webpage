import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../mock';

import { inView } from '../lib/animations';

const Experience = () => (
  <section id="experience" className="nx-section exp-section">
    <div className="section-anchor" aria-hidden="true" />
    <div className="content-wrap">

      <div className="section-label">Experience</div>
      <motion.div {...inView(0)}>
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
