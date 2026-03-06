import React, { useMemo, useState } from 'react';
import { Camera, Compass, Flag, GitBranch, Mountain, Music2, Plane, Sparkles } from 'lucide-react';
import { portfolioData } from '../mock';

const iconForHobby = (hobby) => {
  const text = hobby.toLowerCase();
  if (text.includes('photography')) return Camera;
  if (text.includes('travel')) return Plane;
  if (text.includes('hiking')) return Mountain;
  if (text.includes('music')) return Music2;
  if (text.includes('open-source') || text.includes('open source')) return GitBranch;
  if (text.includes('formula 1') || text.includes('f1')) return Flag;
  return Compass;
};

const notes = {
  Photography: 'I treat dashboards like compositions: remove noise, keep signal.',
  Travel: 'New places give me fresh architecture ideas and practical simplification patterns.',
  Hiking: 'Long hikes train patience, pacing, and clear decision-making under uncertainty.',
  'Listening to music': 'Lo-fi while coding, race commentary on weekends.',
  'Open-source learning': 'I learn fastest by reading real issue threads and PR discussions.',
  'Formula 1 (Mercedes + Max Verstappen fan)': 'I like race strategy, tire management, and execution under pressure.',
};

const tabs = [
  { id: 'whoami', label: 'whoami' },
  { id: 'highlights', label: 'cat highlights.log' },
  { id: 'hobbies', label: 'cat hobbies.md' },
];

const About = () => {
  const [activeTab, setActiveTab] = useState('whoami');
  const [activeHobby, setActiveHobby] = useState(portfolioData.about.hobbies[0]);

  const activeNote = useMemo(() => notes[activeHobby] || 'Always learning with practical engineering focus.', [activeHobby]);

  return (
    <section id="about" className="nx-section nx-block">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <header className="nx-head">
          <span>Whoami</span>
          <h2>Operator Profile</h2>
          <p>Production-first cloud engineer focused on reliable systems, automation depth, and release confidence.</p>
        </header>

        <div className="nx-about-shell">
          <div className="nx-about-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={activeTab === tab.id ? 'active' : ''}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="nx-about-grid">
            <article className="nx-panel nx-about-main">
              {activeTab === 'whoami' && (
                <>
                  <h3>$ whoami_</h3>
                  <p>{portfolioData.about.bio}</p>
                </>
              )}

              {activeTab === 'highlights' && (
                <>
                  <h3>$ cat highlights.log_</h3>
                  <ul>
                    {portfolioData.about.highlights.map((item) => (
                      <li key={item}><Sparkles size={13} /> {item}</li>
                    ))}
                  </ul>
                </>
              )}

              {activeTab === 'hobbies' && (
                <>
                  <h3>$ cat hobbies.md_</h3>
                  <p>Outside work, I recharge through visual craft, outdoor motion, and motorsport strategy.</p>
                </>
              )}
            </article>

            <aside className="nx-panel nx-hobby-panel">
              <h4>Interest Channel</h4>
              <div className="nx-hobby-list">
                {portfolioData.about.hobbies.map((hobby) => {
                  const Icon = iconForHobby(hobby);
                  const isActive = activeHobby === hobby;
                  return (
                    <button
                      key={hobby}
                      className={isActive ? 'active' : ''}
                      onClick={() => {
                        setActiveHobby(hobby);
                        setActiveTab('hobbies');
                      }}
                    >
                      <Icon size={14} />
                      <span>{hobby}</span>
                    </button>
                  );
                })}
              </div>

              <div className="nx-hobby-note">
                <strong>{activeHobby}</strong>
                <p>{activeNote}</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
