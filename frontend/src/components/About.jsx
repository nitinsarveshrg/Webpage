import React from 'react';
import { Card } from './ui/card';
import { CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../mock';

const About = () => {
  return (
    <section id="about" className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Terminal Header */}
        <div className="bg-zinc-900 border-2 border-cyan-500/50 rounded-t-lg p-3 mb-0 font-mono">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-cyan-400 text-sm ml-4">root@cloud-devops: ~/about</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="bg-black/90 border-2 border-t-0 border-cyan-500/50 rounded-b-lg p-8 font-mono">
          {/* ASCII Art Cloud */}
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
            <div className="mb-2"><span className="text-cyan-400">root@cloud-devops:~$</span> whoami</div>
            <div className="ml-4 text-zinc-300 mb-4">Displaying user information...</div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Bio Terminal Window */}
            <div className="bg-zinc-900/50 border border-cyan-500/30 rounded p-4">
              <div className="text-green-400 text-sm mb-3">
                <span className="text-cyan-400">$</span> cat profile.txt
              </div>
              <div className="text-zinc-300 text-sm leading-relaxed">
                {portfolioData.about.bio}
              </div>
              <div className="text-green-400 text-sm mt-3">
                <span className="text-cyan-400">$</span> <span className="animate-pulse">_</span>
              </div>
            </div>

            {/* Highlights Terminal Window */}
            <div className="bg-zinc-900/50 border border-cyan-500/30 rounded p-4">
              <div className="text-green-400 text-sm mb-3">
                <span className="text-cyan-400">$</span> ls -la highlights/
              </div>
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

          {/* Command output */}
          <div className="mt-6 text-green-400 text-sm">
            <div><span className="text-cyan-400">$</span> echo "Profile loaded successfully"</div>
            <div className="ml-4">Profile loaded successfully</div>
            <div className="mt-2"><span className="text-cyan-400">$</span> <span className="animate-pulse">_</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
