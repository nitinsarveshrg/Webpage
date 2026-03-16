import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const BOOT_LINES = [
  'Loading cloud profile ···········',
  'Verifying certifications ········',
  'Mounting infrastructure ·········',
  'Scanning deployment pipelines ···',
  'Establishing secure session ·····',
  'Operator NSR profile loaded ·····',
];

const FrontGate = ({ exiting = false, onEnter }) => {
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const finish = useCallback(() => { if (onEnter) onEnter(); }, [onEnter]);

  useEffect(() => {
    const st = window.setInterval(() => {
      setStep((p) => {
        if (p >= BOOT_LINES.length) { window.clearInterval(st); setReady(true); return p; }
        return p + 1;
      });
    }, 420);
    const at = window.setTimeout(finish, 4800);
    return () => { window.clearInterval(st); window.clearTimeout(at); };
  }, [finish]);

  useEffect(() => {
    const k = (e) => { if (['Enter', 'Escape', ' '].includes(e.key)) finish(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [finish]);

  return (
    <div
      className={`opg-overlay${exiting ? ' exiting' : ''}`}
      onClick={finish}
      role="button"
      tabIndex={0}
      aria-label="Enter portfolio"
    >
      <motion.div
        className="opg-inner"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 0.86, 0.24, 1] }}
      >
        <div className="opg-logo">NS</div>

        <div>
          <div className="opg-name">NITIN SARVESH RAAJAGOPAL</div>
          <div className="opg-sub" style={{ marginTop: '0.4rem' }}>
            Cloud Infrastructure · DevOps · Site Reliability
          </div>
        </div>

        <div className="opg-terminal">
          {BOOT_LINES.slice(0, step).map((line, i) => (
            <div key={i} className="opg-line">
              <span className="opg-prompt">▸</span>
              <span>{line}</span>
              <span style={{ marginLeft: 'auto', color: i === BOOT_LINES.length - 1 ? 'var(--green)' : 'var(--orange)', fontSize: '0.65rem' }}>
                {i === BOOT_LINES.length - 1 ? 'READY' : 'OK'}
              </span>
            </div>
          ))}
          {step < BOOT_LINES.length && (
            <div className="opg-line">
              <span className="opg-prompt">▸</span>
              <span className="opg-cursor" />
            </div>
          )}
        </div>

        <button className="opg-btn" onClick={finish}>
          Enter Portfolio <ArrowRight size={16} />
        </button>

        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.60rem', color: 'var(--text-3)', letterSpacing: '0.12em' }}>
          PRESS ENTER OR CLICK ANYWHERE TO SKIP
        </div>
      </motion.div>
    </div>
  );
};

export default FrontGate;
