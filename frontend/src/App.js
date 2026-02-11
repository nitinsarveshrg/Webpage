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
import LiveControlPanel from './components/LiveControlPanel';
import OpeningGate from './components/OpeningGate';
import { Toaster } from './components/ui/toaster';
import { scrollToSectionById } from './lib/sectionScroll';

const Home = () => {
  const [introStage, setIntroStage] = useState('show');
  const introLocked = introStage !== 'done';
  const introLockedRef = useRef(introLocked);

  useEffect(() => {
    introLockedRef.current = introLocked;
  }, [introLocked]);

  useEffect(() => {
    document.body.style.overflow = introLocked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [introLocked]);

  useEffect(() => {
    const scrollToHashTarget = () => {
      if (introLockedRef.current) return;

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
    if (introStage !== 'exit') return undefined;

    const timer = setTimeout(() => {
      setIntroStage('done');

      const hash = window.location.hash.replace('#', '');
      if (hash) scrollToSectionById(hash, { behavior: 'auto' });
    }, 900);

    return () => clearTimeout(timer);
  }, [introStage]);

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
      <main className={`portfolio-shell ${introLocked ? 'portfolio-preload' : 'portfolio-live'}`}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <LiveControlPanel />

      {introStage !== 'done' && (
        <OpeningGate
          exiting={introStage === 'exit'}
          onComplete={() => setIntroStage((prev) => (prev === 'show' ? 'exit' : prev))}
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
