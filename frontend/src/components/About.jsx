import React, { useMemo, useState } from 'react';
import { UserCircle2, Compass, Camera, Music2, MoveRight } from 'lucide-react';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';

const hobbyIcon = (hobby) => {
  if (hobby.toLowerCase().includes('photography')) return <Camera size={14} />;
  if (hobby.toLowerCase().includes('music')) return <Music2 size={14} />;
  return <Compass size={14} />;
};

const About = () => {
  const [selectedHobby, setSelectedHobby] = useState(portfolioData.about.hobbies[0] || '');
  const [activeCommand, setActiveCommand] = useState('whoami');

  const hobbyNote = useMemo(() => {
    const lower = selectedHobby.toLowerCase();
    if (lower.includes('photography')) return 'I treat observability dashboards like composition frames: clarity first.';
    if (lower.includes('travel')) return 'New cities, new infra patterns, new coffee. Same terminal.';
    if (lower.includes('hiking')) return 'Best way to reset after release cycles.';
    if (lower.includes('music')) return 'Lo-fi while coding, race commentary on Sundays.';
    if (lower.includes('open-source')) return 'Real learning happens in issue threads and pull requests.';
    if (lower.includes('formula 1')) return 'Mercedes strategy brains + Max aggression. Good balance for ops.';
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

        <div className="about-command-row glass-card">
          {['whoami', 'cat bio.txt', 'cat hobbies.md'].map((cmd) => (
            <button key={cmd} className={`about-command-btn ${activeCommand === cmd ? 'active' : ''}`} onClick={() => setActiveCommand(cmd)}>
              {cmd}
            </button>
          ))}
          <div className="about-command-live">
            <span>$</span> {activeCommand}
          </div>
        </div>

        <div className="about-layout-new">
          <article className="glass-card about-main-card">
            <ScrollTypingLine prompt="$" text={activeCommand} className="section-command" speed={22} />
            <div className="about-main-meta">
              <UserCircle2 size={22} />
              <span>Cloud DevOps Engineer | Toronto</span>
            </div>
            <p>{portfolioData.about.bio}</p>
            <div className="about-highlight-grid">
              {portfolioData.about.highlights.map((item) => (
                <button key={item} className="about-highlight-pill about-highlight-btn">
                  <MoveRight size={12} />
                  <span>{item}</span>
                </button>
              ))}
            </div>
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
            <div className="about-side-note">{hobbyNote}</div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default About;
