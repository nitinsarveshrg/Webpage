import React, { useCallback, useEffect, useState } from 'react';
import { Cpu, Gauge, RadioTower } from 'lucide-react';
import TypingEffect from './TypingEffect';

const bootLogs = [
  '[init] loading profile: nitin.cloud-devops',
  '[ok] shell environment detected (linux mode)',
  '[ok] aws runtime bindings attached',
  '[ok] ci/cd delivery hooks registered',
  '[ok] observability streams online',
  '[ready] launching portfolio',
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const FrontGate = ({ exiting = false, onEnter }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [metrics, setMetrics] = useState({
    cpu: randomInt(28, 66),
    mem: randomInt(34, 72),
    latency: randomInt(16, 41),
  });

  const finish = useCallback(() => {
    if (onEnter) onEnter();
  }, [onEnter]);

  useEffect(() => {
    const logTimer = window.setInterval(() => {
      setLineIndex((prev) => (prev >= bootLogs.length - 1 ? prev : prev + 1));
    }, 210);

    return () => window.clearInterval(logTimer);
  }, []);

  useEffect(() => {
    const metricTimer = window.setInterval(() => {
      setMetrics({
        cpu: randomInt(28, 66),
        mem: randomInt(34, 72),
        latency: randomInt(16, 41),
      });
    }, 320);

    return () => window.clearInterval(metricTimer);
  }, []);

  useEffect(() => {
    const autoEnter = window.setTimeout(() => finish(), 2900);
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
      <div className="fg-backdrop" />
      <div className="fg-grid" />

      <div className="fg-shell fg-shell-terminal">
        <div className="fg-terminal">
          <div className="fg-terminal-top">
            <div className="fg-lights" aria-hidden="true">
              <span className="red" />
              <span className="yellow" />
              <span className="green" />
            </div>
            <p>root@cloud-devops:~/boot</p>
          </div>

          <div className="fg-terminal-body">
            <div className="fg-kicker">Initializing portfolio runtime</div>

            <div className="fg-command">
              <span className="prompt">$</span>{' '}
              <TypingEffect
                text="./bootstrap_portfolio --profile nitin --mode live"
                speed={12}
                startDelay={40}
                cursorChar="_"
                persistCursor
              />
            </div>

            <div className="fg-log-block">
              {bootLogs.slice(0, lineIndex + 1).map((line) => (
                <div key={line} className="fg-log-line">{line}</div>
              ))}
            </div>

            <div className="fg-metric-row">
              <div>
                <Cpu size={13} />
                <strong>{metrics.cpu}%</strong>
                <small>cpu</small>
              </div>
              <div>
                <RadioTower size={13} />
                <strong>{metrics.mem}%</strong>
                <small>mem</small>
              </div>
              <div>
                <Gauge size={13} />
                <strong>{metrics.latency}ms</strong>
                <small>latency</small>
              </div>
            </div>

            <div className="fg-terminal-actions">
              <span>Press Enter to skip</span>
              <button type="button" className="fg-enter-btn" onClick={finish}>
                Enter Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrontGate;
