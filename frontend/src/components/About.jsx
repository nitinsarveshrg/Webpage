import React, { useState } from 'react';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';
import TerminalCommand from './TerminalCommand';

const About = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <section id="about" className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-cyan-400 text-sm ml-4">root@cloud-devops: ~/about</span>
          </div>
        </div>

        <div className="terminal-body terminal-overlay">
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
              onCompleteChange={() => setShowContent(true)}
              outputClassName="ml-4 text-zinc-300 text-sm"
              outputLines={['Displaying user information...']}
            />
          </div>

          {showContent && (
            <>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="terminal-panel">
                  <ScrollTypingLine className="text-green-400 text-sm mb-3" prompt="$" text="cat profile.txt" speed={24} />
                  <div className="text-zinc-300 text-sm leading-relaxed">{portfolioData.about.bio}</div>
                  <div className="text-green-400 text-sm mt-3">
                    <span className="text-cyan-400">$</span> <span className="animate-pulse">_</span>
                  </div>
                </div>

                <div className="terminal-panel">
                  <ScrollTypingLine className="text-green-400 text-sm mb-3" prompt="$" text="ls -la highlights/" speed={24} />
                  <div className="space-y-2">
                    {portfolioData.about.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
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

              <div className="mt-6 text-green-400 text-sm">
                <ScrollTypingLine prompt="$" text={`echo "Profile loaded successfully"`} speed={24} />
                <div className="ml-4">Profile loaded successfully</div>
                <div className="mt-2"><span className="text-cyan-400">$</span> <span className="animate-pulse">_</span></div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
