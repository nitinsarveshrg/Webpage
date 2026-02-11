import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Activity } from 'lucide-react';
import { scrollToSectionById } from '../lib/sectionScroll';

const randomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createMonitorSnapshot = () => ({
  cpu: randomInt(22, 67),
  memory: randomInt(46, 82),
  load: randomFloat(0.42, 1.58),
});

const SECTION_IDS = ['hero', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact'];
const SECTION_MODE = {
  hero: 'BOOT',
  about: 'PROFILE',
  skills: 'MATRIX',
  experience: 'OPS_LOG',
  projects: 'BUILDS',
  certifications: 'CERTS',
  contact: 'CHANNEL',
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [monitor, setMonitor] = useState(createMonitorSnapshot);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinkClass = (isActive) =>
    `topnav-link ${isActive ? 'topnav-link-active' : 'topnav-link-idle'}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 42);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setMonitor(createMonitorSnapshot());
    }, 1700);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const sectionRatios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let nextSection = 'hero';
        let maxRatio = 0;
        SECTION_IDS.forEach((sectionId) => {
          const ratio = sectionRatios.get(sectionId) || 0;
          if (ratio >= maxRatio) {
            maxRatio = ratio;
            nextSection = sectionId;
          }
        });

        if (maxRatio > 0) {
          setActiveSection((previous) => (previous === nextSection ? previous : nextSection));
        }
      },
      {
        threshold: [0.2, 0.4, 0.58, 0.75],
        rootMargin: '-16% 0px -44% 0px',
      }
    );

    SECTION_IDS.forEach((sectionId) => {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) observer.observe(sectionElement);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    if (scrollToSectionById(sectionId)) {
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'topnav-shell topnav-shell-scrolled' : 'topnav-shell'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => scrollToSection('hero')} className="brand-pod">
            <span className="brand-dot" />
            <span className="brand-title">nitin@trackside</span>
            <span className="brand-sub">linux-cloud-ops</span>
          </button>

          <nav className="hidden md:flex items-center gap-1 topnav-links-wrap">
            <button onClick={() => scrollToSection('about')} className={navLinkClass(activeSection === 'about')}>./about</button>
            <button onClick={() => scrollToSection('skills')} className={navLinkClass(activeSection === 'skills')}>./skills</button>
            <button onClick={() => scrollToSection('experience')} className={navLinkClass(activeSection === 'experience')}>./experience</button>
            <button onClick={() => scrollToSection('projects')} className={navLinkClass(activeSection === 'projects')}>./projects</button>
            <button onClick={() => scrollToSection('certifications')} className={navLinkClass(activeSection === 'certifications')}>./certs</button>
            <Button onClick={() => scrollToSection('contact')} className="topnav-cta">
              ./contact
            </Button>
          </nav>

          <div className="hidden lg:flex items-center gap-2 topnav-live">
            <Activity size={14} className="text-emerald-400" />
            <span className="topnav-prompt">$</span>
            <span className="topnav-mode">top -d 1</span>
            <span className="topnav-metric">MODE {SECTION_MODE[activeSection]}</span>
            <span className="topnav-metric">CPU {monitor.cpu}%</span>
            <span className="topnav-metric">MEM {monitor.memory}%</span>
            <span className="topnav-metric">LOAD {monitor.load}</span>
          </div>

          <button className="md:hidden text-zinc-200" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-3 flex flex-col gap-2 border-t border-white/15 pt-4">
            <button onClick={() => scrollToSection('about')} className="topnav-mobile-link">./about</button>
            <button onClick={() => scrollToSection('skills')} className="topnav-mobile-link">./skills</button>
            <button onClick={() => scrollToSection('experience')} className="topnav-mobile-link">./experience</button>
            <button onClick={() => scrollToSection('projects')} className="topnav-mobile-link">./projects</button>
            <button onClick={() => scrollToSection('certifications')} className="topnav-mobile-link">./certifications</button>
            <Button onClick={() => scrollToSection('contact')} className="topnav-mobile-cta">./contact</Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
