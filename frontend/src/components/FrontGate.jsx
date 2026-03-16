import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BOOT_LINES = [
  'Loading cloud profile ···········',
  'Verifying certifications ········',
  'Mounting infrastructure ·········',
  'Scanning deployment pipelines ···',
  'Establishing secure session ·····',
  'Operator profile loaded ·········',
];

const line = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.16, 0.86, 0.24, 1], delay },
});

const FrontGate = ({ exiting = false, onEnter }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((p) => {
        if (p >= BOOT_LINES.length) { clearInterval(interval); return p; }
        return p + 1;
      });
    }, 340);
    const timeout = setTimeout(() => onEnter?.(), 3000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [onEnter]);

  return (
    <motion.div
      className="opg-overlay"
      animate={exiting ? { y: '-100%' } : { y: 0 }}
      transition={exiting ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] } : { duration: 0 }}
    >
      {/* Ambient glow — mirrors the hero */}
      <motion.div
        className="opg-glow"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        aria-hidden="true"
      />

      <div className="opg-content">
        {/* Large name block */}
        <div className="opg-name-block" aria-label="Nitin Sarvesh Raajagopal">
          <motion.div className="opg-n1" {...line(0.15)}>NITIN</motion.div>
          <motion.div className="opg-n2" {...line(0.30)}>SARVESH</motion.div>
          <motion.div className="opg-n3" {...line(0.45)}>RAAJAGOPAL</motion.div>
        </div>

        {/* Role */}
        <motion.div className="opg-role" {...line(0.60)}>
          Cloud Infrastructure · DevOps · Site Reliability
        </motion.div>

        {/* Terminal */}
        <motion.div
          className="opg-terminal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          {BOOT_LINES.slice(0, step).map((ln, i) => (
            <div key={i} className="opg-line">
              <span className="opg-prompt">▸</span>
              <span>{ln}</span>
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
      </div>

      {/* Progress bar */}
      <motion.div
        className="opg-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      />
    </motion.div>
  );
};

export default FrontGate;
