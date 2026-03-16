import React from 'react';
import { Cloud, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../mock';
import { scrollToSectionById } from '../lib/sectionScroll';

const NAV = ['about','certifications','skills','experience','projects','education','contact'];

const Footer = () => (
  <footer className="ft-footer">
    <div className="ft-top">
      <div className="ft-brand">
        <div className="ft-logo"><Cloud size={18} strokeWidth={2.2} /></div>
        <div className="ft-brand-name">Nitin Sarvesh Raajagopal</div>
        <div className="ft-brand-role">Cloud · DevOps · SRE · Toronto</div>
        <p className="ft-brand-bio">
          Building resilient cloud infrastructure and automated delivery pipelines
          that scale without compromise.
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <div className="ft-nav-title">Navigation</div>
        <div className="ft-nav">
          {NAV.map((id) => (
            <button key={id} onClick={() => scrollToSectionById(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      </nav>
      <div>
        <div className="ft-social-title">Connect</div>
        <div className="ft-social-links">
          <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={13} /> LinkedIn
          </a>
          <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer">
            <Github size={13} /> GitHub
          </a>
          <a href={`mailto:${portfolioData.personal.email}`}>
            <Mail size={13} /> Email
          </a>
        </div>
      </div>
    </div>
    <hr className="ft-divider" />
    <div className="ft-bottom">
      <span className="ft-copy">© {new Date().getFullYear()} Nitin Sarvesh Raajagopal. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
