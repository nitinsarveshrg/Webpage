import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, GraduationCap } from 'lucide-react';
import { Badge } from './ui/badge';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';
import TerminalCommand from './TerminalCommand';

const Certifications = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <section id="certifications" className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-cyan-400 text-sm ml-4">root@cloud-devops: ~/certifications</span>
          </div>
        </div>

        <div className="terminal-body terminal-overlay">
          <div className="text-green-400 mb-6">
            <TerminalCommand
              className="mb-1"
              prompt="root@cloud-devops:~$"
              command="cat /etc/credentials/verified.list"
              once={false}
              onRunStart={() => setShowContent(false)}
              onCompleteChange={() => setShowContent(true)}
              outputClassName="ml-4 text-zinc-400 text-sm"
              outputLines={[
                'Reading verified credentials...',
                `[✓] Found ${portfolioData.certifications.length} active certifications`,
              ]}
            />
          </div>

          {showContent && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                {portfolioData.certifications.map((cert) => (
                  <div key={cert.id} className="terminal-panel hover:border-cyan-500 group">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-cyan-500/20">
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/30 rounded text-[10px] text-green-400">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        ACTIVE
                      </div>
                      {cert.link && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-cyan-400 transition-colors">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>

                    <div className="flex items-start gap-3">
                      <ShieldCheck className="text-cyan-400 flex-shrink-0" size={20} />
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-sm mb-1 group-hover:text-cyan-400 transition-colors">{cert.name}</h3>
                        <p className="text-green-400 text-xs mb-2">&gt; {cert.issuer}</p>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                          <Badge className="bg-zinc-800 text-zinc-300 border border-zinc-700 text-[9px] px-1.5 py-0">{cert.date}</Badge>
                          <span>ID: {cert.credentialId}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-cyan-500/30">
                <div className="text-green-400 mb-4">
                  <ScrollTypingLine prompt="$" text="cat education.log" speed={24} />
                </div>
                {portfolioData.education.map((edu) => (
                  <div key={edu.id} className="terminal-panel max-w-2xl mx-auto">
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

              <div className="mt-6 text-green-400 text-sm">
                <ScrollTypingLine prompt="$" text={`echo "All credentials verified and active"`} speed={24} />
                <div className="ml-4">All credentials verified and active</div>
                <div className="mt-2"><span className="text-cyan-400">$</span> <span className="animate-pulse">_</span></div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
