import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Terminal } from 'lucide-react';
import { portfolioData } from '../mock';
import { scrollToSectionById } from '../lib/sectionScroll';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinkClass =
    'text-zinc-400 hover:text-cyan-300 transition-all duration-200 px-3 py-1 rounded-md border border-transparent hover:border-cyan-500/35 hover:bg-cyan-500/10';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (scrollToSectionById(sectionId)) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        isScrolled
          ? 'bg-black/78 backdrop-blur-xl border-b border-cyan-400/35 shadow-[0_8px_28px_rgba(8,145,178,0.2)]'
          : 'bg-black/58 backdrop-blur-md border-b border-cyan-500/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Name - Terminal Style */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors px-3 py-1 rounded-md border border-cyan-500/20 bg-cyan-500/5"
          >
            <Terminal size={16} />
            <span className="text-green-400">root@cloud-devops</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$</span>
          </button>

          {/* Desktop Navigation - Terminal Commands */}
          <nav className="hidden md:flex items-center gap-1 text-xs rounded-full border border-cyan-500/25 bg-zinc-950/65 px-2 py-1">
            <button
              onClick={() => scrollToSection('about')}
              className={navLinkClass}
            >
              ./about
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={() => scrollToSection('skills')}
              className={navLinkClass}
            >
              ./skills
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={() => scrollToSection('experience')}
              className={navLinkClass}
            >
              ./experience
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={() => scrollToSection('projects')}
              className={navLinkClass}
            >
              ./projects
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={() => scrollToSection('certifications')}
              className={navLinkClass}
            >
              ./certs
            </button>
            <span className="text-zinc-700 mx-2">|</span>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold border border-cyan-200 h-7 px-3 text-xs shadow-[0_0_16px_rgba(34,211,238,0.45)]"
            >
              &gt; contact
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-2 text-xs border-t border-cyan-500/30 pt-4">
            <button
              onClick={() => scrollToSection('about')}
              className="text-zinc-400 hover:text-cyan-400 transition-colors text-left"
            >
              $ ./about
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-zinc-400 hover:text-cyan-400 transition-colors text-left"
            >
              $ ./skills
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-zinc-400 hover:text-cyan-400 transition-colors text-left"
            >
              $ ./experience
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-zinc-400 hover:text-cyan-400 transition-colors text-left"
            >
              $ ./projects
            </button>
            <button
              onClick={() => scrollToSection('certifications')}
              className="text-zinc-400 hover:text-cyan-400 transition-colors text-left"
            >
              $ ./certs
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold w-full border-2 border-cyan-400 h-8 text-xs mt-2"
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
