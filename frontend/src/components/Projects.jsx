import React from 'react';
import { Card } from './ui/card';
import { ExternalLink, Github, Terminal, FolderGit2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { portfolioData } from '../mock';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 font-mono">
            <Terminal className="inline mr-3" size={40} />
            &gt; ls /projects --classified
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 ml-16 mb-4"></div>
          <p className="text-zinc-400 text-lg font-mono ml-16">[ CLOUD_OPERATIONS // DEPLOYED_SYSTEMS ]</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project) => (
            <Card
              key={project.id}
              className="bg-black/50 border-cyan-500/30 p-6 hover:border-cyan-500 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Classification label */}
              <div className="absolute top-4 right-4 px-2 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-xs font-mono text-cyan-400">
                [ PUBLIC ]
              </div>

              {/* Project header */}
              <div className="flex items-start gap-3 mb-4 mt-6">
                <FolderGit2 className="text-cyan-400 flex-shrink-0" size={24} />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors font-mono">
                    OP: {project.title.toUpperCase().replace(/ /g, '_')}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button className="text-zinc-400 hover:text-cyan-400 transition-colors">
                    <Github size={20} />
                  </button>
                  <button className="text-zinc-400 hover:text-cyan-400 transition-colors">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>

              {/* Terminal style command */}
              <div className="text-green-400 font-mono text-xs mb-3">
                <span className="text-cyan-400">$</span> cat description.md
              </div>

              {/* Description */}
              <p className="text-zinc-300 mb-4 text-sm">{project.description}</p>

              {/* Technologies */}
              <div className="mb-4">
                <div className="text-zinc-500 text-xs font-mono mb-2">&gt; TECH_STACK:</div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 font-mono text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="pt-4 border-t border-cyan-500/20">
                <div className="text-zinc-500 text-xs font-mono mb-2">&gt; KEY_METRICS:</div>
                <div className="space-y-2">
                  {project.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-zinc-400 font-mono">
                      <span className="text-green-400">[✓]</span>
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
