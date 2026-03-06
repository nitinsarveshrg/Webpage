import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../mock';
import { scrollToSectionById } from '../lib/sectionScroll';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="nx-footer">
      <div className="content-wrap nx-footer-shell">
        <div className="nx-footer-brand">
          <h3>{portfolioData.personal.name}</h3>
          <p>{portfolioData.personal.title}</p>
          <span>Built for cloud teams that value secure delivery, observability, and operational excellence.</span>
        </div>

        <nav className="nx-footer-nav" aria-label="Footer navigation">
          <button onClick={() => scrollToSectionById('about')}>Whoami</button>
          <button onClick={() => scrollToSectionById('certifications')}>Creds</button>
          <button onClick={() => scrollToSectionById('skills')}>Skills</button>
          <button onClick={() => scrollToSectionById('experience')}>Timeline</button>
          <button onClick={() => scrollToSectionById('projects')}>Portfolio</button>
          <button onClick={() => scrollToSectionById('contact')}>Contact</button>
        </nav>

        <div className="nx-footer-social">
          <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
          <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={16} /></a>
          <a href={`mailto:${portfolioData.personal.email}`} aria-label="Email"><Mail size={16} /></a>
        </div>
      </div>

      <div className="nx-footer-bottom">© {year} {portfolioData.personal.name}</div>
    </footer>
  );
};

export default Footer;
