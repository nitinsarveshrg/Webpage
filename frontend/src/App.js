import React, { useEffect, useState } from 'react';
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
import { Toaster } from './components/ui/toaster';
import { scrollToSectionById } from './lib/sectionScroll';

const Home = () => {
  const [showLaunchFx, setShowLaunchFx] = useState(true);

  useEffect(() => {
    const scrollToHashTarget = () => {
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
    const updatePointer = (event) => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--my', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', updatePointer);
    return () => window.removeEventListener('pointermove', updatePointer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowLaunchFx(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overhaul-root">
      <CloudParticles />
      <Header />
      <main className="portfolio-shell">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />

      {showLaunchFx && (
        <div className="launch-fx" aria-hidden="true">
          <div className="launch-fx-tag">MAX PACE · CLOUD PRECISION</div>
          <span className="launch-line line-1" />
          <span className="launch-line line-2" />
          <span className="launch-line line-3" />
          <span className="launch-line line-4" />
          <span className="launch-line line-5" />
        </div>
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
