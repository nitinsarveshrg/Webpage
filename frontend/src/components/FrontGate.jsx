import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

const FULL_NAME = 'NITIN SARVESH RAAJAGOPAL';
const BOOT_LINES = [
  'Loading cloud profile ···········',
  'Verifying certifications ········',
  'Mounting infrastructure ·········',
  'Scanning deployment pipelines ···',
  'Establishing secure session ·····',
  'Operator profile loaded ·········',
];

const FrontGate = ({ exiting = false, onEnter }) => {
  const [typed, setTyped]   = useState('');
  const [step,  setStep]    = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Typewriter — one letter every 65 ms
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(FULL_NAME.slice(0, i));
      if (i >= FULL_NAME.length) {
        clearInterval(t);
        // Hide cursor shortly after typing finishes
        setTimeout(() => setShowCursor(false), 500);
      }
    }, 65);
    return () => clearInterval(t);
  }, []);

  // Boot lines — start after 1.6 s (typewriter is done ~1.5 s)
  useEffect(() => {
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setStep((p) => {
          if (p >= BOOT_LINES.length) { clearInterval(interval); return p; }
          return p + 1;
        });
      }, 300);
      return () => clearInterval(interval);
    }, 1600);
    return () => clearTimeout(start);
  }, []);

  // Auto-dismiss
  useEffect(() => {
    const t = setTimeout(() => onEnter?.(), 3400);
    return () => clearTimeout(t);
  }, [onEnter]);

  return (
    <motion.div
      className="opg-overlay"
      animate={exiting ? { y: '-100%' } : { y: 0 }}
      transition={exiting ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] } : { duration: 0 }}
    >
      <div className="opg-content">

        {/* Icon */}
        <motion.div
          className="opg-icon-wrap"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 0.86, 0.24, 1], delay: 0.1 }}
        >
          <div className="opg-ring opg-ring--1" />
          <div className="opg-ring opg-ring--2" />
          <div className="opg-icon-box">
            <Cloud size={26} strokeWidth={1.8} />
          </div>
        </motion.div>

        {/* Typewriter name */}
        <motion.div
          className="opg-typewriter-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.35 }}
        >
          <span className="opg-typed">{typed}</span>
          {showCursor && <span className="opg-type-cursor" />}
        </motion.div>

        {/* Role */}
        <motion.div
          className="opg-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: typed.length >= FULL_NAME.length ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          Cloud &amp; DevOps Engineer · Toronto
        </motion.div>

        {/* Boot terminal */}
        {step > 0 && (
          <motion.div
            className="opg-terminal"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
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
        )}

      </div>

      {/* Progress bar */}
      <motion.div
        className="opg-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 3.1, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
      />
    </motion.div>
  );
};

export default FrontGate;
