import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Cpu, Gauge, ShieldCheck, Sparkles, TerminalSquare } from 'lucide-react';
import { portfolioData } from '../mock';
import TypingEffect from './TypingEffect';
import { scrollToSectionById } from '../lib/sectionScroll';

const commandProfiles = [
  {
    id: 'boot',
    command: './boot --target production-shell',
    lines: ['Profile loaded', 'Delivery matrix online', 'Cloud posture verified', 'Runtime stable'],
  },
  {
    id: 'sync',
    command: './sync --cloud aws --iac terraform',
    lines: ['State validated', 'Drift checks clean', 'Pipelines attached', 'Ready for release'],
  },
  {
    id: 'observe',
    command: './observe --stack prometheus,grafana',
    lines: ['Signal intake healthy', 'Latency watch armed', 'Dashboard stream active', 'Alerts in threshold'],
  },
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const waveform = Array.from({ length: 30 }, (_, index) => index);

const Hero = () => {
  const [activeMode, setActiveMode] = useState(0);
  const [autoMode, setAutoMode] = useState(true);
  const [metrics, setMetrics] = useState({
    load: randomInt(21, 57),
    latency: randomInt(19, 52),
    deploy: randomInt(95, 100),
  });

  useEffect(() => {
    if (!autoMode) return undefined;

    const id = window.setInterval(() => {
      setActiveMode((prev) => (prev + 1) % commandProfiles.length);
    }, 3600);

    return () => window.clearInterval(id);
  }, [autoMode]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setMetrics({
        load: randomInt(21, 57),
        latency: randomInt(19, 52),
        deploy: randomInt(95, 100),
      });
    }, 1100);

    return () => window.clearInterval(id);
  }, []);

  const activeProfile = commandProfiles[activeMode];
  const certPreview = useMemo(() => portfolioData.certifications.slice(0, 2), []);

  const jump = (id) => scrollToSectionById(id);

  return (
    <section id="hero" className="page-section mk-section mk-hero">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap mk-hero-wrap">
        <div className="mk-hero-marquee" aria-hidden="true">
          <span>Cloud Reliability • DevOps Delivery • Apple-grade Experience •</span>
          <span>Cloud Reliability • DevOps Delivery • Apple-grade Experience •</span>
        </div>

        <div className="mk-hero-grid">
          <div className="mk-hero-copy mk-card">
            <span className="mk-eyebrow">APPLE-INSPIRED PRODUCT EXPERIENCE</span>
            <h1>
              {portfolioData.personal.name.split(' ')[0]}
              <span>{portfolioData.personal.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="mk-hero-role">{portfolioData.personal.title}</p>
            <p className="mk-hero-tagline">{portfolioData.personal.tagline}</p>

            <div className="mk-hero-availability">
              <span className="dot" />
              Open to Cloud / DevOps / SRE roles in Canada • Available immediately
            </div>

            <div className="mk-hero-certs">
              {certPreview.map((cert) => (
                <div key={cert.id} className="mk-pill-soft">
                  <ShieldCheck size={14} />
                  <span>{cert.name}</span>
                </div>
              ))}
            </div>

            <div className="mk-hero-actions">
              <button className="mk-btn-solid" onClick={() => jump('projects')}>View Projects</button>
              <button className="mk-btn-ghost" onClick={() => jump('contact')}>Contact Me</button>
            </div>

            <div className="mk-hero-stats">
              <div><strong>5+</strong><span>Years</span></div>
              <div><strong>3</strong><span>Clouds</span></div>
              <div><strong>50+</strong><span>Deployments</span></div>
              <div><strong>99.9%</strong><span>Uptime</span></div>
            </div>
          </div>

          <aside className="mk-hero-device mk-card">
            <div className="mk-device-sheen" aria-hidden="true" />
            <div className="mk-device-top">
              <div className="lights" aria-hidden="true"><span /><span /><span /></div>
              <p>nitin@macbook-pro:~/portfolio</p>
            </div>

            <div className="mk-device-body">
              <div className="mk-mode-row">
                {commandProfiles.map((mode, index) => (
                  <button
                    key={mode.id}
                    className={`mk-mode-btn ${index === activeMode ? 'active' : ''}`}
                    onClick={() => {
                      setActiveMode(index);
                      setAutoMode(false);
                    }}
                  >
                    mode {index + 1}
                  </button>
                ))}
                <button className="mk-mode-btn" onClick={() => setAutoMode((v) => !v)}>{autoMode ? 'auto on' : 'auto off'}</button>
              </div>

              <div className="mk-command-line">
                <TerminalSquare size={14} />
                <TypingEffect
                  key={activeProfile.command}
                  text={activeProfile.command}
                  speed={20}
                  cursorChar="_"
                  persistCursor
                />
              </div>

              <div className="mk-command-log">
                {activeProfile.lines.map((line) => (
                  <div key={`${activeProfile.id}-${line}`}>
                    <Sparkles size={12} />
                    <span>{line}</span>
                  </div>
                ))}
              </div>

              <div className="mk-metric-grid">
                <div><Cpu size={13} /><strong>{metrics.load}%</strong><small>load</small></div>
                <div><Gauge size={13} /><strong>{metrics.latency}ms</strong><small>latency</small></div>
                <div><ShieldCheck size={13} /><strong>{metrics.deploy}%</strong><small>delivery</small></div>
              </div>

              <div className="mk-runtime-wave" aria-label="runtime stream visual">
                {waveform.map((bar) => (
                  <span
                    key={bar}
                    style={{
                      animationDelay: `${bar * 45}ms`,
                      height: `${28 + ((bar * 9) % 54)}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <button className="mk-scroll-cue" onClick={() => jump('about')} aria-label="Scroll to profile">
        <ChevronDown size={20} />
      </button>
    </section>
  );
};

export default Hero;
