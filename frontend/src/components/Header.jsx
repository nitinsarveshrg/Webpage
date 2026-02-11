import React, { useEffect, useMemo, useState } from 'react';
import { Menu, X, Activity, Flag, Gauge } from 'lucide-react';
import { Button } from './ui/button';
import { scrollToSectionById } from '../lib/sectionScroll';

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

const randomDelta = () => {
  const value = randomFloat(0.01, 0.89);
  return Math.random() > 0.5 ? `+${value}` : `-${value}`;
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [topMetrics, setTopMetrics] = useState({
    cpu: randomInt(18, 71),
    mem: randomInt(34, 78),
    load: randomFloat(0.48, 1.92),
  });
  const [raceState, setRaceState] = useState({
    lap: randomInt(4, 19),
    sector: randomInt(1, 3),
    delta: randomDelta(),
    speed: randomInt(286, 336),
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
      setTopMetrics({
        cpu: randomInt(18, 71),
        mem: randomInt(34, 78),
        load: randomFloat(0.48, 1.92),
      });

      setRaceState((prev) => ({
        lap: prev.lap >= 58 ? 1 : prev.lap + 1,
        sector: prev.sector === 3 ? 1 : prev.sector + 1,
        delta: randomDelta(),
        speed: randomInt(286, 336),
      }));
    }, 1400);

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
      const base = 30 + ((index * 11 + topMetrics.cpu + raceState.sector * 7) % 62);
      return Math.min(95, Math.max(12, base));
    });
  }, [topMetrics.cpu, raceState.sector]);

  return (
    <header className={`pit-header ${isScrolled ? 'pit-header-scrolled' : ''}`}>
      <div className="pit-header-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="pit-race-rail" aria-hidden="true">
        <span className="pit-race-pill"><Flag size={12} /> pit wall live</span>
        <span className="pit-race-meta">LAP {raceState.lap}/58 · S{raceState.sector} · DELTA {raceState.delta}</span>
        <span className="pit-race-speed"><Gauge size={12} /> {raceState.speed} km/h</span>
      </div>

      <div className="pit-header-inner">
        <button className="pit-brand" onClick={() => jump('hero')}>
          <span className="pit-brand-dot" />
          <span className="pit-brand-main">nitin://race-ops</span>
          <span className="pit-brand-sub">cloud-devops</span>
        </button>

        <nav className="pit-nav-desktop">
          <button className={navBtnClass('about')} onClick={() => jump('about')}>profile</button>
          <button className={navBtnClass('skills')} onClick={() => jump('skills')}>stack</button>
          <button className={navBtnClass('projects')} onClick={() => jump('projects')}>builds</button>
          <button className={navBtnClass('experience')} onClick={() => jump('experience')}>timeline</button>
          <button className={navBtnClass('certifications')} onClick={() => jump('certifications')}>certs</button>
          <Button className="pit-contact-btn" onClick={() => jump('contact')}>
            contact
          </Button>
        </nav>

        <div className="pit-top-command" aria-label="top command telemetry">
          <Activity size={14} />
          <span className="pit-top-prompt">$ telemetry --race</span>
          <div className="pit-top-bars" aria-hidden="true">
            {telemetryBars.map((height, index) => (
              <span key={`${height}-${index}`} style={{ height: `${height}%` }} />
            ))}
          </div>
          <span>CPU {topMetrics.cpu}%</span>
          <span>MEM {topMetrics.mem}%</span>
          <span>LOAD {topMetrics.load}</span>
        </div>

        <button className="pit-mobile-toggle" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="pit-mobile-panel">
          <button className={navBtnClass('about')} onClick={() => jump('about')}>profile</button>
          <button className={navBtnClass('skills')} onClick={() => jump('skills')}>stack</button>
          <button className={navBtnClass('projects')} onClick={() => jump('projects')}>builds</button>
          <button className={navBtnClass('experience')} onClick={() => jump('experience')}>timeline</button>
          <button className={navBtnClass('certifications')} onClick={() => jump('certifications')}>certs</button>
          <Button className="pit-contact-btn" onClick={() => jump('contact')}>contact</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
