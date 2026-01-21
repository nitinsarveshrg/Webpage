import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
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
        isScrolled ? 'bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <button
            onClick={() => scrollToSection('hero')}
            className="text-xl font-bold text-white hover:text-cyan-400 transition-colors"
          >
            {portfolioData.personal.name.split(' ')[0]}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('certifications')}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Certifications
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              Contact
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('about')}
              className="text-zinc-300 hover:text-white transition-colors text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-zinc-300 hover:text-white transition-colors text-left"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-zinc-300 hover:text-white transition-colors text-left"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-zinc-300 hover:text-white transition-colors text-left"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('certifications')}
              className="text-zinc-300 hover:text-white transition-colors text-left"
            >
              Certifications
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white w-full"
            >
              Contact
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
