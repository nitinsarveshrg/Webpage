import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CloudParticles from './components/CloudParticles';
import FrontGate from './components/FrontGate';
import { Toaster } from './components/ui/toaster';
import { scrollToSectionById } from './lib/sectionScroll';

const Home = () => {
  const [gateStage, setGateStage] = useState('show');
  const gateLocked = gateStage === 'show';
  const gateLockedRef = useRef(gateLocked);

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
    }, 920);

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

  return (
    <div className="overhaul-root">
      <CloudParticles />
      <Header />

      <main className={`portfolio-shell ${gateLocked ? 'portfolio-preload' : 'portfolio-live'}`}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
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
