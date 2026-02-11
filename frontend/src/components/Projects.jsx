import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { portfolioData } from '../mock';
import ScrollTypingLine from './ScrollTypingLine';
import TerminalCommand from './TerminalCommand';
import SectionModeBanner from './SectionModeBanner';
import SectionFrame from './SectionFrame';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const fullBlocks = '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓';

const seedServers = () => ([
  { name: 'SERVER-01', load: 96, latency: 14, io: 438 },
  { name: 'SERVER-02', load: 91, latency: 18, io: 401 },
  { name: 'SERVER-03', load: 94, latency: 11, io: 452 },
]);

const Projects = () => {
  const [showContent, setShowContent] = useState(false);
  const [frameExpanded, setFrameExpanded] = useState(false);
  const [serverNodes, setServerNodes] = useState(seedServers);
  const [lastSync, setLastSync] = useState(() => new Date().toLocaleTimeString());
  const rackCommand = useMemo(() => 'watch -n 2 status/rack-health --live', []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setServerNodes((previous) => previous.map((node) => {
        const load = clamp(node.load + Math.round((Math.random() * 6) - 3), 84, 99);
        const latency = clamp(node.latency + Math.round((Math.random() * 6) - 3), 8, 28);
        const io = clamp(node.io + Math.round((Math.random() * 56) - 28), 340, 520);
        return { ...node, load, latency, io };
      }));
      setLastSync(new Date().toLocaleTimeString());
    }, 1750);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section id="projects" className="portfolio-section bg-zinc-950">
      <div className={`section-shell max-w-7xl w-full mx-auto px-6 relative z-10 ${frameExpanded ? 'section-frame-grow' : 'section-frame-preroll'}`}>
        <SectionFrame path="root@cloud-devops: ~/projects" label="BUILD_LAB" bodyClassName="terminal-overlay">
          <SectionModeBanner
            className="mb-4"
            mode="BUILD_LAB"
            command="watch -n 2 status/rack-health --live"
            status="NOMINAL"
            tags={['SERVER_NODES', 'TELEMETRY', 'DEPLOYED']}
          />

          <div className="server-rack mb-4 terminal-stagger-reveal" style={{ '--reveal-delay': '70ms' }}>
            <div className="server-rack-command">
              <span className="text-cyan-400">$</span> {rackCommand}
            </div>
            <div className="server-rack-cap">╔════════════════════════════════════╗</div>
            {serverNodes.map((node, index) => (
              <React.Fragment key={node.name}>
                <div className="server-rack-line" style={{ '--rack-delay': `${index * 130}ms` }}>
                  <span className="server-rack-glyph">║</span>
                  <span className="server-rack-blocks">
                    <span className="server-rack-blocks-dim">{fullBlocks}</span>
                    <span className="server-rack-blocks-live" style={{ '--rack-load': `${node.load}%` }}>
                      {fullBlocks}
                    </span>
                  </span>
                  <span className="server-rack-glyph">║</span>
                  <span className="server-rack-label">
                    {node.name} <span className="server-rack-state">[ACTIVE]</span>
                  </span>
                </div>
                <div className="server-rack-telemetry">
                  load {node.load}% | latency {node.latency}ms | io {node.io} mb/s
                </div>
                {index < serverNodes.length - 1 && <div className="server-rack-divider">╠════════════════════════════════════╣</div>}
              </React.Fragment>
            ))}
            <div className="server-rack-cap">╚════════════════════════════════════╝</div>
            <div className="server-rack-sync">last sync: {lastSync}</div>
          </div>

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
        </SectionFrame>
      </div>
    </section>
  );
};

export default Projects;
