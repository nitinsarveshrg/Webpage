import React, { useCallback, useEffect, useState } from 'react';
import { Cpu, Gauge, Sparkles } from 'lucide-react';
import TypingEffect from './TypingEffect';

const introLines = [
  '[boot] calibrating display pipeline',
  '[boot] validating cloud profile metadata',
  '[boot] preparing motion layers',
  '[boot] syncing delivery portfolio',
  '[ready] entering interactive showcase',
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const FrontGate = ({ exiting = false, onEnter }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [metrics, setMetrics] = useState({
    fps: randomInt(60, 120),
    render: randomInt(9, 22),
    sync: randomInt(97, 100),
  });

  const finish = useCallback(() => {
    if (onEnter) onEnter();
  }, [onEnter]);

  useEffect(() => {
    const logTimer = window.setInterval(() => {
      setLineIndex((prev) => (prev >= introLines.length - 1 ? prev : prev + 1));
    }, 170);

    const metricTimer = window.setInterval(() => {
      setMetrics({
        fps: randomInt(60, 120),
        render: randomInt(9, 22),
        sync: randomInt(97, 100),
      });
    }, 260);

    const autoEnter = window.setTimeout(() => finish(), 2100);

    return () => {
      window.clearInterval(logTimer);
      window.clearInterval(metricTimer);
      window.clearTimeout(autoEnter);
    };
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
    <section className={`mk-gate ${exiting ? 'is-exiting' : ''}`}>
      <div className="mk-gate-glow" />
      <div className="mk-gate-noise" />

      <div className="mk-gate-stage">
        <div className="mk-gate-device">
          <div className="mk-gate-notch" />

          <div className="mk-gate-top">
            <div className="mk-gate-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p>Nitin Sarvesh • Portfolio Boot</p>
          </div>

          <div className="mk-gate-body">
            <h2>Cloud DevOps Showcase</h2>
            <div className="mk-gate-command">
              <span>$</span>
              <TypingEffect
                text="launch --profile nitin --experience immersive"
                speed={14}
                startDelay={30}
                cursorChar="_"
                persistCursor
              />
            </div>

            <div className="mk-gate-log">
              {introLines.slice(0, lineIndex + 1).map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>

            <div className="mk-gate-metrics">
              <div><Cpu size={13} /><strong>{metrics.fps}</strong><small>fps</small></div>
              <div><Gauge size={13} /><strong>{metrics.render}ms</strong><small>render</small></div>
              <div><Sparkles size={13} /><strong>{metrics.sync}%</strong><small>sync</small></div>
            </div>

            <button type="button" className="mk-gate-enter" onClick={finish}>
              Enter Portfolio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrontGate;
