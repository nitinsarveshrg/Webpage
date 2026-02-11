import React, { useState } from 'react';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';
import TerminalCommand from './TerminalCommand';
import SectionModeBanner from './SectionModeBanner';
import SectionFrame from './SectionFrame';

const About = () => {
  const [showContent, setShowContent] = useState(false);
  const [frameExpanded, setFrameExpanded] = useState(false);
  const hobbyNotes = {
    Photography: 'Chasing golden hour and clean compositions.',
    Travel: 'Collecting new places, stories, and coffee spots.',
    Hiking: 'Best place to debug life decisions.',
    'Listening to music': 'Lo-fi for focus, high tempo for deploy days.',
    'Open-source learning': 'Learning from real-world code, issues, and PRs.',
    'Formula 1 (Mercedes + Max Verstappen fan)': 'Race weekends, strategy calls, and telemetry are my happy place.',
  };

  return (
    <section id="about" className="portfolio-section bg-zinc-950">
      <div className={`section-shell max-w-7xl w-full mx-auto px-6 relative z-10 ${frameExpanded ? 'section-frame-grow' : 'section-frame-preroll'}`}>
        <SectionFrame path="root@cloud-devops: ~/about" label="PROFILE" bodyClassName="terminal-overlay">
          <pre className="text-cyan-400 text-xs mb-4 opacity-50">
{`
              .--~~,__
     :-....,-------\`~~'._.'
      \`-,,,  ,_      ;'~U'
       _,-' ,'\ \`-__; '--.
      (_/'~~      ''''(;
`}
          </pre>

          <div className="text-green-400 mb-6">
            <TerminalCommand
              className="mb-1"
              prompt="root@cloud-devops:~$"
              command="whoami"
              onRunStart={() => setFrameExpanded(true)}
              onCompleteChange={() => setShowContent(true)}
              outputClassName="ml-4 text-zinc-300 text-sm"
              outputLines={['Displaying user information...']}
            />
          </div>

          {showContent && (
            <div className="section-elongate-load">
              <SectionModeBanner
                className="mb-6"
                mode="IDENTITY_MODE"
                command="cat /etc/profile.d/operator.conf"
                status="ONLINE"
                tags={['LINUX', 'CLOUD_OPS', 'F1_TELEMETRY']}
              />

              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="terminal-panel terminal-stagger-reveal" style={{ '--reveal-delay': '100ms' }}>
                  <ScrollTypingLine className="text-green-400 text-sm mb-3" prompt="$" text="cat profile.txt" speed={24} />
                  <div className="text-zinc-300 text-sm leading-relaxed">{portfolioData.about.bio}</div>
                  <div className="text-green-400 text-sm mt-3">
                    <span className="text-cyan-400">$</span> <span className="animate-pulse">_</span>
                  </div>
                </div>

                <div className="terminal-panel terminal-stagger-reveal" style={{ '--reveal-delay': '260ms' }}>
                  <ScrollTypingLine className="text-green-400 text-sm mb-3" prompt="$" text="ls -la highlights/" speed={24} />
                  <div className="space-y-2">
                    {portfolioData.about.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm terminal-stagger-reveal"
                        style={{ '--reveal-delay': `${320 + index * 120}ms` }}
                      >
                        <span className="text-green-400">[✓]</span>
                        <span className="text-zinc-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-green-400 text-sm mt-3">
                    <span className="text-cyan-400">$</span> <span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 terminal-panel terminal-stagger-reveal" style={{ '--reveal-delay': '420ms' }}>
                <ScrollTypingLine className="text-green-400 text-sm mb-3" prompt="$" text="cat hobbies.md" speed={24} />
                <div className="space-y-2">
                  {portfolioData.about.hobbies.map((hobby, index) => (
                    <div
                      key={hobby}
                      className="flex items-start gap-2 text-sm terminal-stagger-reveal"
                      style={{ '--reveal-delay': `${460 + index * 100}ms` }}
                    >
                      <span className="text-green-400">[{String(index + 1).padStart(2, '0')}]</span>
                      <div>
                        <div className="text-zinc-200">{hobby}</div>
                        <div className="text-zinc-500 text-xs">{hobbyNotes[hobby]}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-green-400 text-sm mt-3">
                  <span className="text-cyan-400">$</span> <span className="animate-pulse">_</span>
                </div>
              </div>

              <div className="mt-6 text-green-400 text-sm terminal-stagger-reveal" style={{ '--reveal-delay': '520ms' }}>
                <ScrollTypingLine prompt="$" text={`echo "Profile loaded successfully"`} speed={24} />
                <div className="ml-4">Profile loaded successfully</div>
                <div className="mt-2"><span className="text-cyan-400">$</span> <span className="animate-pulse">_</span></div>
              </div>
            </div>
          )}
        </SectionFrame>
      </div>
    </section>
  );
};

export default About;
