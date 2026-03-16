import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TypingEffect from './TypingEffect';

const bootLines = [
  { text: 'aws:ca-central-1  ● node-pool healthy    12/12 ready', region: 'AWS' },
  { text: 'k8s:cluster-prod  ● pods running         48/48 online', region: 'K8S' },
  { text: 'terraform:state   ● infrastructure sync  no drift', region: 'IaC' },
  { text: 'argocd:gitops     ● deployments in-sync  3 apps live', region: 'CD' },
  { text: 'prometheus:scrape ● metrics streaming    8.2k series', region: 'OBS' },
  { text: 'profile:nitin     ● operator loaded      ready to enter', region: 'SRE' },
];

// Static blip positions (fixed so they don't jump on render)
const BLIPS = [
  { top: '22%', left: '62%', delay: '0.4s' },
  { top: '68%', left: '28%', delay: '1.1s' },
  { top: '42%', left: '18%', delay: '1.8s' },
  { top: '72%', left: '65%', delay: '2.5s' },
  { top: '28%', left: '42%', delay: '0.9s' },
  { top: '58%', left: '75%', delay: '1.5s' },
];

const FrontGate = ({ exiting = false, onEnter }) => {
  const [lineCount, setLineCount] = useState(0);
  const [progress, setProgress] = useState(4);

  const visibleLines = useMemo(() => bootLines.slice(0, lineCount), [lineCount]);
  const pct = Math.round(progress);

  const finish = useCallback(() => {
    if (onEnter) onEnter();
  }, [onEnter]);

  useEffect(() => {
    const lineTimer = window.setInterval(() => {
      setLineCount((prev) => (prev >= bootLines.length ? prev : prev + 1));
    }, 380);

    const progressTimer = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 9 + 2;
        return next >= 100 ? 100 : next;
      });
    }, 200);

    const autoEnter = window.setTimeout(finish, 4500);

    return () => {
      window.clearInterval(lineTimer);
      window.clearInterval(progressTimer);
      window.clearTimeout(autoEnter);
    };
  }, [finish]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  return (
    <section className={`nx-gate ${exiting ? 'is-exiting' : ''}`} onClick={finish}>
      {/* Scanline overlay */}
      <div className="ng-scanlines" aria-hidden="true" />

      <div className="ng-layout" onClick={(e) => e.stopPropagation()}>

        {/* ── Radar panel ───────────────────────────────────── */}
        <div className="ng-radar-panel">
          <div className="ng-radar-label">
            <span className="ng-live-dot" />
            TOPOLOGY SCAN · CA-CENTRAL-1
          </div>

          <div className="ng-radar">
            {/* Concentric rings */}
            <div className="ng-radar-ring ng-radar-ring-1" />
            <div className="ng-radar-ring ng-radar-ring-2" />
            <div className="ng-radar-ring ng-radar-ring-3" />
            {/* Cross-hairs */}
            <div className="ng-radar-cross ng-radar-cross-h" />
            <div className="ng-radar-cross ng-radar-cross-v" />
            {/* Sweep */}
            <div className="ng-radar-sweep" />
            {/* Blips */}
            {BLIPS.map((b, i) => (
              <div
                key={i}
                className="ng-blip"
                style={{ top: b.top, left: b.left, animationDelay: b.delay }}
              />
            ))}
            {/* Center dot */}
            <div className="ng-radar-center" />
          </div>

          <div className="ng-radar-stats">
            <div><span>NODES</span><strong>12</strong></div>
            <div><span>PODS</span><strong>48</strong></div>
            <div><span>ALERTS</span><strong className="ok">0</strong></div>
          </div>
        </div>

        {/* ── Boot log panel ────────────────────────────────── */}
        <div className="ng-log-panel">
          <div className="ng-log-header">
            <div className="ng-leds">
              <span /><span /><span />
            </div>
            <p>
              <TypingEffect
                text="nitin@cluster:~$ ./init-portfolio --env prod"
                speed={22}
                cursorChar="_"
                persistCursor
              />
            </p>
          </div>

          <div className="ng-log-body" aria-live="polite">
            {visibleLines.map((line, i) => (
              <div key={i} className="ng-log-line">
                <span className="ng-log-region">[{line.region}]</span>
                <span>{line.text}</span>
              </div>
            ))}
            {lineCount < bootLines.length && (
              <div className="ng-log-cursor">_</div>
            )}
          </div>

          <div className="ng-progress-wrap">
            <div className="ng-progress-label">
              <span>INITIALIZING RUNTIME</span>
              <span>{pct}%</span>
            </div>
            <div className="ng-progress-rail">
              <div className="ng-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <button type="button" className="ng-enter" onClick={finish}>
            <span className="ng-enter-arrow">▶</span>
            ENTER PORTFOLIO
          </button>

          <p className="ng-hint">press ENTER or click anywhere to skip</p>
        </div>

      </div>
    </section>
  );
};

export default FrontGate;
