import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../mock';
import { scrollToSectionById } from '../lib/sectionScroll';

const CODE_LINES = [
  { prompt: '$', cmd: 'kubectl get nodes --all-namespaces', delay: 300 },
  { out: 'node-01   Ready   control-plane   47d', delay: 900 },
  { out: 'node-02   Ready   worker          47d', delay: 1200 },
  { out: 'node-03   Ready   worker          47d', delay: 1500 },
  { prompt: '$', cmd: 'terraform plan -out=prod.tfplan', delay: 2300 },
  { out: 'Plan: 0 to add, 0 to change, 0 to destroy.', delay: 3000 },
  { prompt: '$', cmd: 'argocd app sync all-apps', delay: 3800 },
  { out: '3/3  Synced  Healthy  ✓', delay: 4400 },
];

const MARQUEE_ITEMS = [
  'AWS', 'Kubernetes', 'Terraform', 'Docker', 'GitHub Actions',
  'ArgoCD', 'Prometheus', 'Grafana', 'Python', 'ECS', 'Helm', 'Ansible',
  'CloudWatch', 'Jenkins', 'Bash', 'Fargate', 'Linux', 'Datadog',
];

const Hero = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const certs = useMemo(() => portfolioData.certifications.slice(0, 2), []);
  const marqueeItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  useEffect(() => {
    const timers = CODE_LINES.map((line, i) =>
      window.setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <>
      <section id="hero" className="nx-section hero-section">
        <div className="section-anchor" aria-hidden="true" />

        {/* Top status bar */}
        <div className="hero-status-bar" data-reveal>
          <span className="hero-status-dot" aria-hidden="true" />
          <span>AVAILABLE FOR HIRE</span>
          <span className="hero-sep" aria-hidden="true">·</span>
          <span>TORONTO, CANADA</span>
          <span className="hero-sep" aria-hidden="true">·</span>
          <span>CLOUD · DEVOPS · SRE</span>
        </div>

        {/* 3-LINE CINEMATIC NAME */}
        <div className="hero-name-block" aria-label="Nitin Sarvesh Raajagopal">
          <div className="hero-n1" data-reveal data-reveal-delay="1">NITIN</div>
          <div className="hero-n2" data-reveal data-reveal-delay="2">SARVESH</div>
          <div className="hero-n3" data-reveal data-reveal-delay="3">RAAJAGOPAL</div>
        </div>

        {/* Role line */}
        <p className="hero-role-line" data-reveal data-reveal-delay="4">
          {portfolioData.personal.title}
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

        {/* Scroll CTA */}
        <button
          className="hero-scroll-btn"
          onClick={() => scrollToSectionById('about')}
          aria-label="Scroll down"
          data-reveal data-reveal-delay="7"
        >
          <ChevronDown size={16} />
        </button>
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

      {/* Terminal — separate section feel */}
      <div className="hero-terminal-section">
        <div className="content-wrap">
          <div className="hero-terminal-inner" data-reveal>
            <div className="hero-t-bar">
              <span className="hero-t-dots"><span /><span /><span /></span>
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
        </div>
      </div>
    </>
  );
};

export default Hero;
