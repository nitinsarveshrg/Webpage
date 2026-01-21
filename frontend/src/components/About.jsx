import React from 'react';
import { Card } from './ui/card';
import { CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../mock';
import AnimatedBackground from './AnimatedBackground';

const About = () => {
  return (
    <section id="about" className="py-20 bg-zinc-900 relative overflow-hidden">
      <AnimatedBackground opacity={0.08} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <div className="space-y-6">
            <p className="text-lg text-zinc-300 leading-relaxed">
              {portfolioData.about.bio}
            </p>
          </div>

          {/* Highlights */}
          <Card className="bg-zinc-800 border-zinc-700 p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Highlights</h3>
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
