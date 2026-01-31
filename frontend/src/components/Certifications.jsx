import React from 'react';
import { Card } from './ui/card';
import { Award, ExternalLink, ShieldCheck, GraduationCap } from 'lucide-react';
import { Badge } from './ui/badge';
import { portfolioData } from '../mock';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Terminal Header */}
        <div className="bg-zinc-900 border-2 border-cyan-500/50 rounded-t-lg p-3 mb-0 font-mono">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-cyan-400 text-sm ml-4">root@cloud-devops: ~/certifications</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="bg-black/90 border-2 border-t-0 border-cyan-500/50 rounded-b-lg p-8 font-mono">
          <div className="text-green-400 mb-6">
            <div className="mb-2"><span className="text-cyan-400">root@cloud-devops:~$</span> cat /etc/credentials/verified.list</div>
            <div className="ml-4 text-zinc-400 text-sm mb-1">Reading verified credentials...</div>
            <div className="ml-4 text-green-400 text-sm mb-4">[✓] Found {portfolioData.certifications.length} active certifications</div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {portfolioData.certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="bg-zinc-900/50 border border-cyan-500/30 rounded p-4 hover:border-cyan-500 transition-all"
              >
                {/* Cert header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/30 rounded text-[10px] text-green-400">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      ACTIVE
                    </div>
                  </div>
                  <button className="text-zinc-500 hover:text-cyan-400 transition-colors">
                    <ExternalLink size={14} />
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="text-cyan-400 flex-shrink-0" size={20} />
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-sm mb-1 group-hover:text-cyan-400 transition-colors">{cert.name}</h3>
                    <p className="text-green-400 text-xs mb-2">&gt; {cert.issuer}</p>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                      <Badge className="bg-zinc-800 text-zinc-300 border border-zinc-700 text-[9px] px-1.5 py-0">
                        {cert.date}
                      </Badge>
                      <span>ID: {cert.credentialId}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mt-8 pt-6 border-t border-cyan-500/30">
            <div className="text-green-400 mb-4">
              <div><span className="text-cyan-400">$</span> cat education.log</div>
            </div>
            {portfolioData.education.map((edu) => (
              <div
                key={edu.id}
                className="bg-zinc-900/50 border border-cyan-500/30 rounded p-4 max-w-2xl mx-auto"
              >
                <div className="flex items-start gap-3">
                  <GraduationCap className="text-cyan-400 flex-shrink-0" size={20} />
                  <div>
                    <div className="text-white font-bold text-sm mb-1">{edu.degree}</div>
                    <div className="text-green-400 text-xs mb-1">&gt; {edu.institution}</div>
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span>{edu.period}</span>
                      <span>•</span>
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Command output */}
          <div className="mt-6 text-green-400 text-sm">
            <div><span className="text-cyan-400">$</span> echo "All credentials verified and active"</div>
            <div className="ml-4">All credentials verified and active</div>
            <div className="mt-2"><span className="text-cyan-400">$</span> <span className="animate-pulse">_</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
