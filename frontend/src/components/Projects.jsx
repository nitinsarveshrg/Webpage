import React from 'react';
import { Card } from './ui/card';
import { ExternalLink, Github, FolderOpen, Package } from 'lucide-react';
import { Badge } from './ui/badge';
import { portfolioData } from '../mock';

const Projects = () => {
  return (
    <section id="projects" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Package className="text-blue-400" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Featured Projects
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
          <p className="text-slate-400 text-lg mt-4">Infrastructure and automation solutions deployed at scale</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project) => (
            <Card
              key={project.id}
              className="bg-slate-900/50 border-2 border-blue-500/30 p-6 hover:border-blue-500/60 transition-all duration-300 group backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20"
            >
              {/* Project header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                    <FolderOpen className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button className="text-slate-400 hover:text-blue-400 transition-colors">
                    <Github size={20} />
                  </button>
                  <button className="text-slate-400 hover:text-blue-400 transition-colors">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 mb-4 text-sm leading-relaxed">{project.description}</p>

              {/* Technologies */}
              <div className="mb-4">
                <div className="text-slate-500 text-xs font-semibold mb-2 uppercase tracking-wide">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="pt-4 border-t border-slate-700">
                <div className="text-slate-500 text-xs font-semibold mb-2 uppercase tracking-wide">Key Achievements</div>
                <div className="space-y-2">
                  {project.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
