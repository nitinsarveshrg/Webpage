import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Flag, Gauge, Timer, Trophy } from 'lucide-react';
import TypingEffect from './TypingEffect';
import { portfolioData } from '../mock';

const BOOT_LINES = [
  '[BOOT] Starting race-ops portfolio runtime',
  '[OK] Multi-cloud lanes linked: AWS | Azure | GCP',
  '[OK] Toolchain armed: Terraform | Helm | Ansible',
  '[OK] Delivery grid hot: Jenkins | GitHub Actions | ArgoCD',
  '[INFO] Precision mode: Mercedes discipline + Max mindset',
  '[READY] Cockpit locked. Entering live portfolio...',
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const OpeningGate = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(1);
  const [countdown, setCountdown] = useState(8);
  const [telemetry, setTelemetry] = useState({
    speed: randomInt(282, 338),
    sector: randomInt(1, 3),
    delta: (Math.random() * 0.8 + 0.1).toFixed(2),
  });
  const doneRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    const bootInterval = window.setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= BOOT_LINES.length) {
          window.clearInterval(bootInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 540);

    return () => window.clearInterval(bootInterval);
  }, []);

  useEffect(() => {
    const telemetryInterval = window.setInterval(() => {
      setTelemetry({
        speed: randomInt(282, 338),
        sector: randomInt(1, 3),
        delta: (Math.random() * 0.8 + 0.1).toFixed(2),
      });
    }, 920);

    return () => window.clearInterval(telemetryInterval);
  }, []);

  useEffect(() => {
    const countdownInterval = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(countdownInterval);
          finishIntro();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(countdownInterval);
  }, [finishIntro]);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'Enter' || event.key === 'Escape' || event.key === ' ') {
        finishIntro();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [finishIntro]);

  const firstName = portfolioData.personal.name.split(' ')[0];
  const restName = portfolioData.personal.name.split(' ').slice(1).join(' ');

  return (
    <section className="opening-gate" aria-label="Portfolio opening sequence">
      <div className="opening-grid-overlay" />

      <div className="opening-shell">
        <div className="opening-headline-row">
          <div className="opening-pill">
            <Flag size={14} />
            <span>Pre-Race Intro Sequence</span>
          </div>
          <div className="opening-countdown">auto enter in {countdown}s</div>
        </div>

        <div className="opening-main">
          <div className="opening-left">
            <div className="opening-kicker">F1 Inspired DevOps Runtime</div>
            <h1>
              {firstName}
              <span>{restName}</span>
            </h1>
            <p className="opening-role">{portfolioData.personal.title}</p>
            <p className="opening-tagline">{portfolioData.personal.tagline}</p>

            <div className="opening-metric-row">
              <div className="opening-metric-card">
                <Gauge size={14} />
                <div>
                  <small>pace</small>
                  <strong>{telemetry.speed} km/h</strong>
                </div>
              </div>
              <div className="opening-metric-card">
                <Timer size={14} />
                <div>
                  <small>sector</small>
                  <strong>S{telemetry.sector} | +{telemetry.delta}s</strong>
                </div>
              </div>
              <div className="opening-metric-card">
                <Trophy size={14} />
                <div>
                  <small>focus</small>
                  <strong>reliability + speed</strong>
                </div>
              </div>
            </div>

            <div className="opening-command">
              <span className="prompt">$</span>{' '}
              <TypingEffect
                text="./launch_portfolio --f1 --cloud-devops --live"
                speed={26}
                cursorChar="_"
                persistCursor
              />
            </div>

            <button type="button" className="opening-enter-btn" onClick={finishIntro}>
              Enter Portfolio
            </button>
          </div>

          <aside className="opening-console">
            <div className="opening-console-top">
              <span />
              <span />
              <span />
              <div>nitin@race-control:~/boot</div>
            </div>

            <div className="opening-console-body">
              {BOOT_LINES.slice(0, visibleLines).map((line) => (
                <div key={line} className="opening-log-line">
                  {line}
                </div>
              ))}

              <div className="opening-console-bars" aria-hidden="true">
                {Array.from({ length: 24 }).map((_, index) => (
                  <span
                    key={`intro-bar-${index}`}
                    style={{
                      height: `${28 + Math.abs(Math.sin((index + telemetry.speed) * 0.34)) * 66}%`,
                      animationDelay: `${index * 48}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default OpeningGate;
