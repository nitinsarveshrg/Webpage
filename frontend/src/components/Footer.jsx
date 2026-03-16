import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../mock';
import { scrollToSectionById } from '../lib/sectionScroll';

const NAV = [
  { id: 'hero', label: 'Start' },
  { id: 'about', label: 'Whoami' },
  { id: 'certifications', label: 'Creds' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Timeline' },
  { id: 'projects', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

const Footer = () => (
  <footer className="ft-footer">
    <div className="content-wrap">
      <div className="ft-top">
        <div className="ft-brand">
          <div className="ft-logo">NS</div>
          <div>
            <h3>{portfolioData.personal.name}</h3>
            <p>{portfolioData.personal.title}</p>
          </div>
        </div>

        <nav className="ft-nav" aria-label="Footer navigation">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => scrollToSectionById(n.id)}>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="ft-social">
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

      <div className="ft-divider" />

      <div className="ft-bottom">
        <span>© {new Date().getFullYear()} {portfolioData.personal.name}</span>
        <span className="ft-bottom-tag">Built for cloud teams that value delivery excellence.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
