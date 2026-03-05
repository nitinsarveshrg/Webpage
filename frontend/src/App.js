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
    }, 520);

    return () => clearTimeout(timer);
  }, [gateStage]);

  useEffect(() => {
    if (gateStage !== 'done') return undefined;

    setIsPortfolioRevealing(true);
    const timer = setTimeout(() => setIsPortfolioRevealing(false), 680);

    return () => clearTimeout(timer);
  }, [gateStage]);

  useEffect(() => {
    if (gateLocked) return undefined;

    const shell = shellRef.current;
    if (!shell) return undefined;

    const sections = Array.from(shell.querySelectorAll('.mk-section'));
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('in-view', entry.isIntersecting);
        });
      },
      { threshold: 0.28, rootMargin: '-10% 0px -15% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      sections.forEach((section) => section.classList.remove('in-view'));
    };
  }, [gateLocked]);

  return (
    <div ref={shellRef} className="mk-shell-root">
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
