import React from 'react';
import { ExternalLink, Github, Rocket } from 'lucide-react';
import { portfolioData } from '../mock';

const Projects = () => {
  const [featured, ...others] = portfolioData.projects;

  return (
    <section id="projects" className="page-section section-band">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <div className="section-headline">
          <span className="section-label">builds</span>
          <h2>Delivery Portfolio</h2>
          <p>Real projects focused on deployability, scale, and operational reliability.</p>
        </div>

        {featured && (
          <article className="glass-card project-feature-card">
            <div className="project-feature-head">
              <span className="badge">featured</span>
              <h3>{featured.title}</h3>
            </div>
            <p>{featured.description}</p>

            <div className="project-tech-row">
              {featured.technologies.map((tech) => (
                <span key={tech} className="chip">{tech}</span>
              ))}
            </div>

            <div className="project-highlight-row">
              {featured.highlights.map((item) => (
                <div key={item} className="project-highlight-item">
                  <Rocket size={14} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="project-links">
              {featured.github && (
                <a href={featured.github} target="_blank" rel="noopener noreferrer">
                  <Github size={14} /> source
                </a>
              )}
              <a href={featured.github || '#'} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} /> details
              </a>
            </div>
          </article>
        )}

        <div className="project-grid-new">
          {others.map((project) => (
            <article key={project.id} className="glass-card project-card-new">
              <h4>{project.title}</h4>
              <p>{project.description}</p>

              <div className="project-tech-row">
                {project.technologies.slice(0, 6).map((tech) => (
                  <span key={tech} className="chip">{tech}</span>
                ))}
              </div>

              <ul>
                {project.highlights.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github size={14} /> source
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
