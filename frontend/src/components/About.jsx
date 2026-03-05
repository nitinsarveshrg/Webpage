import React, { useMemo, useState } from 'react';
import { Camera, Compass, Flag, GitBranch, Mountain, Music2, Plane, Sparkles } from 'lucide-react';
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
    if (lower.includes('photography')) return 'I treat observability dashboards like visual compositions: clarity over noise.';
    if (lower.includes('travel')) return 'Exploring new places gives me new ideas for scalable systems and clean workflows.';
    if (lower.includes('hiking')) return 'Hiking helps reset focus after incident-heavy weeks and long delivery sprints.';
    if (lower.includes('music')) return 'Lo-fi for coding, race commentary for Sundays.';
    if (lower.includes('open-source')) return 'Open-source issue threads are where practical engineering growth happens fastest.';
    if (lower.includes('formula 1')) return 'I bring race-weekend discipline: strategic planning with fast execution.';
    return 'Always learning, always improving.';
  }, [selectedHobby]);

  return (
    <section id="about" className="page-section mk-section mk-band">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <header className="mk-section-head">
          <span className="mk-section-kicker">Profile</span>
          <h2>Built for Production, Designed for Reliability</h2>
          <p>{portfolioData.about.bio}</p>
        </header>

        <div className="mk-about-grid">
          <article className="mk-card mk-about-main">
            <h3>Operator Summary</h3>
            <ul className="mk-check-list">
              {portfolioData.about.highlights.map((item) => (
                <li key={item}>
                  <Sparkles size={13} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <aside className="mk-card mk-about-side">
            <h3>Interests</h3>
            <div className="mk-hobby-list">
              {portfolioData.about.hobbies.map((hobby) => (
                <button
                  key={hobby}
                  className={`mk-hobby-btn ${selectedHobby === hobby ? 'active' : ''}`}
                  onClick={() => setSelectedHobby(hobby)}
                >
                  {hobbyIcon(hobby)}
                  <span>{hobby}</span>
                </button>
              ))}
            </div>

            <div className="mk-hobby-note">
              <strong>{selectedHobby}</strong>
              <p>{hobbyNote}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default About;
