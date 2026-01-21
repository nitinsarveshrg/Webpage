import React from 'react';
import { Card } from './ui/card';
import { Award, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { portfolioData } from '../mock';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-4"></div>
          <p className="text-zinc-400 text-lg">Professional certifications and credentials</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.certifications.map((cert) => (
            <Card
              key={cert.id}
              className="bg-zinc-800 border-zinc-700 p-6 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="text-cyan-400" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-cyan-400 text-sm font-semibold mb-2">{cert.issuer}</p>
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <Badge variant="secondary" className="bg-zinc-900 text-zinc-300">
                      {cert.date}
                    </Badge>
                    <span className="text-xs">ID: {cert.credentialId}</span>
                  </div>
                </div>
                <button className="text-zinc-400 hover:text-cyan-400 transition-colors">
                  <ExternalLink size={20} />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Education Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-white text-center mb-8">Education</h3>
          {portfolioData.education.map((edu) => (
            <Card
              key={edu.id}
              className="bg-zinc-800 border-zinc-700 p-6 max-w-2xl mx-auto"
            >
              <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
              <p className="text-cyan-400 font-semibold mb-2">{edu.institution}</p>
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <span>{edu.period}</span>
                <span>•</span>
                <span>{edu.location}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
