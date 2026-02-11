import React, { useMemo, useState } from 'react';
import {
  Compass,
  Camera,
  Music2,
  MoveRight,
  Plane,
  Mountain,
  GitBranch,
  Flag,
  TerminalSquare,
} from 'lucide-react';
import { portfolioData } from '../mock';

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

  return (
    <section id="about" className="page-section section-band">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <div className="section-headline">
          <span className="section-label">profile</span>
          <h2>Operator Overview</h2>
          <p>Short snapshot of how I think, ship, and operate in production.</p>
        </div>

        <div className="about-layout-new">
          <article className="glass-card about-main-card">
            <div className="section-command static">$ whoami</div>

            <div className="about-hobby-preview">
              <div className="about-hobby-title">operator summary</div>
              <div className="about-hobby-row">
                <span className="hobby-icon"><TerminalSquare size={14} /></span>
                <span>{portfolioData.personal.title}</span>
              </div>
              <p>{portfolioData.about.bio}</p>
            </div>

            <ul className="about-whoami-list">
              {portfolioData.about.highlights.map((item) => (
                <li key={item}>
                  <MoveRight size={13} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <aside className="glass-card about-side-card">
            <div className="section-command static">$ cat hobbies.md</div>

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
