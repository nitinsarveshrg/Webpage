import React from 'react';
import { Github, Linkedin, Mail, Terminal, Code } from 'lucide-react';
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
    <footer className="bg-black border-t border-cyan-500/30 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="text-cyan-400" size={24} />
              <h3 className="text-xl font-bold text-cyan-400 font-mono">
                &gt; {portfolioData.personal.name.split(' ')[0].toUpperCase()}
              </h3>
            </div>
            <p className="text-zinc-400 text-sm font-mono">
              [ {portfolioData.personal.title} ]
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-cyan-400 font-semibold mb-4 font-mono">&gt; QUICK_LINKS</h4>
            <nav className="flex flex-col gap-2 font-mono">
              <button
                onClick={() => scrollToSection('about')}
                className="text-zinc-400 hover:text-cyan-400 transition-colors text-left text-sm"
              >
                &gt; about
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-zinc-400 hover:text-cyan-400 transition-colors text-left text-sm"
              >
                &gt; skills
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="text-zinc-400 hover:text-cyan-400 transition-colors text-left text-sm"
              >
                &gt; experience
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-zinc-400 hover:text-cyan-400 transition-colors text-left text-sm"
              >
                &gt; projects
              </button>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-cyan-400 font-semibold mb-4 font-mono">&gt; CONNECT</h4>
            <div className="flex gap-4">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500 transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500 transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500 transition-all"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-400 text-sm font-mono">
            © {currentYear} {portfolioData.personal.name} // ALL_RIGHTS_RESERVED
          </p>
          <p className="text-zinc-400 text-sm flex items-center gap-2 font-mono">
            <Code className="text-cyan-400" size={16} />
            <span>Built with React + FastAPI</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
