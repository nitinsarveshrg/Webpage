import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Menu, X, Sun, Moon } from 'lucide-react';
import { scrollToSectionById } from '../lib/sectionScroll';
import { useTheme } from '../hooks/useTheme';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'off-shift', label: 'Off Shift' },
  { id: 'contact', label: 'Contact' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => { scrollToSectionById(id); setMobileOpen(false); };

  return (
    <motion.header
      className={`hdr-bar${scrolled ? ' scrolled' : ''}`}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 0.86, 0.24, 1], delay: 0.1 }}
    >
      <div className="hdr-inner">
        <button className="hdr-brand" onClick={() => go('hero')}>
          <div className="hdr-logo">
            <Cloud size={16} strokeWidth={2.2} />
          </div>
          <span className="hdr-name">Nitin Sarvesh Raajagopal</span>
        </button>

        <nav className="hdr-nav" aria-label="Primary navigation">
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(e) => { e.preventDefault(); go(item.id); }}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="hdr-theme-toggle"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
        </button>

        <button className="hdr-cta" onClick={() => go('contact')}>
          Hire Me
        </button>

        <button
          className="hdr-menu"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute', top: '60px', left: 0, right: 0,
            background: theme === 'dark' ? 'rgba(0,0,0,0.95)' : 'rgba(245,245,245,0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--bdr)', padding: '1rem',
            display: 'flex', flexDirection: 'column', gap: '0.25rem',
          }}
        >
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              style={{
                textAlign: 'left', padding: '0.75rem 1rem',
                fontSize: '0.925rem', color: 'var(--text-2)',
                borderRadius: '6px',
              }}
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
