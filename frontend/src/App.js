import React, { useEffect } from 'react';
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

  return (
    <div className="overhaul-root">
      <CloudParticles />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
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
