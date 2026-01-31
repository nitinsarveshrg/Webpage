import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Terminal } from 'lucide-react';
import { portfolioData } from '../mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm border-b border-cyan-500/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
          >
            <Terminal size={24} />
            <span>&gt; {portfolioData.personal.name.split(' ')[0].toUpperCase()}</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-mono">
            <button
              onClick={() => scrollToSection('about')}
              className="text-zinc-300 hover:text-cyan-400 transition-colors text-sm"
            >
              &gt; about
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-zinc-300 hover:text-cyan-400 transition-colors text-sm"
            >
              &gt; skills
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-zinc-300 hover:text-cyan-400 transition-colors text-sm"
            >
              &gt; experience
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-zinc-300 hover:text-cyan-400 transition-colors text-sm"
            >
              &gt; projects
            </button>
            <button
              onClick={() => scrollToSection('certifications')}
              className="text-zinc-300 hover:text-cyan-400 transition-colors text-sm"
            >
              &gt; certs
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold border-2 border-cyan-400"
            >
              &gt; contact
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 font-mono">
            <button
              onClick={() => scrollToSection('about')}
              className="text-zinc-300 hover:text-cyan-400 transition-colors text-left text-sm"
            >
              &gt; about
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-zinc-300 hover:text-cyan-400 transition-colors text-left text-sm"
            >
              &gt; skills
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-zinc-300 hover:text-cyan-400 transition-colors text-left text-sm"
            >
              &gt; experience
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-zinc-300 hover:text-cyan-400 transition-colors text-left text-sm"
            >
              &gt; projects
            </button>
            <button
              onClick={() => scrollToSection('certifications')}
              className="text-zinc-300 hover:text-cyan-400 transition-colors text-left text-sm"
            >
              &gt; certs
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold w-full border-2 border-cyan-400"
            >
              &gt; contact
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
