import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Certifications from './components/Certifications';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CloudParticles from './components/CloudParticles';
import FrontGate from './components/FrontGate';
import { Toaster } from './components/ui/toaster';
import { scrollToSectionById } from './lib/sectionScroll';

const Home = () => {
  const [gateStage, setGateStage] = useState('show');
  const [isPortfolioRevealing, setIsPortfolioRevealing] = useState(false);
  const gateLocked = gateStage !== 'done';
  const gateLockedRef = useRef(gateLocked);
  const shellRef = useRef(null);

  useEffect(() => {
    gateLockedRef.current = gateLocked;
  }, [gateLocked]);

  useEffect(() => {
    document.body.style.overflow = gateStage !== 'done' ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [gateStage]);

  useEffect(() => {
    const scrollToHashTarget = () => {
      if (gateLockedRef.current) return;

      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      scrollToSectionById(hash, { behavior: 'auto' });
    };

    const timer = setTimeout(scrollToHashTarget, 0);
    window.addEventListener('hashchange', scrollToHashTarget);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHashTarget);
    };
  }, []);

  useEffect(() => {
    if (gateStage !== 'exit') return undefined;

    const timer = setTimeout(() => {
      setGateStage('done');

      const hash = window.location.hash.replace('#', '');
      if (hash) scrollToSectionById(hash, { behavior: 'auto' });
    }, 640);

    return () => clearTimeout(timer);
  }, [gateStage]);

  useEffect(() => {
    if (gateStage !== 'done') return undefined;

    setIsPortfolioRevealing(true);
    const timer = setTimeout(() => setIsPortfolioRevealing(false), 640);

    return () => clearTimeout(timer);
  }, [gateStage]);

  useEffect(() => {
    const updatePointer = (event) => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--my', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', updatePointer);
    return () => window.removeEventListener('pointermove', updatePointer);
  }, []);

  useEffect(() => {
    if (gateLocked) return undefined;

    const shell = shellRef.current;
    if (!shell) return undefined;

    const sections = Array.from(shell.querySelectorAll('.motion-section'));
    if (!sections.length) return undefined;

    const markVisibleSections = () => {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const inView = rect.top <= window.innerHeight * 0.82 && rect.bottom >= window.innerHeight * 0.22;
        section.classList.toggle('in-view', inView);
      });
    };

    markVisibleSections();
    shell.classList.add('motion-enabled');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('in-view', entry.isIntersecting);
        });
      },
      { threshold: 0.3, rootMargin: '-12% 0px -14% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      sections.forEach((section) => section.classList.remove('in-view'));
      shell.classList.remove('motion-enabled');
    };
  }, [gateLocked]);

  return (
    <div ref={shellRef} className="overhaul-root apple-display-shell">
      <CloudParticles />
      <Header />

      <main className={`portfolio-shell ${gateLocked ? 'portfolio-preload' : 'portfolio-live'} ${isPortfolioRevealing ? 'portfolio-reveal' : ''}`}>
        <Hero />
        <About />
        <Certifications />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />

      {gateStage !== 'done' && (
        <FrontGate
          exiting={gateStage === 'exit'}
          onEnter={() => setGateStage((prev) => (prev === 'show' ? 'exit' : prev))}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
