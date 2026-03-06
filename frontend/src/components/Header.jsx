import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { scrollToSectionById } from '../lib/sectionScroll';

const sections = [
  { id: 'hero', label: 'Start' },
  { id: 'about', label: 'Whoami' },
  { id: 'certifications', label: 'Creds' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Timeline' },
  { id: 'projects', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

const Header = () => {
  const [active, setActive] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.44, rootMargin: '-18% 0px -38% 0px' }
    );

    sections.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    scrollToSectionById(id);
    setActive(id);
    setMobileOpen(false);
  };

  return (
    <header className={`nx-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nx-header-inner">
        <button className="nx-header-brand" onClick={() => go('hero')}>
          <span className="dot" />
          <span className="name">Nitin Sarvesh</span>
          <span className="role">Cloud DevOps Engineer</span>
        </button>

        <nav className="nx-header-nav" aria-label="Primary navigation">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nx-nav-item ${active === section.id ? 'active' : ''}`}
              onClick={() => go(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <button className="nx-header-cta" onClick={() => go('contact')}>
          Hire / Connect
        </button>

        <button
          className="nx-mobile-toggle"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="nx-mobile-nav">
          {sections.map((section) => (
            <button key={section.id} onClick={() => go(section.id)}>
              {section.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
