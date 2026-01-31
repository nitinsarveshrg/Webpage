import React from 'react';
import { Card } from './ui/card';
import { Award, ExternalLink, Shield, GraduationCap } from 'lucide-react';
import { Badge } from './ui/badge';
import { portfolioData } from '../mock';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-blue-400" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Certifications
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
          <p className="text-slate-400 text-lg mt-4">Professional credentials and qualifications</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.certifications.map((cert) => (
            <Card
              key={cert.id}
              className="bg-slate-900/50 border-2 border-blue-500/30 p-6 hover:border-blue-500/60 transition-all duration-300 group backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20"
            >
              {/* Active badge */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs font-semibold text-green-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  ACTIVE
                </div>
                <button className="text-slate-400 hover:text-blue-400 transition-colors">
                  <ExternalLink size={20} />
                </button>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Award className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-blue-400 text-sm font-semibold mb-2">{cert.issuer}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300 border border-slate-700">
                      {cert.date}
                    </Badge>
                    <span className="text-xs">ID: {cert.credentialId}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Education Section */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="text-blue-400" size={36} />
            <h3 className="text-3xl font-bold text-white">Education</h3>
          </div>
          {portfolioData.education.map((edu) => (
            <Card
              key={edu.id}
              className="bg-slate-900/50 border-2 border-blue-500/30 p-6 max-w-2xl mx-auto backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                  <GraduationCap className="text-white" size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                  <p className="text-blue-400 font-semibold mb-2">{edu.institution}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
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
