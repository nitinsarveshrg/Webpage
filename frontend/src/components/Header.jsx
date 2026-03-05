import React, { useEffect, useMemo, useState } from 'react';
import { Menu, X, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { scrollToSectionById } from '../lib/sectionScroll';

const SECTION_IDS = ['hero', 'about', 'certifications', 'skills', 'experience', 'projects', 'contact'];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max, fixed = 2) => (Math.random() * (max - min) + min).toFixed(fixed);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const [telemetry, setTelemetry] = useState({
    ops: randomInt(210, 360),
    latency: randomInt(28, 58),
    uptime: randomFloat(99.91, 99.99, 2),
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTelemetry({
        ops: randomInt(210, 360),
        latency: randomInt(28, 58),
        uptime: randomFloat(99.91, 99.99, 2),
      });
    }, 1500);

    return () => window.clearInterval(id);
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
            selected = id;
            best = score;
          }
        });

        if (best > 0) setActiveSection(selected);
      },
      { threshold: [0.25, 0.45, 0.62], rootMargin: '-15% 0px -40% 0px' }
    );

    SECTION_IDS.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const jump = (sectionId) => {
    if (scrollToSectionById(sectionId)) {
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const navBtnClass = (sectionId) =>
    `pit-nav-link ${activeSection === sectionId ? 'pit-nav-link-active' : ''}`;

  const telemetryBars = useMemo(() => {
    return Array.from({ length: 14 }).map((_, index) => {
      const base = 28 + ((index * 11 + telemetry.ops + telemetry.latency) % 62);
      return Math.min(95, Math.max(12, base));
    });
  }, [telemetry.ops, telemetry.latency]);

  return (
    <header className={`pit-header apple-header ${isScrolled ? 'pit-header-scrolled' : ''}`}>
      <div className="pit-header-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="pit-header-inner">
        <button className="pit-brand" onClick={() => jump('hero')}>
          <span className="pit-brand-dot" />
          <span className="pit-brand-main">nitin://cloud-ops</span>
          <span className="pit-brand-sub">product runtime</span>
        </button>

        <nav className="pit-nav-desktop">
          <button className={navBtnClass('about')} onClick={() => jump('about')}>profile</button>
          <button className={navBtnClass('certifications')} onClick={() => jump('certifications')}>certs</button>
          <button className={navBtnClass('skills')} onClick={() => jump('skills')}>stack</button>
          <button className={navBtnClass('experience')} onClick={() => jump('experience')}>timeline</button>
          <button className={navBtnClass('projects')} onClick={() => jump('projects')}>builds</button>
          <Button className="pit-contact-btn" onClick={() => jump('contact')}>
            contact
          </Button>
        </nav>

        <div className="pit-top-command" aria-label="live portfolio telemetry">
          <Activity size={14} />
          <span className="pit-top-prompt">$ live --delivery</span>
          <div className="pit-top-bars" aria-hidden="true">
            {telemetryBars.map((height, index) => (
              <span key={`${height}-${index}`} style={{ height: `${height}%` }} />
            ))}
          </div>
          <span>OPS {telemetry.ops}</span>
          <span>P95 {telemetry.latency}ms</span>
          <span>SLA {telemetry.uptime}%</span>
        </div>

        <button className="pit-mobile-toggle" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="pit-mobile-panel">
          <button className={navBtnClass('about')} onClick={() => jump('about')}>profile</button>
          <button className={navBtnClass('certifications')} onClick={() => jump('certifications')}>certs</button>
          <button className={navBtnClass('skills')} onClick={() => jump('skills')}>stack</button>
          <button className={navBtnClass('experience')} onClick={() => jump('experience')}>timeline</button>
          <button className={navBtnClass('projects')} onClick={() => jump('projects')}>builds</button>
          <Button className="pit-contact-btn" onClick={() => jump('contact')}>contact</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
