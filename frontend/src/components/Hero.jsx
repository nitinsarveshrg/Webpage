import React, { useEffect, useMemo, useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown, Gauge, RadioTower, Cpu, Award } from 'lucide-react';
import TypingEffect from './TypingEffect';
import { portfolioData } from '../mock';
import { scrollToSectionById } from '../lib/sectionScroll';

const commandProfiles = [
  {
    id: 'boot',
    command: './boot-profile --mode race-weekend',
    graph: 'ramp',
    note: 'cold-start validation + infra warm-up',
    targetSection: 'about',
    logs: [
      '[boot] loading profile modules',
      '[ok] telemetry drivers initialized',
      '[ok] autoscale policies attached',
      '[info] pit strategy profile active',
    ],
  },
  {
    id: 'sync',
    command: './sync-cloud --providers aws,azure,gcp',
    graph: 'pulse',
    note: 'multi-cloud control-plane sync',
    targetSection: 'skills',
    logs: [
      '[sync] comparing drift across providers',
      '[ok] policy baseline matched',
      '[ok] shared secrets rotation complete',
      '[info] all regions report healthy',
    ],
  },
  {
    id: 'observe',
    command: './stream-observability --realtime',
    graph: 'scan',
    note: 'log + metrics + traces stream fusion',
    targetSection: 'experience',
    logs: [
      '[obs] attaching trace collectors',
      '[ok] p95 latency alerts armed',
      '[ok] anomaly detector sensitivity tuned',
      '[info] dashboards now live',
    ],
  },
  {
    id: 'deploy',
    command: './deploy-fast --safe-rollout',
    graph: 'burst',
    note: 'canary rollout with rollback guardrails',
    targetSection: 'projects',
    logs: [
      '[deploy] canary lane prepared',
      '[ok] health probes green',
      '[ok] traffic shifted incrementally',
      '[info] rollout complete with zero incidents',
    ],
  },
];

const sectionShortcuts = [
  { id: 'about', label: './about' },
  { id: 'skills', label: './skills' },
  { id: 'experience', label: './experience' },
  { id: 'projects', label: './projects' },
  { id: 'contact', label: './contact' },
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(1);

const signalFromMode = (mode, tick, index, commandIndex, queue) => {
  const phase = tick + index + commandIndex * 3;

  if (mode === 'ramp') {
    const ramp = (index / 27) * 55 + 18;
    const wave = Math.sin(phase * 0.22) * 10;
    return Math.max(8, Math.min(92, Math.round(ramp + wave)));
  }

  if (mode === 'pulse') {
    const pulse = Math.abs(Math.sin((phase + queue) * 0.32)) * 62;
    const base = index % 2 === 0 ? 16 : 26;
    return Math.max(8, Math.min(95, Math.round(base + pulse)));
  }

  if (mode === 'scan') {
    const saw = ((phase * 7) % 100);
    const wave = Math.cos(phase * 0.41) * 8;
    return Math.max(10, Math.min(90, Math.round(saw * 0.62 + wave)));
  }

  const burst = Math.sin(phase * 0.5) > 0.62 ? 82 : 24;
  const shake = Math.abs(Math.cos(phase * 0.35)) * 16;
  return Math.max(8, Math.min(96, Math.round(burst + shake)));
};

const Hero = () => {
  const [commandIndex, setCommandIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [runtimeTick, setRuntimeTick] = useState(0);
  const [metrics, setMetrics] = useState({
    queue: randomInt(3, 18),
    latency: randomInt(18, 52),
    success: randomFloat(99.2, 99.99),
  });

  useEffect(() => {
    if (!autoRotate) return undefined;

    const rotateId = window.setInterval(() => {
      setCommandIndex((prev) => (prev + 1) % commandProfiles.length);
    }, 3200);

    return () => window.clearInterval(rotateId);
  }, [autoRotate]);

  useEffect(() => {
    const metricId = window.setInterval(() => {
      setMetrics({
        queue: randomInt(3, 18),
        latency: randomInt(18, 52),
        success: randomFloat(99.2, 99.99),
      });
      setRuntimeTick((prev) => prev + 1);
    }, 980);

    return () => window.clearInterval(metricId);
  }, []);

  const jump = (id) => scrollToSectionById(id);
  const activeProfile = commandProfiles[commandIndex];

  const commandSignal = useMemo(() => {
    return Array.from({ length: 28 }).map((_, index) => {
      return signalFromMode(activeProfile.graph, runtimeTick, index, commandIndex, metrics.queue);
    });
  }, [activeProfile.graph, runtimeTick, commandIndex, metrics.queue]);

  const topCertifications = useMemo(() => (portfolioData.certifications || []).slice(0, 2), []);

  return (
    <section id="hero" className="page-section hero-stage">
      <div className="section-anchor" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-grid-new hero-grid-solo">
          <div className="hero-copy-new">
            <div className="hero-chip">LIVE | CLOUD DEVOPS | F1 MODE</div>
            <h1 className="hero-title-new">
              {portfolioData.personal.name.split(' ')[0]} <br />
              <span>{portfolioData.personal.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="hero-role-new">{portfolioData.personal.title}</p>
            <p className="hero-tagline-new">{portfolioData.personal.tagline}</p>

            <div className="hero-hiring-cta">
              <span className="hero-hiring-dot" aria-hidden="true" />
              <span>Open to Cloud / DevOps / SRE roles in Canada • Available immediately</span>
            </div>

            <div className="hero-cta-row">
              <Button className="hero-btn-solid" onClick={() => jump('projects')}>
                view builds
              </Button>
              <Button className="hero-btn-ghost" variant="outline" onClick={() => jump('contact')}>
                open channel
              </Button>
            </div>

            <div className="hero-stat-grid-new">
              <div className="hero-stat-box"><span>5+</span><small>years</small></div>
              <div className="hero-stat-box"><span>3</span><small>clouds</small></div>
              <div className="hero-stat-box"><span>50+</span><small>deploys</small></div>
              <div className="hero-stat-box"><span>99.9%</span><small>uptime</small></div>
            </div>
          </div>
        </div>

        <div className="glass-card hero-runtime-panel">
          <div className="hero-console-top">
            <div className="hero-console-dots">
              <span />
              <span />
              <span />
            </div>
            <div className="hero-console-path">nitin@pitlane:~/runtime</div>
          </div>

          <div className="hero-console-body">
            <div className="hero-command-chip-row">
              {commandProfiles.map((profile, index) => (
                <button
                  key={profile.command}
                  className={`hero-command-chip ${index === commandIndex ? 'active' : ''}`}
                  onClick={() => {
                    setCommandIndex(index);
                    setAutoRotate(false);
                  }}
                >
                  cmd {index + 1}
                </button>
              ))}
              <button className="hero-command-chip" onClick={() => setAutoRotate((prev) => !prev)}>
                {autoRotate ? 'auto on' : 'auto off'}
              </button>
            </div>

            <div className="hero-command-line">
              <span className="prompt">$</span>{' '}
              <TypingEffect
                key={activeProfile.command}
                text={activeProfile.command}
                speed={24}
                cursorChar="_"
                persistCursor
              />
            </div>

            <div className="hero-runtime-note">{activeProfile.note}</div>

            <div className="hero-log-lines">
              {activeProfile.logs.map((line) => (
                <div key={`${activeProfile.id}-${line}`}>{line}</div>
              ))}
            </div>

            <div className={`hero-signal-bars mode-${activeProfile.graph}`}>
              {commandSignal.map((value, index) => (
                <span key={`${activeProfile.id}-${value}-${index}`} style={{ height: `${value}%` }} />
              ))}
            </div>

            <div className="hero-metric-rail">
              <div className="hero-metric-card">
                <Cpu size={14} />
                <span>queue {metrics.queue}</span>
              </div>
              <div className="hero-metric-card">
                <Gauge size={14} />
                <span>latency {metrics.latency}ms</span>
              </div>
              <div className="hero-metric-card">
                <RadioTower size={14} />
                <span>success {metrics.success}%</span>
              </div>
            </div>

            <div className="hero-runtime-actions">
              <button className="hero-runtime-link" onClick={() => jump(activeProfile.targetSection)}>
                open ./{activeProfile.targetSection}
              </button>
              <div className="hero-section-links">
                {sectionShortcuts.map((shortcut) => (
                  <button
                    key={shortcut.id}
                    className={`hero-section-link ${activeProfile.targetSection === shortcut.id ? 'active' : ''}`}
                    onClick={() => jump(shortcut.id)}
                  >
                    {shortcut.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card hero-cert-band">
          <div className="hero-cert-band-head">
            <span>certifications</span>
            <small>Trust signals above the fold</small>
          </div>
          <div className="hero-cert-band-list">
            {topCertifications.map((cert) => (
              <a
                key={cert.id}
                className="hero-cert-badge"
                href={cert.link}
                target="_blank"
                rel="noreferrer"
              >
                <Award size={14} />
                <span>{cert.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <button className="hero-scroll-cue" onClick={() => jump('about')} aria-label="Scroll to about section">
        <ChevronDown size={22} />
      </button>
    </section>
  );
};

export default Hero;
