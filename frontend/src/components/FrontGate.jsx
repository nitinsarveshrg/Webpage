import React, { useCallback, useEffect, useState } from 'react';

const BOOT_LINES = [
  { cmd: 'loading cloud profile ............', tag: 'OK' },
  { cmd: 'verifying certifications .........', tag: 'OK' },
  { cmd: 'mounting infrastructure ...........', tag: 'OK' },
  { cmd: 'scanning deployment pipelines ....', tag: 'OK' },
  { cmd: 'establishing secure session ......', tag: 'OK' },
  { cmd: 'operator NSR profile loaded ......', tag: 'READY' },
];

const FrontGate = ({ exiting = false, onEnter }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(2);
  const [typed, setTyped] = useState('');

  const finish = useCallback(() => { if (onEnter) onEnter(); }, [onEnter]);

  useEffect(() => {
    const full = 'init-portfolio --operator nitin --env production';
    let i = 0;
    const t = window.setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) window.clearInterval(t);
    }, 38);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const st = window.setInterval(() => {
      setStep((p) => (p < BOOT_LINES.length ? p + 1 : p));
    }, 480);
    const pt = window.setInterval(() => {
      setProgress((p) => { const n = p + Math.random() * 10 + 2; return n >= 100 ? 100 : n; });
    }, 200);
    const at = window.setTimeout(finish, 5000);
    return () => { window.clearInterval(st); window.clearInterval(pt); window.clearTimeout(at); };
  }, [finish]);

  useEffect(() => {
    const k = (e) => { if (['Enter','Escape',' '].includes(e.key)) finish(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [finish]);

  const pct = Math.round(progress);
  const bar = Math.round(progress / 4);

  return (
    <div className={`opg-root ${exiting ? 'opg-exit' : ''}`} onClick={finish}>
      <div className="opg-noise" aria-hidden="true" />

      <div className="opg-window" onClick={(e) => e.stopPropagation()}>
        {/* Title bar */}
        <div className="opg-bar">
          <div className="opg-bar-dots">
            <span className="opg-dot opg-dot-r" />
            <span className="opg-dot opg-dot-y" />
            <span className="opg-dot opg-dot-g" />
          </div>
          <span className="opg-bar-title">operator@nexus:~$</span>
          <span className="opg-bar-badge">SECURE SESSION</span>
        </div>

        {/* Terminal body */}
        <div className="opg-body">
          {/* Typed command */}
          <div className="opg-cmd-line">
            <span className="opg-prompt">$</span>
            <span className="opg-cmd-text">{typed}</span>
            <span className="opg-cursor" aria-hidden="true" />
          </div>

          {/* Identity block */}
          <div className="opg-identity">
            <div className="opg-monogram">NS</div>
            <div className="opg-id-text">
              <h1 className="opg-name">NITIN SARVESH RAAJAGOPAL</h1>
              <p className="opg-role">Cloud Infrastructure · DevOps · Site Reliability</p>
            </div>
          </div>

          {/* Boot log */}
          <div className="opg-log" aria-live="polite">
            {BOOT_LINES.slice(0, step).map((line, i) => (
              <div key={i} className="opg-log-row">
                <span className="opg-log-arrow">▸</span>
                <span className="opg-log-cmd">{line.cmd}</span>
                <span className={`opg-log-tag ${line.tag === 'READY' ? 'opg-tag-ready' : 'opg-tag-ok'}`}>
                  [{line.tag}]
                </span>
              </div>
            ))}
            {step < BOOT_LINES.length && (
              <div className="opg-log-row opg-log-active">
                <span className="opg-log-arrow">▸</span>
                <span className="opg-log-cmd opg-scanning">scanning...</span>
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="opg-prog-wrap">
            <div className="opg-prog-bar">
              <span className="opg-prog-fill" style={{ '--pct': `${progress}%` }}>
                {'█'.repeat(bar)}{'░'.repeat(25 - bar)}
              </span>
              <span className="opg-prog-pct">{pct}%</span>
            </div>
          </div>

          {/* CTA */}
          <button type="button" className="opg-enter" onClick={finish}>
            ╔═══════════════════════════════════╗
            <br />║&nbsp;&nbsp;ENTER&nbsp;COMMAND&nbsp;CENTER&nbsp;&nbsp;[→]&nbsp;&nbsp;║
            <br />╚═══════════════════════════════════╝
          </button>

          <p className="opg-hint">// PRESS ENTER · SPACE · OR CLICK ANYWHERE TO SKIP</p>
        </div>
      </div>
    </div>
  );
};

export default FrontGate;
