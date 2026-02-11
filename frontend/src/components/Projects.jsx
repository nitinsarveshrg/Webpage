import React, { useMemo, useState } from 'react';
import { ExternalLink, Github, Rocket } from 'lucide-react';
import { portfolioData } from '../mock';

const FILTERS = [
  { id: 'all', label: 'all' },
  { id: 'aws', label: 'aws' },
  { id: 'automation', label: 'automation' },
  { id: 'platform', label: 'platform' },
];

const resolveFilterHit = (project, filterId) => {
  if (filterId === 'all') return true;
  const bag = `${project.title} ${project.description} ${project.technologies.join(' ')} ${project.highlights.join(' ')}`.toLowerCase();

  if (filterId === 'aws') return bag.includes('aws');
  if (filterId === 'automation') return bag.includes('automation') || bag.includes('cicd') || bag.includes('pipeline');
  if (filterId === 'platform') return bag.includes('cloud') || bag.includes('infrastructure') || bag.includes('terraform');
  return true;
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return portfolioData.projects.filter((project) => {
      const filterMatch = resolveFilterHit(project, activeFilter);
      const queryBag = `${project.title} ${project.description} ${project.technologies.join(' ')}`.toLowerCase();
      const queryMatch = query.trim() ? queryBag.includes(query.toLowerCase().trim()) : true;
      return filterMatch && queryMatch;
    });
  }, [activeFilter, query]);

  const [featured, ...others] = filteredProjects;

  return (
    <section id="projects" className="page-section section-band">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <div className="section-headline">
          <span className="section-label">builds</span>
          <h2>Delivery Portfolio</h2>
          <p>Live filterable project feed focused on deployability, scale, and production outcomes.</p>
        </div>

        <div className="project-controls-row glass-card">
          <div className="project-filter-group">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                className={`project-filter-btn ${filter.id === activeFilter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="project-search-box">
            <span>$ grep</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="search by tech or project"
            />
          </div>
          <div className="project-count">{filteredProjects.length} match</div>
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

        {others.length > 0 && (
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
        )}

        {filteredProjects.length === 0 && (
          <div className="glass-card project-empty-state">
            no project matches this filter/search.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
