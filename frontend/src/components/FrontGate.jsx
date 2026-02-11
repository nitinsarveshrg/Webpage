import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Cloud, Flag, Gauge, ShieldCheck, Timer } from 'lucide-react';
import TypingEffect from './TypingEffect';
import { portfolioData } from '../mock';

const raceLogs = [
  '[pit] Tyre temps stabilized and launch map loaded',
  '[cloud] AWS, Azure, and GCP control-plane synchronized',
  '[sec] Guardrails enabled across CI/CD and runtime',
  '[deploy] Pipeline confidence at race-ready state',
  '[go] Grid clear. Entering portfolio cockpit',
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const FrontGate = ({ exiting = false, onEnter }) => {
  const [logIndex, setLogIndex] = useState(0);
  const [telemetry, setTelemetry] = useState({
    speed: randomInt(288, 346),
    latency: randomInt(18, 39),
    reliability: randomInt(97, 100),
  });
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    if (onEnter) onEnter();
  }, [onEnter]);

  useEffect(() => {
    const logTimer = window.setInterval(() => {
      setLogIndex((prev) => (prev >= raceLogs.length - 1 ? prev : prev + 1));
    }, 520);

    return () => window.clearInterval(logTimer);
  }, []);

  useEffect(() => {
    const telemetryTimer = window.setInterval(() => {
      setTelemetry({
        speed: randomInt(288, 346),
        latency: randomInt(18, 39),
        reliability: randomInt(97, 100),
      });
    }, 560);

    return () => window.clearInterval(telemetryTimer);
  }, []);

  useEffect(() => {
    const autoEnter = window.setTimeout(() => finish(), 5200);
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

  const activeLogs = useMemo(() => raceLogs.slice(0, logIndex + 1), [logIndex]);

  return (
    <section className={`front-gate ${exiting ? 'is-exiting' : ''}`}>
      <div className="fg-backdrop" />
      <div className="fg-grid" />
      <div className="fg-speed-lines" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, idx) => (
          <span key={`fg-line-${idx}`} style={{ animationDelay: `${idx * 120}ms` }} />
        ))}
      </div>

      <div className="fg-hud-top">
        <span><Flag size={13} /> race control</span>
        <span><Cloud size={13} /> multi-cloud runtime</span>
        <span><Gauge size={13} /> lap launch mode</span>
      </div>

      <div className="fg-shell">
        <div className="fg-left">
          <p className="fg-kicker">F1 Styled Launch</p>
          <h1>{portfolioData.personal.name}</h1>
          <p className="fg-role">{portfolioData.personal.title}</p>
          <p className="fg-tagline">{portfolioData.personal.tagline}</p>

          <div className="fg-command">
            <span className="prompt">$</span>{' '}
            <TypingEffect
              text="./ignite_portfolio --mode f1 --persona nitin --smooth"
              speed={22}
              cursorChar="_"
              persistCursor
            />
          </div>

          <div className="fg-pill-row">
            <span>linux native</span>
            <span>cloud reliability</span>
            <span>f1 pace</span>
          </div>

          <button type="button" className="fg-enter-btn" onClick={finish}>
            Enter Portfolio
          </button>
        </div>

        <aside className="fg-right">
          <div className="fg-right-head">
            <div className="fg-lights" aria-hidden="true">
              <span className="on" />
              <span className="on" />
              <span className="on" />
              <span className="on" />
              <span className="go" />
            </div>
            <p>nitin@pit-wall:~/launch-grid</p>
          </div>

          <div className="fg-log-block">
            {activeLogs.map((line) => (
              <div key={line} className="fg-log-line">{line}</div>
            ))}
          </div>

          <div className="fg-metric-row">
            <div>
              <Gauge size={13} />
              <strong>{telemetry.speed} km/h</strong>
              <small>velocity</small>
            </div>
            <div>
              <Timer size={13} />
              <strong>{telemetry.latency} ms</strong>
              <small>latency</small>
            </div>
            <div>
              <ShieldCheck size={13} />
              <strong>{telemetry.reliability}%</strong>
              <small>reliability</small>
            </div>
          </div>

          <div className="fg-wave-bars" aria-hidden="true">
            {Array.from({ length: 26 }).map((_, idx) => (
              <span
                key={`wave-${idx}`}
                style={{
                  height: `${20 + Math.abs(Math.sin((idx + telemetry.speed) * 0.31)) * 74}%`,
                  animationDelay: `${idx * 36}ms`,
                }}
              />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default FrontGate;
