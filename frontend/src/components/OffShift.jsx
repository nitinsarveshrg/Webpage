import React from 'react';
import { motion } from 'framer-motion';

const HOBBIES = [
  {
    icon: '🏸',
    title: 'Badminton',
    desc: 'Court is my reset button — fast reflexes, zero cloud alerts.',
  },
  {
    icon: '🎵',
    title: 'Music',
    desc: 'Playlists for every deploy: calm builds, hype releases.',
  },
  {
    icon: '🥾',
    title: 'Hiking',
    desc: 'Best debugging happens on trails with no Wi-Fi.',
  },
  {
    icon: '🏎️',
    title: 'Formula 1',
    desc: 'Watching precision engineering at 300 km/h — pure obsession.',
  },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 56, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: false, amount: 0.1 },
  transition: { duration: 0.9, ease: [0.16, 0.86, 0.24, 1], delay },
});

const OffShift = () => (
  <section id="off-shift" className="nx-section off-shift-section">
    <div className="section-anchor" aria-hidden="true" />
    <div className="content-wrap">

      <motion.div {...inView(0)}>
        <div className="section-label">Off Shift</div>
        <h2 className="section-heading">
          When I'm not <em>on call.</em>
        </h2>
      </motion.div>

      <div className="os-grid">
        {HOBBIES.map((h, i) => (
          <motion.div
            key={h.title}
            className="os-card"
            {...inView(0.12 + i * 0.1)}
          >
            <span className="os-icon" aria-hidden="true">{h.icon}</span>
            <h3 className="os-title">{h.title}</h3>
            <p className="os-desc">{h.desc}</p>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default OffShift;
