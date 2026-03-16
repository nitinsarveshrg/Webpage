import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { scrollToSectionById } from '../lib/sectionScroll';

const MARQUEE_ITEMS = [
  'AWS', 'Kubernetes', 'Terraform', 'Docker', 'GitHub Actions',
  'ArgoCD', 'Prometheus', 'Grafana', 'Python', 'ECS', 'Helm', 'Ansible',
  'CloudWatch', 'Jenkins', 'Bash', 'Fargate', 'Linux', 'Datadog',
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 0.86, 0.24, 1], delay },
});

const Hero = () => {
  const marqueeItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <>
      <section id="hero" className="nx-section hero-section">
        <div className="section-anchor" aria-hidden="true" />

        {/* Status pill */}
        <motion.div className="hero-pill" {...fade(0.1)}>
          <span className="hero-pill-dot" aria-hidden="true" />
          Available for hire · Toronto, Canada · Cloud / DevOps / SRE
        </motion.div>

        {/* 3-line cinematic name */}
        <div className="hero-name-wrap" aria-label="Nitin Sarvesh Raajagopal">
          <motion.div className="hero-n1" {...fade(0.2)}>NITIN</motion.div>
          <motion.div className="hero-n2" {...fade(0.35)}>SARVESH</motion.div>
          <motion.div className="hero-n3" {...fade(0.50)}>RAAJAGOPAL</motion.div>
        </div>

        {/* Tagline */}
        <motion.p className="hero-tagline" {...fade(0.65)}>
          Designing resilient cloud infrastructure<br />
          for the modern internet.
        </motion.p>

        {/* CTAs */}
        <motion.div className="hero-actions" {...fade(0.80)}>
          <button className="btn-primary" onClick={() => scrollToSectionById('projects')}>
            View Work
          </button>
          <button className="btn-ghost" onClick={() => scrollToSectionById('contact')}>
            Hire Me →
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="hero-scroll" {...fade(1.0)}>
          <span>scroll</span>
          <ChevronDown size={14} />
        </motion.div>
      </section>

      {/* Marquee tech strip */}
      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}<span className="marquee-dot">◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
