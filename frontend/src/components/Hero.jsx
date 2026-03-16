import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../mock';
import { scrollToSectionById } from '../lib/sectionScroll';

const TECH_TAGS = ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'ArgoCD', 'Helm', 'Prometheus', 'Grafana', 'Jenkins', 'GitHub Actions', 'Python', 'Bash'];

const EVENTS = [
  { text: 'k8s/pods · 48/48 running' },
  { text: 'argocd · 3 apps in-sync' },
  { text: 'terraform · no drift detected' },
];

const live = () => ({
  cpu:     32 + Math.floor(Math.random() * 36),
  latency: 14 + Math.floor(Math.random() * 30),
  health:  95 + Math.floor(Math.random() * 5),
});

const Hero = () => {
  const [metrics, setMetrics] = useState(live);
  const certPreview = useMemo(() => portfolioData.certifications.slice(0, 2), []);

  useEffect(() => {
    const id = window.setInterval(() => setMetrics(live()), 1400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="hero" className="nx-hero nx-section">
      <div className="section-anchor" aria-hidden="true" />

      <div className="nx-hero-statusbar">
        <span className="nx-hero-status-dot" aria-hidden="true" />
        <span>NEXUS SYSTEMS ONLINE</span>
        <span className="nx-hero-status-sep">·</span>
        <span>UPTIME 99.9%</span>
        <span className="nx-hero-status-sep">·</span>
        <span>ALERTS <strong>0</strong></span>
        <span className="nx-hero-status-sep">·</span>
        <span>CA-CENTRAL-1</span>
      </div>

      <div className="content-wrap">
        <div className="nx-hero-grid">

          <div className="nx-hero-copy">
            <div className="nx-hero-badge">
              <span className="nx-hero-badge-dot" />
              AVAILABLE FOR HIRE · TORONTO, CANADA
            </div>

            <div className="nx-hero-avatar">NS</div>

            <h1 className="nx-hero-h1">
              <span>NITIN</span>
              <span className="nx-hero-h1-accent">SARVESH</span>
            </h1>

            <p className="nx-hero-role">{portfolioData.personal.title}</p>
            <p className="nx-hero-tagline">{portfolioData.personal.tagline}</p>

            <div className="nx-hero-tags">
              {TECH_TAGS.map((t) => (
                <span key={t} className="nx-hero-tag">{t}</span>
              ))}
            </div>

            <div className="nx-hero-certs">
              {certPreview.map((c) => (
                <span key={c.id}><ShieldCheck size={12} /> {c.name}</span>
              ))}
            </div>

            <div className="nx-hero-actions">
              <button className="nx-btn-primary" onClick={() => scrollToSectionById('projects')}>
                View Projects →
              </button>
              <button className="nx-btn-secondary" onClick={() => scrollToSectionById('contact')}>
                Get in Touch
              </button>
            </div>

            <div className="nx-hero-stats">
              <div><strong>5+</strong><span>Years</span></div>
              <div><strong>3</strong><span>Clouds</span></div>
              <div><strong>50+</strong><span>Deployments</span></div>
              <div><strong>99.9%</strong><span>Uptime</span></div>
            </div>
          </div>

          <aside className="nx-dashboard">
            <div className="nx-dashboard-head">
              <div className="nx-dashboard-lights"><span /><span /><span /></div>
              <span className="nx-dashboard-title">◉ NEXUS / STATUS — LIVE</span>
            </div>

            <div className="nx-dashboard-body">
              <div className="nx-dashboard-status">
                <span className="nx-status-led" aria-hidden="true" />
                SYSTEM OPERATIONAL
              </div>

              <div className="nx-dashboard-metrics">
                {[
                  { label: 'CPU LOAD',    value: metrics.cpu,     unit: '%',  pct: metrics.cpu },
                  { label: 'P99 LATENCY', value: metrics.latency, unit: 'ms', pct: Math.min(100, metrics.latency * 2) },
                  { label: 'HEALTH SLA',  value: metrics.health,  unit: '%',  pct: metrics.health },
                ].map(({ label, value, unit, pct }) => (
                  <div key={label} className="nx-metric-row">
                    <span className="nx-metric-label">{label}</span>
                    <div className="nx-metric-bar">
                      <div className="nx-metric-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="nx-metric-val">{value}{unit}</span>
                  </div>
                ))}
              </div>

              <div className="nx-dashboard-divider">RECENT EVENTS</div>
              <div className="nx-dashboard-events">
                {EVENTS.map((ev) => (
                  <div key={ev.text} className="nx-event-row">
                    <span className="nx-event-icon">✓</span>
                    <span>{ev.text}</span>
                  </div>
                ))}
              </div>

              <div className="nx-dashboard-divider">ALERT SUMMARY</div>
              <div className="nx-dashboard-alerts">
                <span className="nx-alerts-count">0 ACTIVE</span>
                <span className="nx-alerts-clear">◼ ALL CLEAR</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <button
        className="nx-scroll-btn"
        onClick={() => scrollToSectionById('about')}
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </button>
    </section>
  );
};

export default Hero;
