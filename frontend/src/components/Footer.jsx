import React from 'react';
import { Github, Linkedin, Mail, Cloud } from 'lucide-react';
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
    <footer className="bg-slate-950 border-t-2 border-blue-500/30 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cloud className="text-blue-400" size={24} />
              <h3 className="text-xl font-bold text-white">
                {portfolioData.personal.name}
              </h3>
            </div>
            <p className="text-slate-400 text-sm">
              {portfolioData.personal.title}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('about')}
                className="text-slate-400 hover:text-blue-400 transition-colors text-left text-sm"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-slate-400 hover:text-blue-400 transition-colors text-left text-sm"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="text-slate-400 hover:text-blue-400 transition-colors text-left text-sm"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-slate-400 hover:text-blue-400 transition-colors text-left text-sm"
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
                className="w-10 h-10 bg-blue-500/10 border-2 border-blue-500/30 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/60 transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-500/10 border-2 border-blue-500/30 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/60 transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="w-10 h-10 bg-blue-500/10 border-2 border-blue-500/30 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/60 transition-all"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            © {currentYear} {portfolioData.personal.name}. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <Cloud className="text-blue-400" size={16} />
            <span>Built with React + FastAPI</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
