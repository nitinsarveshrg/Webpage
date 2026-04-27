import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { scrollToSectionById } from '../lib/sectionScroll';
import { fade } from '../lib/animations';

const MARQUEE_ITEMS = [
  'AWS', 'Kubernetes', 'Terraform', 'Docker', 'GitHub Actions',
  'ArgoCD', 'Prometheus', 'Grafana', 'Python', 'ECS', 'Helm', 'Ansible',
  'CloudWatch', 'Jenkins', 'Bash', 'Fargate', 'Linux', 'Datadog',
];

const Hero = () => {
  const heroRef = useRef(null);
  const marqueeItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Name fades to 0 exactly at scroll range end — no blank black gap
  const nameScale   = useTransform(scrollYProgress, [0, 1.0], [1, 1.8]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.5, 1.0], [1, 0.5, 0]);
  const nameY       = useTransform(scrollYProgress, [0, 1.0], ['0%', '-10%']);

  // Pill, tagline, CTAs fade out faster
  const uiOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <>
      {/* Extra scroll height gives the zoom-through room to play */}
      <div ref={heroRef} className="hero-scroll-range">
        <section id="hero" className="nx-section hero-section hero-sticky">
          <div className="section-anchor" aria-hidden="true" />

          {/* Ambient glow */}
          <motion.div
            className="hero-glow"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.4, ease: 'easeOut', delay: 0.1 }}
            aria-hidden="true"
          />

          {/* Terminal init bar — visible only in light/terminal mode */}
          <motion.div className="hero-cyber-bar" style={{ opacity: uiOpacity }} {...fade(0.05)}>
            <span className="hero-cyber-bar-path">nitin@portfolio:~$</span>
            <span className="hero-cyber-bar-cmd">./load_portfolio.sh --env=prod</span>
            <span className="hero-cyber-cursor" aria-hidden="true" />
          </motion.div>

          {/* Row 1 — availability pill */}
          <motion.div className="hero-ui-layer" style={{ opacity: uiOpacity }} {...fade(0.15)}>
            <div className="hero-pill">
              <span className="hero-pill-dot" aria-hidden="true" />
              ONLINE · Toronto, Canada · Cloud / DevOps / SRE
            </div>
          </motion.div>

          {/* Row 2 — name block (scroll zoom-through) */}
          <motion.div
            className="hero-name-wrap"
            aria-label="Nitin Sarvesh Raajagopal"
            style={{ scale: nameScale, opacity: nameOpacity, y: nameY }}
          >
            <motion.div className="hero-n1" {...fade(0.25)}>NITIN</motion.div>
            <motion.div className="hero-n2" {...fade(0.40)}>SARVESH</motion.div>
            <motion.div className="hero-n3" {...fade(0.55)}>RAAJAGOPAL</motion.div>
          </motion.div>

          {/* Row 3 — tagline + CTAs + scroll hint */}
          <motion.div className="hero-bottom-ui" style={{ opacity: uiOpacity }} {...fade(0.70)}>
            <p className="hero-tagline">
              Designing resilient cloud infrastructure<br />
              for the modern internet.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollToSectionById('projects')}>
                View Work
              </button>
              <button className="btn-ghost" onClick={() => scrollToSectionById('contact')}>
                Hire Me →
              </button>
            </div>
            <div className="hero-cyber-status" aria-hidden="true">
              <span className="hcs-chip"><span className="hcs-dot" />STATUS <em>ONLINE</em></span>
              <span className="hcs-chip">UPTIME <em>99.9%</em></span>
              <span className="hcs-chip">ROLE <em>SRE / DevOps</em></span>
              <span className="hcs-chip">LOCATION <em>YYZ</em></span>
              <span className="hcs-chip">CERTS <em>3x ACTIVE</em></span>
            </div>
            <div className="hero-scroll">
              <span>scroll</span>
              <ChevronDown size={14} />
            </div>
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
