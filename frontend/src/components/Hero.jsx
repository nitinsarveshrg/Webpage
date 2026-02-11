import React, { useEffect, useMemo, useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown, Gauge, RadioTower, Cpu } from 'lucide-react';
import TypingEffect from './TypingEffect';
import { portfolioData } from '../mock';
import { scrollToSectionById } from '../lib/sectionScroll';

const commands = [
  './boot-profile --mode race-weekend',
  './sync-cloud --providers aws,azure,gcp',
  './stream-observability --realtime',
  './deploy-fast --safe-rollout',
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const Hero = () => {
  const [commandIndex, setCommandIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [metrics, setMetrics] = useState({
    cpu: randomInt(22, 67),
    mem: randomInt(38, 79),
    rel: randomInt(97, 100),
  });

  useEffect(() => {
    if (!autoRotate) return undefined;

    const rotateId = window.setInterval(() => {
      setCommandIndex((prev) => (prev + 1) % commands.length);
    }, 2600);

    return () => window.clearInterval(rotateId);
  }, [autoRotate]);

  useEffect(() => {
    const metricId = window.setInterval(() => {
      setMetrics({
        cpu: randomInt(22, 67),
        mem: randomInt(38, 79),
        rel: randomInt(97, 100),
      });
    }, 1400);

    return () => window.clearInterval(metricId);
  }, []);

  const jump = (id) => scrollToSectionById(id);

  const commandSignal = useMemo(() => {
    return Array.from({ length: 28 }).map((_, index) => {
      const base = Math.sin((index + commandIndex) * 0.4) * 20 + 36;
      const pulse = Math.cos((index + metrics.cpu) * 0.2) * 8;
      return Math.max(10, Math.min(76, Math.round(base + pulse)));
    });
  }, [commandIndex, metrics.cpu]);

  return (
    <section id="hero" className="page-section hero-stage">
      <div className="section-anchor" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-grid-new">
          <div className="hero-copy-new">
            <div className="hero-chip">LIVE | CLOUD DEVOPS | F1 MODE</div>
            <h1 className="hero-title-new">
              {portfolioData.personal.name.split(' ')[0]} <br />
              <span>{portfolioData.personal.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="hero-role-new">{portfolioData.personal.title}</p>
            <p className="hero-tagline-new">{portfolioData.personal.tagline}</p>

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

          <aside className="hero-console-new">
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
                {commands.map((cmd, index) => (
                  <button
                    key={cmd}
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
                <TypingEffect key={commands[commandIndex]} text={commands[commandIndex]} speed={24} cursorChar="_" persistCursor />
              </div>

              <div className="hero-log-lines">
                <div>[ok] control-plane synced</div>
                <div>[ok] release lanes green</div>
                <div>[ok] telemetry stream active</div>
                <div>[info] mercedes + max weekend mode</div>
              </div>

              <div className="hero-signal-bars">
                {commandSignal.map((value, index) => (
                  <span key={`${value}-${index}`} style={{ height: `${value}%` }} />
                ))}
              </div>

              <div className="hero-metric-rail">
                <div className="hero-metric-card">
                  <Cpu size={14} />
                  <span>cpu {metrics.cpu}%</span>
                </div>
                <div className="hero-metric-card">
                  <Gauge size={14} />
                  <span>mem {metrics.mem}%</span>
                </div>
                <div className="hero-metric-card">
                  <RadioTower size={14} />
                  <span>rel {metrics.rel}%</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <button className="hero-scroll-cue" onClick={() => jump('about')} aria-label="Scroll to about section">
        <ChevronDown size={22} />
      </button>
    </section>
  );
};

export default Hero;
