import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const HOBBIES = [
  {
    icon: '🏸',
    title: 'Badminton',
    desc: 'Court is my reset button — fast reflexes, zero cloud alerts.',
    backIcon: '🤫',
    confession: 'I narrate my smashes like an F1 commentator. "AND IT\'S LIGHTS OUT AND AWAY HE SMASHES!"',
  },
  {
    icon: '🎵',
    title: 'Music',
    desc: 'Playlists for every deploy: calm builds, hype releases.',
    backIcon: '🎧',
    confession: 'I have a "prod is down" panic playlist. It absolutely slaps.',
  },
  {
    icon: '🥾',
    title: 'Hiking',
    desc: 'Best debugging happens on trails with no Wi-Fi.',
    backIcon: '🌲',
    confession: "I've solved more Kubernetes issues mid-trail than at a desk. Mountains > monitors.",
  },
  {
    icon: '🏎️',
    title: 'Formula 1',
    desc: 'Watching precision engineering at 300 km/h — pure obsession.',
    backIcon: '🏆',
    confession: 'My infra runbooks are literally named after F1 circuits. Yes, "Monaco" is the tricky one.',
  },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 56, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, ease: [0.16, 0.86, 0.24, 1], delay },
});

const TERMINAL_TEXT = '> personal.log — decrypted ✓';

const TerminalLine = () => {
  const [text, setText] = useState('');
  const entered = useRef(false);

  const handleEnter = () => {
    if (entered.current) return;
    entered.current = true;
    let i = 0;
    const tick = setInterval(() => {
      setText(TERMINAL_TEXT.slice(0, ++i));
      if (i >= TERMINAL_TEXT.length) clearInterval(tick);
    }, 42);
  };

  return (
    <motion.div
      className="os-terminal-line"
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      onViewportEnter={handleEnter}
    >
      <span className="os-terminal-text">{text}</span>
      <span className="os-cursor" aria-hidden="true">▌</span>
    </motion.div>
  );
};

const HobbyCard = ({ h, delay, index }) => {
  const [flipped, setFlipped] = useState(false);
  const peeked = useRef(false);

  const handleViewportEnter = () => {
    if (peeked.current) return;
    peeked.current = true;
    const wait = (delay + 0.95 + index * 0.18) * 1000;
    setTimeout(() => {
      setFlipped(true);
      setTimeout(() => setFlipped(false), 1800);
    }, wait);
  };

  return (
    <motion.div
      className="os-card-wrap"
      {...inView(delay)}
      onViewportEnter={handleViewportEnter}
      onClick={() => setFlipped((v) => !v)}
    >
      <div className={`os-card-inner${flipped ? ' os-flipped' : ''}`}>
        {/* Front */}
        <div className="os-card os-card-front">
          <div className="os-scan" aria-hidden="true" />
          <span className="os-icon" aria-hidden="true">{h.icon}</span>
          <h3 className="os-title">{h.title}</h3>
          <p className="os-desc">{h.desc}</p>
          <span className="os-flip-hint">$ ./flip --reveal</span>
        </div>
        {/* Back */}
        <div className="os-card os-card-back">
          <span className="os-icon" aria-hidden="true">{h.backIcon}</span>
          <p className="os-confession">"{h.confession}"</p>
          <span className="os-flip-hint">$ ./flip --back</span>
        </div>
      </div>
    </motion.div>
  );
};

const OffShift = () => (
  <section id="off-shift" className="nx-section off-shift-section">
    <div className="section-anchor" aria-hidden="true" />
    <div className="content-wrap">

      <motion.div {...inView(0)}>
        <div className="section-label">Off Shift</div>
        <h2 className="section-heading">
          When I'm not <em>on call.</em>
        </h2>
        <TerminalLine />
      </motion.div>

      <div className="os-grid">
        {HOBBIES.map((h, i) => (
          <HobbyCard key={h.title} h={h} delay={0.12 + i * 0.1} index={i} />
        ))}
      </div>

    </div>
  </section>
);

export default OffShift;
