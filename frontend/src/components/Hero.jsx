import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../mock';
import { scrollToSectionById } from '../lib/sectionScroll';

const TECH_TAGS = ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'ArgoCD', 'Helm', 'Prometheus', 'Grafana', 'Jenkins', 'GitHub Actions', 'Python', 'Bash'];

const CODE_LINES = [
  { prompt: '$', cmd: 'kubectl get nodes', delay: 0 },
  { out: 'NAME        STATUS   ROLES    AGE', delay: 600 },
  { out: 'node-01     Ready    control  47d', delay: 900 },
  { out: 'node-02     Ready    worker   47d', delay: 1200 },
  { out: 'node-03     Ready    worker   47d', delay: 1500 },
  { prompt: '$', cmd: 'terraform plan', delay: 2200 },
  { out: 'Plan: 0 to add, 0 to change, 0 to destroy.', delay: 2800 },
  { prompt: '$', cmd: 'argocd app list', delay: 3600 },
  { out: '3/3 apps   Synced   Healthy', delay: 4200 },
];

const Hero = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const certPreview = useMemo(() => portfolioData.certifications.slice(0, 2), []);

  useEffect(() => {
    const timers = CODE_LINES.map((_, i) => (
      window.setTimeout(() => setVisibleLines(i + 1), CODE_LINES[i].delay + 800)
    ));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <section id="hero" className="op-hero nx-section">
      <div className="section-anchor" aria-hidden="true" />

      {/* Top banner */}
      <div className="op-hero-banner">
        <span className="op-banner-dot" aria-hidden="true" />
        <span>AVAILABLE FOR HIRE</span>
        <span className="op-banner-sep">|</span>
        <span>TORONTO, CANADA</span>
        <span className="op-banner-sep">|</span>
        <span>OPEN TO CLOUD · DEVOPS · SRE ROLES</span>
      </div>

      <div className="content-wrap">
        <div className="op-hero-grid">

          {/* Left: typography + meta */}
          <div className="op-hero-left">
            <div className="op-hero-avatar">NS</div>

            <div className="op-hero-heading">
              <span className="op-hero-first">NITIN</span>
              <span className="op-hero-last">SARVESH</span>
            </div>

            <p className="op-hero-title">{portfolioData.personal.title}</p>
            <p className="op-hero-sub">{portfolioData.personal.tagline}</p>

            <div className="op-hero-certs">
              {certPreview.map((c) => (
                <span key={c.id} className="op-cert-chip">
                  <ShieldCheck size={11} /> {c.name}
                </span>
              ))}
            </div>

            <div className="op-hero-actions">
              <button className="op-btn-primary" onClick={() => scrollToSectionById('projects')}>
                View Projects →
              </button>
              <button className="op-btn-secondary" onClick={() => scrollToSectionById('contact')}>
                Get in Touch
              </button>
            </div>

            <div className="op-hero-stats">
              <div><strong>5+</strong><span>Years</span></div>
              <div><strong>3</strong><span>Clouds</span></div>
              <div><strong>50+</strong><span>Deploys</span></div>
              <div><strong>99.9%</strong><span>Uptime</span></div>
            </div>

            <div className="op-hero-tags">
              {TECH_TAGS.map((t) => (
                <span key={t} className="op-tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Right: live terminal */}
          <aside className="op-terminal">
            <div className="op-terminal-bar">
              <div className="op-terminal-dots">
                <span /><span /><span />
              </div>
              <span className="op-terminal-title">nitin@k8s-prod:~</span>
            </div>
            <div className="op-terminal-body">
              {CODE_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} className={line.prompt ? 'op-terminal-cmd' : 'op-terminal-out'}>
                  {line.prompt && <span className="op-terminal-prompt">{line.prompt}</span>}
                  <span>{line.prompt ? line.cmd : line.out}</span>
                </div>
              ))}
              {visibleLines < CODE_LINES.length && (
                <div className="op-terminal-cmd">
                  <span className="op-terminal-prompt">$</span>
                  <span className="op-terminal-cursor" aria-hidden="true" />
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <button
        className="op-scroll-btn"
        onClick={() => scrollToSectionById('about')}
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </button>
    </section>
  );
};

export default Hero;
