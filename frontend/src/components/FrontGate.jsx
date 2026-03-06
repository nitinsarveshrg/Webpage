import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Activity, Gauge, TerminalSquare } from 'lucide-react';
import TypingEffect from './TypingEffect';

const bootLines = [
  'bootloader: initializing display kernel',
  'profile-loader: mounting nitin.sarvesh.runtime',
  'pipeline-check: ci/cd channels synchronized',
  'cloud-check: aws telemetry online',
  'observability: tracing + metrics attached',
  'status: ready to enter experience',
];

const FrontGate = ({ exiting = false, onEnter }) => {
  const [lineCount, setLineCount] = useState(0);
  const [progress, setProgress] = useState(6);
  const [fps, setFps] = useState(92);

  const visibleLines = useMemo(() => bootLines.slice(0, lineCount), [lineCount]);

  const finish = useCallback(() => {
    if (onEnter) onEnter();
  }, [onEnter]);

  useEffect(() => {
    const lineTimer = window.setInterval(() => {
      setLineCount((prev) => (prev >= bootLines.length ? prev : prev + 1));
    }, 280);

    const progressTimer = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 8;
        return next >= 100 ? 100 : next;
      });
      setFps(88 + Math.floor(Math.random() * 24));
    }, 170);

    const autoEnter = window.setTimeout(() => finish(), 4200);

    return () => {
      window.clearInterval(lineTimer);
      window.clearInterval(progressTimer);
      window.clearTimeout(autoEnter);
    };
  }, [finish]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === 'Escape' || event.key === ' ') finish();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [finish]);

  return (
    <section className={`nx-gate ${exiting ? 'is-exiting' : ''}`}>
      <div className="nx-gate-grid" />
      <div className="nx-gate-vignette" />

      <div className="nx-gate-panel">
        <header>
          <div className="nx-gate-leds" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p>nitin@race-workstation:~/portfolio_boot</p>
        </header>

        <div className="nx-gate-body">
          <h1>Interactive Portfolio Runtime</h1>

          <div className="nx-gate-command">
            <TerminalSquare size={15} />
            <TypingEffect
              text="./launch --profile nitin --mode cinematic"
              speed={18}
              cursorChar="_"
              persistCursor
            />
          </div>

          <div className="nx-gate-log" aria-live="polite">
            {visibleLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>

          <div className="nx-gate-progress-wrap">
            <div className="nx-gate-progress-label">
              <span>startup progress</span>
              <strong>{Math.round(progress)}%</strong>
            </div>
            <div className="nx-gate-progress-rail">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="nx-gate-metrics">
            <div>
              <Activity size={14} />
              <span>stream</span>
              <strong>stable</strong>
            </div>
            <div>
              <Gauge size={14} />
              <span>render fps</span>
              <strong>{fps}</strong>
            </div>
          </div>

          <button type="button" className="nx-gate-enter" onClick={finish}>
            Enter Experience
          </button>
        </div>
      </div>
    </section>
  );
};

export default FrontGate;
