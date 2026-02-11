import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../mock';
import { scrollToSectionById } from '../lib/sectionScroll';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-new">
      <div className="content-wrap footer-grid-new">
        <div>
          <div className="footer-name">{portfolioData.personal.name}</div>
          <div className="footer-role">{portfolioData.personal.title}</div>
          <div className="footer-note">Built for cloud engineering roles and production-focused teams.</div>
        </div>

        <nav className="footer-nav-new">
          <button onClick={() => scrollToSectionById('about')}>profile</button>
          <button onClick={() => scrollToSectionById('skills')}>stack</button>
          <button onClick={() => scrollToSectionById('projects')}>builds</button>
          <button onClick={() => scrollToSectionById('contact')}>contact</button>
        </nav>

        <div className="footer-social-new">
          <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={15} /></a>
          <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer"><Github size={15} /></a>
          <a href={`mailto:${portfolioData.personal.email}`}><Mail size={15} /></a>
        </div>
      </div>
      <div className="footer-bottom-new">© {year} {portfolioData.personal.name}</div>
    </footer>
  );
};

export default Footer;
