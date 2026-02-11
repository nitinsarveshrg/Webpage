import React, { useMemo, useState } from 'react';
import {
  UserCircle2,
  Compass,
  Camera,
  Music2,
  MoveRight,
  Plane,
  Mountain,
  GitBranch,
  Flag,
  FileText,
  Heart,
  TerminalSquare,
} from 'lucide-react';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';

const commandOrder = ['whoami', 'cat bio.txt', 'cat hobbies.md'];

const commandMeta = {
  whoami: {
    label: 'Identity + operating style',
    icon: TerminalSquare,
  },
  'cat bio.txt': {
    label: 'Short professional summary',
    icon: FileText,
  },
  'cat hobbies.md': {
    label: 'Interests outside deployments',
    icon: Heart,
  },
};

const hobbyIcon = (hobby) => {
  const value = hobby.toLowerCase();
  if (value.includes('photography')) return <Camera size={14} />;
  if (value.includes('travel')) return <Plane size={14} />;
  if (value.includes('hiking')) return <Mountain size={14} />;
  if (value.includes('music')) return <Music2 size={14} />;
  if (value.includes('open-source') || value.includes('open source')) return <GitBranch size={14} />;
  if (value.includes('formula 1') || value.includes('f1')) return <Flag size={14} />;
  return <Compass size={14} />;
};

const About = () => {
  const [selectedHobby, setSelectedHobby] = useState(portfolioData.about.hobbies[0] || '');
  const [activeCommand, setActiveCommand] = useState('whoami');

  const hobbyNote = useMemo(() => {
    const lower = selectedHobby.toLowerCase();
    if (lower.includes('photography')) return 'I treat observability dashboards like composition frames: clarity first.';
    if (lower.includes('travel')) return 'New cities, new infra patterns, and new coffee. Same terminal.';
    if (lower.includes('hiking')) return 'Best way to reset after release cycles and incident-heavy weeks.';
    if (lower.includes('music')) return 'Lo-fi while coding, race commentary on Sundays.';
    if (lower.includes('open-source')) return 'Real learning happens in issue threads and pull requests.';
    if (lower.includes('formula 1')) return 'Mercedes strategy brain plus Max racecraft intensity.';
    return 'Always learning and building.';
  }, [selectedHobby]);

  const bioLines = useMemo(() => {
    return portfolioData.about.bio
      .split('. ')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => (line.endsWith('.') ? line : `${line}.`));
  }, []);

  const renderMainContent = () => {
    if (activeCommand === 'cat bio.txt') {
      return (
        <div className="about-bio-lines">
          {bioLines.map((line) => (
            <div key={line} className="about-bio-line">
              <span className="prefix">-</span>
              <span>{line}</span>
            </div>
          ))}
        </div>
      );
    }

    if (activeCommand === 'cat hobbies.md') {
      return (
        <div className="about-hobby-board">
          <ul className="hobby-list-new">
            {portfolioData.about.hobbies.map((hobby) => (
              <li key={hobby}>
                <button
                  className={`hobby-select-btn ${selectedHobby === hobby ? 'active' : ''}`}
                  onClick={() => setSelectedHobby(hobby)}
                >
                  <span className="hobby-icon">{hobbyIcon(hobby)}</span>
                  <span>{hobby}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="about-side-note">{hobbyNote}</div>
        </div>
      );
    }

    return (
      <>
        <div className="about-main-meta">
          <UserCircle2 size={22} />
          <span>Cloud DevOps Engineer | Toronto</span>
        </div>
        <p className="about-main-lead">{portfolioData.about.bio}</p>
        <ul className="about-whoami-list">
          {portfolioData.about.highlights.map((item) => (
            <li key={item}>
              <MoveRight size={13} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <section id="about" className="page-section section-band">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <div className="section-headline">
          <span className="section-label">profile</span>
          <h2>Operator Overview</h2>
          <p>Short snapshot of how I think, ship, and operate in production.</p>
        </div>

        <div className="about-command-row glass-card">
          {commandOrder.map((cmd) => (
            <button
              key={cmd}
              className={`about-command-btn ${activeCommand === cmd ? 'active' : ''}`}
              onClick={() => setActiveCommand(cmd)}
            >
              {cmd}
            </button>
          ))}
          <div className="about-command-live">
            <span>$</span> {activeCommand}
          </div>
        </div>

        <div className="about-layout-new">
          <article className="glass-card about-main-card">
            <ScrollTypingLine prompt="$" text={activeCommand} className="section-command" speed={20} />
            {renderMainContent()}
          </article>

          <aside className="glass-card about-side-card">
            <div className="section-command static">$ ls profile/</div>

            <div className="about-file-grid">
              {commandOrder.map((cmd) => {
                const Icon = commandMeta[cmd].icon;
                return (
                  <button
                    key={cmd}
                    className={`about-file-tile ${activeCommand === cmd ? 'active' : ''}`}
                    onClick={() => setActiveCommand(cmd)}
                  >
                    <span className="about-file-icon"><Icon size={14} /></span>
                    <span className="about-file-copy">
                      <strong>{cmd}</strong>
                      <small>{commandMeta[cmd].label}</small>
                    </span>
                  </button>
                );
              })}
            </div>

            <ul className="about-fact-list">
              <li>
                <span className="label">location</span>
                <span>{portfolioData.personal.location}</span>
              </li>
              <li>
                <span className="label">experience</span>
                <span>5+ years</span>
              </li>
              <li>
                <span className="label">focus</span>
                <span>AWS, IaC, CI/CD, SRE</span>
              </li>
            </ul>

            <div className="about-hobby-preview">
              <div className="about-hobby-title">selected hobby</div>
              <div className="about-hobby-row">
                <span className="hobby-icon">{hobbyIcon(selectedHobby)}</span>
                <span>{selectedHobby}</span>
              </div>
              <p>{hobbyNote}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default About;
