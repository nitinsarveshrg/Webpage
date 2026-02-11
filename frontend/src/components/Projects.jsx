import React, { useMemo, useState } from 'react';
import { ExternalLink, Github, Layers3 } from 'lucide-react';
import { portfolioData } from '../mock';

const FILTERS = [
  { id: 'all', label: 'all' },
  { id: 'aws', label: 'aws' },
  { id: 'automation', label: 'automation' },
  { id: 'testing', label: 'testing' },
  { id: 'web', label: 'web' },
  { id: 'platform', label: 'platform' },
];

const resolveFilterHit = (project, filterId) => {
  if (filterId === 'all') return true;

  const bag = `${project.title} ${project.description} ${project.technologies.join(' ')} ${project.highlights.join(' ')}`.toLowerCase();

  if (filterId === 'aws') return bag.includes('aws') || bag.includes('ecs') || bag.includes('fargate');
  if (filterId === 'automation') return bag.includes('automation') || bag.includes('cicd') || bag.includes('pipeline') || bag.includes('terraform');
  if (filterId === 'testing') return bag.includes('selenium') || bag.includes('testng') || bag.includes('bdd') || bag.includes('allure');
  if (filterId === 'web') return bag.includes('react') || bag.includes('javascript') || bag.includes('portfolio') || bag.includes('frontend');
  if (filterId === 'platform') return bag.includes('cloud') || bag.includes('infrastructure') || bag.includes('fastapi') || bag.includes('devops');

  return true;
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return portfolioData.projects.filter((project) => {
      const filterMatch = resolveFilterHit(project, activeFilter);
      const queryBag = `${project.title} ${project.description} ${project.technologies.join(' ')} ${project.highlights.join(' ')}`.toLowerCase();
      const queryMatch = query.trim() ? queryBag.includes(query.toLowerCase().trim()) : true;
      return filterMatch && queryMatch;
    });
  }, [activeFilter, query]);

  return (
    <section id="projects" className="page-section section-band">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <div className="section-headline">
          <span className="section-label">builds</span>
          <h2>Delivery Portfolio</h2>
          <p>Synced GitHub project catalog with descriptions, repository links, and full skill/technology coverage.</p>
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
              placeholder="search by repo, skill, or keyword"
            />
          </div>
          <div className="project-count">{filteredProjects.length} repo match</div>
        </div>

        {filteredProjects.length > 0 && (
          <div className="project-grid-new">
            {filteredProjects.map((project) => (
              <article key={project.id} className="glass-card project-card-new">
                <div className="project-feature-head">
                  <span className="badge">github project</span>
                  <h4>{project.title}</h4>
                </div>

                <p>{project.description}</p>

                <div className="project-skill-head">
                  <Layers3 size={14} />
                  <span>skills / technologies</span>
                </div>
                <div className="project-tech-row">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="chip">{tech}</span>
                  ))}
                </div>

                <ul>
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={14} /> github
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} /> live
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="glass-card project-empty-state">
            no github project matches this filter/search.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
