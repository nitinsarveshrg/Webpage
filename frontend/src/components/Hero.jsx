import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../mock';
import { scrollToSectionById } from '../lib/sectionScroll';

const CODE_LINES = [
  { prompt: '$', cmd: 'kubectl get nodes --all-namespaces', delay: 200 },
  { out: 'node-01   Ready   control-plane   47d', delay: 800 },
  { out: 'node-02   Ready   worker          47d', delay: 1100 },
  { out: 'node-03   Ready   worker          47d', delay: 1400 },
  { prompt: '$', cmd: 'terraform plan -out=prod.tfplan', delay: 2200 },
  { out: 'Plan: 0 to add, 0 to change, 0 to destroy.', delay: 2900 },
  { prompt: '$', cmd: 'argocd app list', delay: 3700 },
  { out: '3/3 apps  Synced  Healthy  ✓', delay: 4300 },
];

const MARQUEE_ITEMS = [
  'AWS', 'Kubernetes', 'Terraform', 'Docker', 'GitHub Actions',
  'ArgoCD', 'Prometheus', 'Grafana', 'Python', 'ECS', 'Helm', 'Ansible',
  'CloudWatch', 'Jenkins', 'Bash', 'Fargate',
];

const Hero = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const certs = useMemo(() => portfolioData.certifications.slice(0, 2), []);

  useEffect(() => {
    const timers = CODE_LINES.map((line, i) =>
      window.setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  // Duplicate for seamless loop
  const marqueeItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <>
      <section id="hero" className="nx-section hero-section">
        <div className="section-anchor" aria-hidden="true" />

        {/* Status line */}
        <div className="hero-status" data-reveal>
          <span className="hero-status-dot" aria-hidden="true" />
          <span>AVAILABLE</span>
          <span className="hero-status-sep" aria-hidden="true">·</span>
          <span>TORONTO, CANADA</span>
          <span className="hero-status-sep" aria-hidden="true">·</span>
          <span>CLOUD · DEVOPS · SRE</span>
        </div>

        {/* Monogram */}
        <div className="hero-monogram" data-reveal data-reveal-delay="1">NS</div>

        {/* BIG NAME */}
        <div className="hero-name">
          <span className="hero-name-first" data-reveal data-reveal-delay="2">NITIN</span>
          <span className="hero-name-last" data-reveal data-reveal-delay="3">SARVESH</span>
        </div>

        {/* Role + tagline */}
        <p className="hero-role" data-reveal data-reveal-delay="4">
          {portfolioData.personal.title}
        </p>
        <p className="hero-tagline" data-reveal data-reveal-delay="4">
          {portfolioData.personal.tagline}
        </p>

        {/* Cert badges */}
        <div className="hero-certs" data-reveal data-reveal-delay="5">
          {certs.map((c) => (
            <span key={c.id} className="hero-cert">
              <ShieldCheck size={10} /> {c.name}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero-actions" data-reveal data-reveal-delay="6">
          <button className="btn-primary" onClick={() => scrollToSectionById('projects')}>
            View Work
          </button>
          <button className="btn-ghost" onClick={() => scrollToSectionById('contact')}>
            Hire Me →
          </button>
        </div>

        {/* Live terminal */}
        <div className="hero-terminal" data-reveal data-reveal-delay="7">
          <div className="hero-t-bar">
            <span className="hero-t-dots" aria-hidden="true">
              <span /><span /><span />
            </span>
            <span className="hero-t-title">nitin@k8s-prod — zsh</span>
          </div>
          <div className="hero-t-body">
            {CODE_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={line.prompt ? 'hero-t-cmd' : 'hero-t-out'}>
                {line.prompt && <span className="hero-t-prompt">$</span>}
                <span>{line.prompt ? line.cmd : line.out}</span>
              </div>
            ))}
            {visibleLines < CODE_LINES.length && (
              <div className="hero-t-cmd">
                <span className="hero-t-prompt">$</span>
                <span className="hero-t-cursor" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>

        {/* Scroll CTA */}
        <button
          className="hero-scroll-cta"
          onClick={() => scrollToSectionById('about')}
          aria-label="Scroll to about"
          data-reveal
          data-reveal-delay="7"
        >
          <ChevronDown size={16} />
        </button>
      </section>

      {/* Marquee strip between hero and about */}
      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="marquee-item">
              {item} <span>◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
