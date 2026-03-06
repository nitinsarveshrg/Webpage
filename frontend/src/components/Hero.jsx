import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Cpu, Gauge, ShieldCheck, Sparkles, TerminalSquare } from 'lucide-react';
import { portfolioData } from '../mock';
import TypingEffect from './TypingEffect';
import { scrollToSectionById } from '../lib/sectionScroll';

const commandProfiles = [
  {
    id: 'boot',
    command: './boot --profile nitin --track production',
    lines: ['Cloud profile initialized', 'IaC modules loaded', 'Delivery lanes connected', 'Runtime healthy'],
  },
  {
    id: 'deploy',
    command: './deploy --region ca-central-1 --safe',
    lines: ['Plan verified', 'Policy check passed', 'Blue/green staged', 'Release completed'],
  },
  {
    id: 'observe',
    command: './observe --stack prometheus,grafana,cloudwatch',
    lines: ['Metrics streaming', 'Latency threshold armed', 'Alert routing configured', 'Dashboards live'],
  },
];

const telemetry = () => ({
  load: 32 + Math.floor(Math.random() * 34),
  latency: 16 + Math.floor(Math.random() * 32),
  health: 95 + Math.floor(Math.random() * 5),
});

const Hero = () => {
  const [activeMode, setActiveMode] = useState(0);
  const [autoMode, setAutoMode] = useState(true);
  const [metrics, setMetrics] = useState(telemetry);

  const certPreview = useMemo(() => portfolioData.certifications.slice(0, 2), []);

  useEffect(() => {
    if (!autoMode) return undefined;

    const id = window.setInterval(() => {
      setActiveMode((prev) => (prev + 1) % commandProfiles.length);
    }, 3600);

    return () => window.clearInterval(id);
  }, [autoMode]);

  useEffect(() => {
    const id = window.setInterval(() => setMetrics(telemetry()), 1200);
    return () => window.clearInterval(id);
  }, []);

  const activeProfile = commandProfiles[activeMode];

  return (
    <section id="hero" className="nx-section nx-hero-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap nx-hero-wrap">
        <div className="nx-hero-storyline" aria-hidden="true">
          <span>APPLE INSPIRED UI</span>
          <span>•</span>
          <span>LINUX TERMINAL DNA</span>
          <span>•</span>
          <span>PRODUCTION DEVOPS PROFILE</span>
        </div>

        <div className="nx-hero-grid">
          <div className="nx-hero-copy">
            <p className="nx-kicker">Cloud / DevOps / SRE • Canada</p>
            <h1>
              <span>{portfolioData.personal.name.split(' ')[0]}</span>
              <strong>{portfolioData.personal.name.split(' ').slice(1).join(' ')}</strong>
            </h1>
            <h2>{portfolioData.personal.title}</h2>
            <p className="nx-tagline">{portfolioData.personal.tagline}</p>

            <p className="nx-availability">
              Open to Cloud / DevOps / SRE roles in Canada • Available immediately
            </p>

            <div className="nx-cert-strip">
              {certPreview.map((cert) => (
                <span key={cert.id}>
                  <ShieldCheck size={13} /> {cert.name}
                </span>
              ))}
            </div>

            <div className="nx-hero-actions">
              <button onClick={() => scrollToSectionById('projects')} className="nx-btn-primary">View Delivery Portfolio</button>
              <button onClick={() => scrollToSectionById('contact')} className="nx-btn-secondary">Open Contact Channel</button>
            </div>

            <div className="nx-stat-grid">
              <div><strong>5+</strong><span>Years</span></div>
              <div><strong>3</strong><span>Clouds</span></div>
              <div><strong>50+</strong><span>Deployments</span></div>
              <div><strong>99.9%</strong><span>Uptime</span></div>
            </div>
          </div>

          <aside className="nx-runtime">
            <div className="nx-runtime-head">
              <div className="lights"><span /><span /><span /></div>
              <p>nitin@apple-shell:~/runtime</p>
            </div>

            <div className="nx-runtime-body">
              <div className="nx-runtime-controls">
                {commandProfiles.map((mode, index) => (
                  <button
                    key={mode.id}
                    className={index === activeMode ? 'active' : ''}
                    onClick={() => {
                      setActiveMode(index);
                      setAutoMode(false);
                    }}
                  >
                    cmd {index + 1}
                  </button>
                ))}
                <button onClick={() => setAutoMode((v) => !v)}>{autoMode ? 'auto on' : 'auto off'}</button>
              </div>

              <div className="nx-runtime-command">
                <TerminalSquare size={14} />
                <TypingEffect text={activeProfile.command} speed={20} cursorChar="_" persistCursor key={activeProfile.command} />
              </div>

              <div className="nx-runtime-log">
                {activeProfile.lines.map((line) => (
                  <div key={`${activeProfile.id}-${line}`}>
                    <Sparkles size={12} />
                    <span>{line}</span>
                  </div>
                ))}
              </div>

              <div className="nx-runtime-metrics">
                <div><Cpu size={13} /><span>load</span><strong>{metrics.load}%</strong></div>
                <div><Gauge size={13} /><span>latency</span><strong>{metrics.latency}ms</strong></div>
                <div><ShieldCheck size={13} /><span>health</span><strong>{metrics.health}%</strong></div>
              </div>
            </div>
          </aside>
        </div>

        <button className="nx-scroll-indicator" onClick={() => scrollToSectionById('about')} aria-label="Scroll to whoami">
          <ChevronDown size={18} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
