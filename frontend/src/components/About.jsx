import React from 'react';
import { Card } from './ui/card';
import { CheckCircle2, Terminal } from 'lucide-react';
import { portfolioData } from '../mock';

const About = () => {
  return (
    <section id="about" className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 font-mono">
            <Terminal className="inline mr-3" size={40} />
            &gt; cat profile.dat
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 ml-16"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <Card className="bg-black/50 border-cyan-500/30 p-8">
            <div className="text-green-400 font-mono text-sm mb-4">
              <span className="text-cyan-400">root@devops:~$</span> cat README.md
            </div>
            <p className="text-lg text-zinc-300 leading-relaxed">
              {portfolioData.about.bio}
            </p>
          </Card>

          {/* Highlights */}
          <Card className="bg-black/50 border-cyan-500/30 p-8">
            <div className="text-green-400 font-mono text-sm mb-4">
              <span className="text-cyan-400">root@devops:~$</span> ls -la highlights/
            </div>
            <div className="space-y-4">
              {portfolioData.about.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-zinc-300">{highlight}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
