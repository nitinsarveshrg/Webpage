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
  const [isRevealing, setIsRevealing] = useState(false);
  const shellRef = useRef(null);
  const isLocked = gateStage !== 'done';

  useEffect(() => {
    document.body.style.overflow = isLocked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);

  useEffect(() => {
    if (gateStage !== 'exit') return undefined;

    const timer = setTimeout(() => {
      setGateStage('done');
      const hash = window.location.hash.replace('#', '');
      if (hash) scrollToSectionById(hash, { behavior: 'auto' });
    }, 760);

    return () => clearTimeout(timer);
  }, [gateStage]);

  useEffect(() => {
    if (gateStage !== 'done') return undefined;

    setIsRevealing(true);
    const timer = setTimeout(() => setIsRevealing(false), 1200);
    return () => clearTimeout(timer);
  }, [gateStage]);

  useEffect(() => {
    if (isLocked) return undefined;

    const toHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      scrollToSectionById(hash, { behavior: 'auto' });
    };

    const timer = setTimeout(toHash, 0);
    window.addEventListener('hashchange', toHash);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', toHash);
    };
  }, [isLocked]);

  useEffect(() => {
    if (isLocked) return undefined;
    const shell = shellRef.current;
    if (!shell) return undefined;

    const sections = Array.from(shell.querySelectorAll('.nx-section'));
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('in-view', entry.isIntersecting);
        });
      },
      { threshold: 0.28, rootMargin: '-8% 0px -14% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      sections.forEach((section) => section.classList.remove('in-view'));
    };
  }, [isLocked]);

  useEffect(() => {
    if (isLocked) return undefined;
    const shell = shellRef.current;
    if (!shell) return undefined;

    let rafId = 0;

    const applyDepth = (x, y) => {
      shell.style.setProperty('--nx-mouse-x', x.toFixed(4));
      shell.style.setProperty('--nx-mouse-y', y.toFixed(4));
      rafId = 0;
    };

    let depthX = 0;
    let depthY = 0;

    const queue = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => applyDepth(depthX, depthY));
    };

    const onPointerMove = (event) => {
      depthX = event.clientX / Math.max(1, window.innerWidth) - 0.5;
      depthY = event.clientY / Math.max(1, window.innerHeight) - 0.5;
      queue();
    };

    const onPointerLeave = () => {
      depthX = 0;
      depthY = 0;
      queue();
    };

    shell.addEventListener('pointermove', onPointerMove, { passive: true });
    shell.addEventListener('pointerleave', onPointerLeave);

    onPointerLeave();

    return () => {
      shell.removeEventListener('pointermove', onPointerMove);
      shell.removeEventListener('pointerleave', onPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isLocked]);

  return (
    <div ref={shellRef} className="nx-root">
      <CloudParticles />
      <Header />

      <main className={`nx-shell ${isLocked ? 'nx-preload' : 'nx-live'} ${isRevealing ? 'nx-reveal' : ''}`}>
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
