import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

const FrontGate = ({ exiting = false, onEnter }) => {
  // Auto-dismiss at 2.2 s
  useEffect(() => {
    const t = setTimeout(() => onEnter?.(), 2200);
    return () => clearTimeout(t);
  }, [onEnter]);

  return (
    <motion.div
      className="opg-overlay"
      animate={exiting ? { y: '-100%' } : { y: 0 }}
      transition={exiting ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] } : { duration: 0 }}
    >
      <div className="opg-content">

        {/* Icon with pulse rings */}
        <motion.div
          className="opg-icon-wrap"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 0.86, 0.24, 1], delay: 0.1 }}
        >
          <div className="opg-ring opg-ring--1" />
          <div className="opg-ring opg-ring--2" />
          <div className="opg-icon-box">
            <Cloud size={28} strokeWidth={1.6} />
          </div>
        </motion.div>

        {/* Role label */}
        <motion.div
          className="opg-label"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Cloud &amp; DevOps Engineer · Toronto
        </motion.div>

      </div>

      {/* Progress bar */}
      <motion.div
        className="opg-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.0, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      />
    </motion.div>
  );
};

export default FrontGate;
