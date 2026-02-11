import React from 'react';
import { UserCircle2, Compass, Camera, Music2 } from 'lucide-react';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';

const hobbyIcon = (hobby) => {
  if (hobby.toLowerCase().includes('photography')) return <Camera size={14} />;
  if (hobby.toLowerCase().includes('music')) return <Music2 size={14} />;
  return <Compass size={14} />;
};

const About = () => {
  return (
    <section id="about" className="page-section section-band">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <div className="section-headline">
          <span className="section-label">profile</span>
          <h2>Operator Overview</h2>
          <p>Short, sharp snapshot of how I work and what I optimize for in production.</p>
        </div>

        <div className="about-layout-new">
          <article className="glass-card about-main-card">
            <ScrollTypingLine prompt="$" text="whoami" className="section-command" speed={22} />
            <div className="about-main-meta">
              <UserCircle2 size={22} />
              <span>Cloud DevOps Engineer | Toronto</span>
            </div>
            <p>{portfolioData.about.bio}</p>
            <div className="about-highlight-grid">
              {portfolioData.about.highlights.map((item) => (
                <div key={item} className="about-highlight-pill">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <aside className="glass-card about-side-card">
            <div className="section-command static">$ cat hobbies.md</div>
            <ul className="hobby-list-new">
              {portfolioData.about.hobbies.map((hobby) => (
                <li key={hobby}>
                  <span className="hobby-icon">{hobbyIcon(hobby)}</span>
                  <span>{hobby}</span>
                </li>
              ))}
            </ul>
            <div className="about-side-note">Mostly Linux, always observability-first, and definitely race-weekend ready.</div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default About;
