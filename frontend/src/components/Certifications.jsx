import React from 'react';
import { Card } from './ui/card';
import { Award, ExternalLink, Terminal, ShieldCheck } from 'lucide-react';
import { Badge } from './ui/badge';
import { portfolioData } from '../mock';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 font-mono">
            <Terminal className="inline mr-3" size={40} />
            &gt; cat /certs/vault.enc
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 ml-16 mb-4"></div>
          <p className="text-zinc-400 text-lg font-mono ml-16">[ SECURITY_CLEARANCE: VERIFIED ]</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.certifications.map((cert) => (
            <Card
              key={cert.id}
              className="bg-black/50 border-cyan-500/30 p-6 hover:border-cyan-500 transition-all duration-300 group relative"
            >
              {/* Active badge */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs font-mono text-green-400">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  ACTIVE
                </div>
              </div>

              <div className="flex items-start gap-4 mt-6">
                <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/50 rounded flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="text-cyan-400" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-cyan-400 mb-1 group-hover:text-cyan-300 transition-colors font-mono">
                    {cert.name}
                  </h3>
                  <p className="text-green-400 text-sm font-semibold mb-2 font-mono">&gt; {cert.issuer}</p>
                  <div className="flex items-center gap-3 text-sm text-zinc-400 font-mono">
                    <Badge variant="secondary" className="bg-zinc-900 text-zinc-300 border border-cyan-500/20">
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
          <h3 className="text-3xl font-bold text-cyan-400 mb-8 font-mono">&gt; cat /education/records.log</h3>
          {portfolioData.education.map((edu) => (
            <Card
              key={edu.id}
              className="bg-black/50 border-cyan-500/30 p-6 max-w-2xl mx-auto"
            >
              <div className="flex items-start gap-4">
                <Award className="text-cyan-400" size={32} />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                  <p className="text-cyan-400 font-semibold mb-2 font-mono">&gt; {edu.institution}</p>
                  <div className="flex items-center gap-4 text-sm text-zinc-400 font-mono">
                    <span>{edu.period}</span>
                    <span>•</span>
                    <span>{edu.location}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
