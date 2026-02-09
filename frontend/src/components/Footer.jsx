import React from 'react';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';
import TerminalCommand from './TerminalCommand';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector('header');
      const headerOffset = (header ? header.getBoundingClientRect().height : 80) + 16;
      const y = element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="snap-start py-12 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-cyan-400 text-sm ml-4 font-mono">root@cloud-devops: ~/footer</span>
          </div>
        </div>

        <div className="terminal-body terminal-overlay">
          <div className="grid md:grid-cols-3 gap-8 mb-8 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-3 text-cyan-400 font-mono">
                <Terminal size={18} />
                <span>{portfolioData.personal.name}</span>
              </div>
              <p className="text-zinc-400 text-sm font-mono">{portfolioData.personal.title}</p>
            </div>

            <div>
              <h4 className="text-cyan-400 font-mono text-sm mb-3">$ ls sections/</h4>
              <nav className="flex flex-col gap-2">
                <button onClick={() => scrollToSection('about')} className="text-zinc-300 hover:text-cyan-400 transition-colors text-left text-sm font-mono">./about</button>
                <button onClick={() => scrollToSection('skills')} className="text-zinc-300 hover:text-cyan-400 transition-colors text-left text-sm font-mono">./skills</button>
                <button onClick={() => scrollToSection('experience')} className="text-zinc-300 hover:text-cyan-400 transition-colors text-left text-sm font-mono">./experience</button>
                <button onClick={() => scrollToSection('projects')} className="text-zinc-300 hover:text-cyan-400 transition-colors text-left text-sm font-mono">./projects</button>
              </nav>
            </div>

            <div>
              <h4 className="text-cyan-400 font-mono text-sm mb-3">$ ls socials/</h4>
              <div className="flex gap-3">
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 terminal-icon flex items-center justify-center text-zinc-300 hover:text-cyan-400 hover:border-cyan-500"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 terminal-icon flex items-center justify-center text-zinc-300 hover:text-cyan-400 hover:border-cyan-500"
                >
                  <Github size={18} />
                </a>
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="w-10 h-10 terminal-icon flex items-center justify-center text-zinc-300 hover:text-cyan-400 hover:border-cyan-500"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 font-mono text-xs">
            <p className="text-zinc-400">© {currentYear} {portfolioData.personal.name}. All rights reserved.</p>
            <div className="text-green-400">
              <TerminalCommand
                className="mb-0"
                outputClassName=""
                prompt="root@cloud-devops:~$"
                command={`echo "Built with React + FastAPI"`}
                outputLines={['Built with React + FastAPI']}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
