import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../mock';
import { scrollToSectionById } from '../lib/sectionScroll';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mk-footer">
      <div className="content-wrap mk-footer-shell">
        <div className="mk-footer-brand">
          <h3>{portfolioData.personal.name}</h3>
          <p>{portfolioData.personal.title}</p>
          <span>Production-grade cloud delivery, clean automation, and measurable reliability.</span>
        </div>

        <nav className="mk-footer-nav" aria-label="Footer navigation">
          <button onClick={() => scrollToSectionById('about')}>Profile</button>
          <button onClick={() => scrollToSectionById('certifications')}>Certs</button>
          <button onClick={() => scrollToSectionById('skills')}>Skills</button>
          <button onClick={() => scrollToSectionById('experience')}>Timeline</button>
          <button onClick={() => scrollToSectionById('projects')}>Projects</button>
          <button onClick={() => scrollToSectionById('contact')}>Contact</button>
        </nav>

        <div className="mk-footer-social" aria-label="Social links">
          <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href={`mailto:${portfolioData.personal.email}`} aria-label="Email">
            <Mail size={16} />
          </a>
        </div>
      </div>

      <div className="mk-footer-bottom">© {year} {portfolioData.personal.name} • Built with React and production-focused engineering intent.</div>
    </footer>
  );
};

export default Footer;
