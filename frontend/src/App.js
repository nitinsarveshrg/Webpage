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
  const [scrollPct, setScrollPct] = useState(0);
  const [cursor, setCursor] = useState({ x: -300, y: -300 });
  const isLocked = gateStage !== 'done';

  useEffect(() => {
    document.body.style.overflow = isLocked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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
    if (isLocked) return undefined;
    const toHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      scrollToSectionById(hash, { behavior: 'auto' });
    };
    const timer = setTimeout(toHash, 0);
    window.addEventListener('hashchange', toHash);
    return () => { clearTimeout(timer); window.removeEventListener('hashchange', toHash); };
  }, [isLocked]);

  useEffect(() => {
    if (isLocked) return undefined;
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight);
      setScrollPct(Math.min(1, Math.max(0, pct)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLocked]);

  useEffect(() => {
    if (isLocked) return undefined;
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [isLocked]);

  return (
    <div className="nx-root">
      {/* Scroll progress */}
      <div
        className="nx-progress"
        style={{ '--pct': scrollPct }}
        aria-hidden="true"
      />
      {/* Cursor glow */}
      <div
        className="nx-cursor-glow"
        style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
        aria-hidden="true"
      />

      <CloudParticles />
      <Header />

      <main>
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
