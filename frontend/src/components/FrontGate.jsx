import React, { useCallback, useEffect, useState } from 'react';

const BOOT_SERVICES = [
  { id: 'aws',  label: 'AWS CA-CENTRAL-1',   status: 'NOMINAL',   color: '#f97316' },
  { id: 'k8s',  label: 'K8S CLUSTER-PROD',   status: 'HEALTHY',   color: '#38bdf8' },
  { id: 'tf',   label: 'TERRAFORM STATE',     status: 'SYNCED',    color: '#a78bfa' },
  { id: 'argo', label: 'ARGOCD GITOPS',       status: 'IN-SYNC',   color: '#34d399' },
  { id: 'obs',  label: 'PROMETHEUS OBSERVE',  status: 'STREAMING', color: '#fb923c' },
  { id: 'id',   label: 'IDENTITY NEXUS-1',    status: 'VERIFIED',  color: '#4ade80' },
];

const FrontGate = ({ exiting = false, onEnter }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(3);

  const finish = useCallback(() => {
    if (onEnter) onEnter();
  }, [onEnter]);

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setStep((prev) => (prev < BOOT_SERVICES.length ? prev + 1 : prev));
    }, 480);
    const progTimer = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 9 + 2;
        return next >= 100 ? 100 : next;
      });
    }, 200);
    const autoTimer = window.setTimeout(finish, 4800);
    return () => {
      window.clearInterval(stepTimer);
      window.clearInterval(progTimer);
      window.clearTimeout(autoTimer);
    };
  }, [finish]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  const pct = Math.round(progress);

  return (
    <div className={`nxg-root ${exiting ? 'nxg-exit' : ''}`} onClick={finish}>
      <div className="nxg-dotgrid" aria-hidden="true" />

      <div className="nxg-ticker" onClick={(e) => e.stopPropagation()}>
        <span className="nxg-ticker-brand">▌ NEXUS / 1 ▌</span>
        <span className="nxg-ticker-item">CLOUD COMMAND CENTER</span>
        <span className="nxg-ticker-sep">◆</span>
        <span className="nxg-ticker-item">DEVOPS · SRE · PLATFORM</span>
        <span className="nxg-ticker-sep">◆</span>
        <span className="nxg-ticker-item">CA-CENTRAL-1</span>
        <span className="nxg-ticker-right">
          <span className="nxg-pulse" aria-hidden="true" />
          SYSTEMS ONLINE
        </span>
      </div>

      <div className="nxg-stage" onClick={(e) => e.stopPropagation()}>
        <div className="nxg-orb" aria-hidden="true">
          <div className="nxg-orb-r1" />
          <div className="nxg-orb-r2" />
          <div className="nxg-orb-r3" />
          <div className="nxg-orb-core">NS</div>
        </div>

        <h1 className="nxg-name">NITIN SARVESH</h1>
        <p className="nxg-title">Cloud Infrastructure · DevOps · Site Reliability</p>

        <div className="nxg-checks" aria-live="polite">
          {BOOT_SERVICES.slice(0, step).map((svc) => (
            <div key={svc.id} className="nxg-check">
              <span
                className="nxg-check-led"
                style={{ background: svc.color, boxShadow: `0 0 8px ${svc.color}` }}
              />
              <span className="nxg-check-label">{svc.label}</span>
              <span className="nxg-check-status" style={{ color: svc.color }}>{svc.status}</span>
            </div>
          ))}
          {step < BOOT_SERVICES.length && (
            <div className="nxg-check nxg-check-scanning">
              <span className="nxg-check-led nxg-led-blink" />
              <span className="nxg-check-label">SCANNING SERVICES...</span>
            </div>
          )}
        </div>

        <div className="nxg-prog-wrap">
          <div className="nxg-prog-row">
            <span>BOOT SEQUENCE</span>
            <span>{pct}%</span>
          </div>
          <div className="nxg-prog-rail">
            <div className="nxg-prog-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <button type="button" className="nxg-enter" onClick={finish}>
          <span className="nxg-enter-arrow">▶</span>
          ENTER COMMAND CENTER
        </button>

        <p className="nxg-hint">PRESS ENTER · SPACE · OR CLICK ANYWHERE TO SKIP</p>
      </div>
    </div>
  );
};

export default FrontGate;
