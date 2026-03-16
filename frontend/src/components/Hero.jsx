import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const heroRef = useRef(null);
  const marqueeItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Name zooms in and fades — "entering through the letters" effect
  const nameScale   = useTransform(scrollYProgress, [0, 0.88], [1, 1.8]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.45, 0.88], [1, 0.5, 0]);
  const nameY       = useTransform(scrollYProgress, [0, 0.88], ['0%', '-10%']);

  // UI (pill, tagline, CTAs) fades out faster
  const uiOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);

  return (
    <>
      {/* Extra scroll height gives space for the zoom-through to play */}
      <div ref={heroRef} className="hero-scroll-range">
        <section id="hero" className="nx-section hero-section hero-sticky">
          <div className="section-anchor" aria-hidden="true" />

          {/* Row 1 — availability pill */}
          <motion.div className="hero-ui-layer" style={{ opacity: uiOpacity }}>
            <motion.div className="hero-pill" {...fade(0.1)}>
              <span className="hero-pill-dot" aria-hidden="true" />
              Available for hire · Toronto, Canada · Cloud / DevOps / SRE
            </motion.div>
          </motion.div>

          {/* Row 2 — name block (scroll zoom) */}
          <motion.div
            className="hero-name-wrap"
            aria-label="Nitin Sarvesh Raajagopal"
            style={{ scale: nameScale, opacity: nameOpacity, y: nameY }}
          >
            <motion.div className="hero-n1" {...fade(0.2)}>NITIN</motion.div>
            <motion.div className="hero-n2" {...fade(0.35)}>SARVESH</motion.div>
            <motion.div className="hero-n3" {...fade(0.50)}>RAAJAGOPAL</motion.div>
          </motion.div>

          {/* Row 3 — tagline + CTAs + scroll hint */}
          <motion.div className="hero-bottom-ui" style={{ opacity: uiOpacity }}>
            <motion.p className="hero-tagline" style={{ margin: 0 }} {...fade(0.65)}>
              Designing resilient cloud infrastructure<br />
              for the modern internet.
            </motion.p>
            <motion.div className="hero-actions" {...fade(0.80)}>
              <button className="btn-primary" onClick={() => scrollToSectionById('projects')}>
                View Work
              </button>
              <button className="btn-ghost" onClick={() => scrollToSectionById('contact')}>
                Hire Me →
              </button>
            </motion.div>
            <motion.div className="hero-scroll" style={{ margin: 0 }} {...fade(1.0)}>
              <span>scroll</span>
              <ChevronDown size={14} />
            </motion.div>
          </motion.div>
        </section>
      </div>

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
