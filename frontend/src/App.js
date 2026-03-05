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

  useEffect(() => {
    if (gateLocked) return undefined;
    const shell = shellRef.current;
    if (!shell) return undefined;

    let rafId = 0;

    const updateScrollDepth = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, window.scrollY / maxScroll);
      shell.style.setProperty('--mk-scroll-ratio', ratio.toFixed(4));
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateScrollDepth);
    };

    updateScrollDepth();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [gateLocked]);

  useEffect(() => {
    if (gateLocked) return undefined;
    const shell = shellRef.current;
    if (!shell) return undefined;

    let rafId = 0;
    let depthX = 0;
    let depthY = 0;

    const applyDepth = () => {
      shell.style.setProperty('--mk-mouse-x', depthX.toFixed(4));
      shell.style.setProperty('--mk-mouse-y', depthY.toFixed(4));
      rafId = 0;
    };

    const queueApply = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(applyDepth);
    };

    const onPointerMove = (event) => {
      const x = event.clientX / Math.max(1, window.innerWidth);
      const y = event.clientY / Math.max(1, window.innerHeight);
      depthX = (x - 0.5) * 2;
      depthY = (y - 0.5) * 2;
      queueApply();
    };

    const onPointerLeave = () => {
      depthX = 0;
      depthY = 0;
      queueApply();
    };

    shell.addEventListener('pointermove', onPointerMove, { passive: true });
    shell.addEventListener('pointerleave', onPointerLeave);
    onPointerLeave();

    return () => {
      shell.removeEventListener('pointermove', onPointerMove);
      shell.removeEventListener('pointerleave', onPointerLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
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
