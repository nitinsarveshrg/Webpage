import React from 'react';
import { Card } from './ui/card';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from './ui/badge';
import { portfolioData } from '../mock';
import AnimatedBackground from './AnimatedBackground';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-zinc-950 relative overflow-hidden">
      <AnimatedBackground opacity={0.1} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-4"></div>
          <p className="text-zinc-400 text-lg">Key projects and implementations</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project) => (
            <Card
              key={project.id}
              className="bg-zinc-900 border-zinc-800 p-6 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              {/* Project header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <button className="text-zinc-400 hover:text-cyan-400 transition-colors">
                    <Github size={20} />
                  </button>
                  <button className="text-zinc-400 hover:text-cyan-400 transition-colors">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-300 mb-4">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-zinc-800 text-cyan-400 border-zinc-700 hover:bg-zinc-700"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-4 border-t border-zinc-800">
                {project.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
