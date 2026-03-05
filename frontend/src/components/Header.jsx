import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { scrollToSectionById } from '../lib/sectionScroll';

const SECTION_IDS = ['hero', 'about', 'certifications', 'skills', 'experience', 'projects', 'contact'];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(100, (window.scrollY / maxScroll) * 100));
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let selected = 'hero';
        let best = 0;

        SECTION_IDS.forEach((id) => {
          const score = ratios.get(id) || 0;
          if (score >= best) {
            best = score;
            selected = id;
          }
        });

        if (best > 0) setActiveSection(selected);
      },
      { threshold: [0.25, 0.45, 0.62], rootMargin: '-16% 0px -40% 0px' }
    );

    SECTION_IDS.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const jump = (id) => {
    if (scrollToSectionById(id)) {
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const navClass = (id) => `mk-nav-btn ${activeSection === id ? 'active' : ''}`;

  return (
    <header className={`mk-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="mk-header-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="mk-header-shell">
        <button className="mk-brand" onClick={() => jump('hero')}>
          <span className="mk-brand-dot" />
          <span className="mk-brand-main">Nitin Sarvesh</span>
          <span className="mk-brand-sub">Cloud DevOps Engineer</span>
        </button>

        <nav className="mk-nav-desktop">
          <button className={navClass('about')} onClick={() => jump('about')}>Profile</button>
          <button className={navClass('certifications')} onClick={() => jump('certifications')}>Credentials</button>
          <button className={navClass('skills')} onClick={() => jump('skills')}>Skills</button>
          <button className={navClass('experience')} onClick={() => jump('experience')}>Timeline</button>
          <button className={navClass('projects')} onClick={() => jump('projects')}>Projects</button>
        </nav>

        <button className="mk-contact-btn" onClick={() => jump('contact')}>Contact</button>

        <button className="mk-mobile-toggle" onClick={() => setIsMobileMenuOpen((v) => !v)}>
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mk-mobile-panel">
          <button className={navClass('about')} onClick={() => jump('about')}>Profile</button>
          <button className={navClass('certifications')} onClick={() => jump('certifications')}>Credentials</button>
          <button className={navClass('skills')} onClick={() => jump('skills')}>Skills</button>
          <button className={navClass('experience')} onClick={() => jump('experience')}>Timeline</button>
          <button className={navClass('projects')} onClick={() => jump('projects')}>Projects</button>
          <button className="mk-contact-btn" onClick={() => jump('contact')}>Contact</button>
        </div>
      )}
    </header>
  );
};

export default Header;
