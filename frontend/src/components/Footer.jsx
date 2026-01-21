import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { portfolioData } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {portfolioData.personal.name}
            </h3>
            <p className="text-zinc-400 text-sm">
              {portfolioData.personal.title}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('about')}
                className="text-zinc-400 hover:text-cyan-400 transition-colors text-left text-sm"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-zinc-400 hover:text-cyan-400 transition-colors text-left text-sm"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="text-zinc-400 hover:text-cyan-400 transition-colors text-left text-sm"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-zinc-400 hover:text-cyan-400 transition-colors text-left text-sm"
              >
                Projects
              </button>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500 transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500 transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500 transition-all"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-400 text-sm">
            © {currentYear} {portfolioData.personal.name}. All rights reserved.
          </p>
          <p className="text-zinc-400 text-sm flex items-center gap-1">
            Built with <Heart className="text-red-500" size={16} fill="currentColor" /> and React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
