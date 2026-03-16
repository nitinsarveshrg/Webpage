import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

const FrontGate = ({ exiting = false, onEnter }) => {
  // Auto-trigger after 1.4 s — no user interaction needed
  useEffect(() => {
    const t = setTimeout(() => onEnter?.(), 1400);
    return () => clearTimeout(t);
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
      {/* Center brand mark */}
      <motion.div
        className="opg-brand"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 0.86, 0.24, 1], delay: 0.1 }}
      >
        <div className="opg-icon">
          <Cloud size={32} strokeWidth={1.8} />
        </div>
        <div className="opg-brand-name">Nitin Sarvesh Raajagopal</div>
        <div className="opg-brand-role">Cloud · DevOps · SRE</div>
      </motion.div>

      {/* Loading bar at the bottom */}
      <motion.div
        className="opg-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
      />
    </motion.div>
  );
};

export default FrontGate;
