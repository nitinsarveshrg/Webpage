import React, { useState } from 'react';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';
import TerminalCommand from './TerminalCommand';

const Projects = () => {
  const [showContent, setShowContent] = useState(false);
  const [frameExpanded, setFrameExpanded] = useState(false);

  return (
    <section id="projects" className="portfolio-section bg-zinc-950">
      <div className={`max-w-7xl w-full mx-auto px-6 relative z-10 ${frameExpanded ? 'section-frame-grow' : 'section-frame-preroll'}`}>
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-cyan-400 text-sm ml-4">root@cloud-devops: ~/projects</span>
          </div>
        </div>

        <div className="terminal-body terminal-overlay">
          <pre className="text-green-400 text-xs mb-4 opacity-40">
{`
    ╔══════════════════╗
    ║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║  SERVER-01 [ACTIVE]
    ╠══════════════════╣
    ║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║  SERVER-02 [ACTIVE]
    ╠══════════════════╣
    ║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║  SERVER-03 [ACTIVE]
    ╚══════════════════╝
`}
          </pre>

          <div className="text-green-400 mb-6">
            <TerminalCommand
              className="mb-1"
              prompt="root@cloud-devops:~$"
              command="ls -la projects/ --classified"
              onRunStart={() => setFrameExpanded(true)}
              onCompleteChange={() => setShowContent(true)}
              outputClassName="ml-4 text-zinc-400 text-sm"
              outputLines={[
                `total ${portfolioData.projects.length}`,
                'Listing deployed infrastructure projects...',
              ]}
            />
          </div>

          {showContent && (
            <div className="section-elongate-load">
              <div className="grid md:grid-cols-2 gap-6">
                {portfolioData.projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="terminal-panel hover:border-cyan-500 terminal-stagger-reveal"
                    style={{ '--reveal-delay': `${120 + index * 160}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-cyan-500/20">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="text-cyan-400" size={16} />
                        <span className="text-cyan-400 text-xs font-bold">
                          [{index + 1}] {project.title.toUpperCase().replace(/ /g, '_')}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-cyan-400 transition-colors">
                            <Github size={14} />
                          </a>
                        )}
                        <button className="text-zinc-500 hover:text-cyan-400 transition-colors">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <ScrollTypingLine className="text-green-400 text-xs mb-1" prompt="$" text="cat README.md" speed={20} />
                      <p className="text-zinc-300 text-xs leading-relaxed ml-2">{project.description}</p>
                    </div>

                    <div className="mb-3">
                      <ScrollTypingLine className="text-green-400 text-xs mb-1" prompt="$" text="ls tech_stack/" speed={20} />
                      <div className="flex flex-wrap gap-1 ml-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] px-2 py-0 terminal-stagger-reveal"
                            style={{ '--reveal-delay': `${220 + index * 160 + techIndex * 80}ms` }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-cyan-500/20">
                      <ScrollTypingLine className="text-green-400 text-xs mb-1" prompt="$" text="cat metrics.log" speed={20} />
                      <div className="space-y-1 ml-2">
                        {project.highlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-1 text-[10px] text-zinc-400 terminal-stagger-reveal"
                            style={{ '--reveal-delay': `${300 + index * 160 + idx * 90}ms` }}
                          >
                            <span className="text-green-400">[✓]</span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-green-400 text-sm terminal-stagger-reveal" style={{ '--reveal-delay': '720ms' }}>
                <ScrollTypingLine prompt="$" text={`echo "Displayed ${portfolioData.projects.length} projects"`} speed={24} />
                <div className="ml-4">Displayed {portfolioData.projects.length} projects</div>
                <div className="mt-2"><span className="text-cyan-400">$</span> <span className="animate-pulse">_</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
