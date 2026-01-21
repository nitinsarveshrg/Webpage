import React from 'react';
import { Card } from './ui/card';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { portfolioData } from '../mock';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-4"></div>
          <p className="text-zinc-400 text-lg">My professional journey</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800"></div>

          <div className="space-y-12">
            {portfolioData.experience.map((job, index) => (
              <div
                key={job.id}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-zinc-900"></div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <Card className="bg-zinc-800 border-zinc-700 p-6 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="text-cyan-400" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                        <p className="text-cyan-400 font-semibold mb-2">{job.company}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{job.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-zinc-300 mb-4">{job.description}</p>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-zinc-400 text-sm">
                          <span className="text-cyan-400 mt-1">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
