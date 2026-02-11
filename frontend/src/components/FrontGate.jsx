import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Cloud, Flag, ShieldCheck, TerminalSquare, Zap } from 'lucide-react';
import TypingEffect from './TypingEffect';
import { portfolioData } from '../mock';

const bootSteps = [
  '[grid] Loading profile modules',
  '[cloud] Linking AWS / Azure / GCP lanes',
  '[sec] Enforcing policy + observability guards',
  '[ci] Arming delivery pipelines and rollout checks',
  '[go] Runtime is hot. Ready for launch',
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const FrontGate = ({ exiting = false, onEnter }) => {
  const [step, setStep] = useState(0);
  const [telemetry, setTelemetry] = useState({
    speed: randomInt(286, 344),
    score: randomInt(96, 100),
    latency: randomInt(18, 42),
  });
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    if (onEnter) onEnter();
  }, [onEnter]);

  useEffect(() => {
    const stepInterval = window.setInterval(() => {
      setStep((prev) => {
        if (prev >= bootSteps.length - 1) {
          window.clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    return () => window.clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    const telemetryInterval = window.setInterval(() => {
      setTelemetry({
        speed: randomInt(286, 344),
        score: randomInt(96, 100),
        latency: randomInt(18, 42),
      });
    }, 620);

    return () => window.clearInterval(telemetryInterval);
  }, []);

  useEffect(() => {
    const autoEnter = window.setTimeout(() => {
      finish();
    }, 5600);

    return () => window.clearTimeout(autoEnter);
  }, [finish]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Enter' || event.key === 'Escape' || event.key === ' ') {
        finish();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  return (
    <section className={`front-gate ${exiting ? 'is-exiting' : ''}`}>
      <div className="front-gate-noise" />
      <div className="front-gate-grid" />

      <div className="front-gate-topbar">
        <div className="fg-pill"><Flag size={13} /> launch control</div>
        <div className="fg-pill"><Cloud size={13} /> cloud runtime</div>
        <div className="fg-pill"><TerminalSquare size={13} /> linux stack</div>
      </div>

      <div className="front-gate-layout">
        <div className="front-gate-copy">
          <p className="fg-kicker">F1 Velocity x DevOps Reliability</p>
          <h1>{portfolioData.personal.name}</h1>
          <p className="fg-role">{portfolioData.personal.title}</p>
          <p className="fg-tagline">{portfolioData.personal.tagline}</p>

          <div className="fg-command">
            <span className="prompt">$</span>{' '}
            <TypingEffect
              text="./launch_portfolio --style race-linux --persona nitin"
              speed={22}
              cursorChar="_"
              persistCursor
            />
          </div>

          <div className="fg-interest-row">
            <span>Linux-first</span>
            <span>Cloud automation</span>
            <span>F1 fan mode</span>
          </div>

          <button type="button" className="fg-enter-btn" onClick={finish}>
            Enter Portfolio
          </button>
        </div>

        <aside className="front-gate-console">
          <div className="fg-console-head">
            <span />
            <span />
            <span />
            <p>nitin@race-shell:~/launch</p>
          </div>

          <div className="fg-console-body">
            {bootSteps.slice(0, step + 1).map((line) => (
              <div key={line} className="fg-log-line">{line}</div>
            ))}

            <div className="fg-metrics">
              <div>
                <Zap size={13} />
                <strong>{telemetry.speed} km/h</strong>
                <small>pace</small>
              </div>
              <div>
                <ShieldCheck size={13} />
                <strong>{telemetry.score}%</strong>
                <small>health</small>
              </div>
              <div>
                <Cloud size={13} />
                <strong>{telemetry.latency} ms</strong>
                <small>latency</small>
              </div>
            </div>

            <div className="fg-track-bars">
              {Array.from({ length: 28 }).map((_, idx) => (
                <span
                  key={`bar-${idx}`}
                  style={{
                    height: `${22 + Math.abs(Math.sin((idx + telemetry.speed) * 0.32)) * 72}%`,
                    animationDelay: `${idx * 30}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default FrontGate;
