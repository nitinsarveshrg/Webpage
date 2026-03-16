import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

const BOOT_LINES = [
  'Loading cloud profile ···········',
  'Verifying certifications ········',
  'Mounting infrastructure ·········',
  'Scanning deployment pipelines ···',
  'Establishing secure session ·····',
  'Operator profile loaded ·········',
];

const FrontGate = ({ exiting = false, onEnter }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((p) => {
        if (p >= BOOT_LINES.length) { clearInterval(interval); return p; }
        return p + 1;
      });
    }, 360);
    // Auto-dismiss after all lines finish + short pause
    const timeout = setTimeout(() => onEnter?.(), 2900);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [onEnter]);

  return (
    <motion.div
      className="opg-overlay"
      animate={exiting ? { y: '-100%' } : { y: 0 }}
      transition={
        exiting
          ? { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          : { duration: 0 }
      }
    >
      {/* Brand mark */}
      <motion.div
        className="opg-brand"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 0.86, 0.24, 1], delay: 0.1 }}
      >
        <div className="opg-icon">
          <Cloud size={28} strokeWidth={1.8} />
        </div>
        <div className="opg-brand-name">NITIN SARVESH RAAJAGOPAL</div>
        <div className="opg-brand-role">Cloud Infrastructure · DevOps · Site Reliability</div>
      </motion.div>

      {/* Boot terminal */}
      <motion.div
        className="opg-terminal"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 0.86, 0.24, 1], delay: 0.3 }}
      >
        {BOOT_LINES.slice(0, step).map((line, i) => (
          <div key={i} className="opg-line">
            <span className="opg-prompt">▸</span>
            <span>{line}</span>
            <span className="opg-status" style={{
              color: i === BOOT_LINES.length - 1 ? 'var(--green)' : 'var(--orange)',
            }}>
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
      </motion.div>

      {/* Loading bar */}
      <motion.div
        className="opg-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      />
    </motion.div>
  );
};

export default FrontGate;
