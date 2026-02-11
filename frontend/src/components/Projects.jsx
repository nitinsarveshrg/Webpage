import React, { useEffect, useMemo, useState } from 'react';
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

const GITHUB_USER = 'nitinsarveshrg';
const GITHUB_REPOS_API = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;

const SKILL_SYNONYMS = {
  AWS: ['aws', 'ecs', 'ecr', 'fargate', 'alb', 'cloudwatch', 'vpc'],
  Azure: ['azure', 'azdo', 'azure devops'],
  GCP: ['gcp', 'google cloud'],
  Docker: ['docker', 'container'],
  Kubernetes: ['kubernetes', 'k8s'],
  Helm: ['helm'],
  Terraform: ['terraform', 'hcl'],
  Ansible: ['ansible'],
  Jenkins: ['jenkins'],
  'GitHub Actions': ['github actions', 'actions'],
  ArgoCD: ['argocd'],
  Python: ['python', 'fastapi'],
  Bash: ['bash', 'shell'],
  SQL: ['sql'],
  'JavaScript/TypeScript': ['javascript', 'typescript', 'react', 'node.js', 'node'],
  Prometheus: ['prometheus'],
  Grafana: ['grafana'],
  'ELK Stack': ['elk', 'elasticsearch', 'logstash', 'kibana'],
  CloudWatch: ['cloudwatch'],
  Dynatrace: ['dynatrace'],
  DataDog: ['datadog'],
};

const resolveFilterHit = (project, filterId) => {
  if (filterId === 'all') return true;

  const bag = `${project.title} ${project.description} ${(project.technologies || []).join(' ')} ${(project.highlights || []).join(' ')} ${(project.matchedSkills || []).join(' ')}`.toLowerCase();

  if (filterId === 'aws') return bag.includes('aws') || bag.includes('ecs') || bag.includes('fargate');
  if (filterId === 'automation') return bag.includes('automation') || bag.includes('cicd') || bag.includes('pipeline') || bag.includes('terraform');
  if (filterId === 'testing') return bag.includes('selenium') || bag.includes('testng') || bag.includes('bdd') || bag.includes('allure');
  if (filterId === 'web') return bag.includes('react') || bag.includes('javascript') || bag.includes('portfolio') || bag.includes('frontend');
  if (filterId === 'platform') return bag.includes('cloud') || bag.includes('infrastructure') || bag.includes('fastapi') || bag.includes('devops');

  return true;
};

const repoNameFromGithubUrl = (url = '') => {
  const match = url.match(/github\.com\/[^/]+\/([^/?#]+)/i);
  return match ? match[1] : '';
};

const titleFromRepoName = (name = '') => {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
};

const deriveMatchedSkills = (project) => {
  const bag = `${project.title} ${project.description} ${(project.technologies || []).join(' ')} ${(project.highlights || []).join(' ')}`.toLowerCase();

  return Object.entries(SKILL_SYNONYMS)
    .filter(([, keys]) => keys.some((key) => bag.includes(key.toLowerCase())))
    .map(([skill]) => skill)
    .slice(0, 10);
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [projects, setProjects] = useState(() => []);
  const [isSyncing, setIsSyncing] = useState(true);
  const [syncError, setSyncError] = useState('');

  const fallbackProjects = useMemo(() => {
    return (portfolioData.projects || []).map((project) => ({
      ...project,
      matchedSkills: deriveMatchedSkills(project),
    }));
  }, []);

  useEffect(() => {
    let cancelled = false;

    const manualByRepo = new Map(
      (portfolioData.projects || [])
        .map((project) => [repoNameFromGithubUrl(project.github), project])
        .filter(([name]) => Boolean(name))
    );

    const syncGithubProjects = async () => {
      setIsSyncing(true);
      setSyncError('');

      try {
        const reposRes = await fetch(GITHUB_REPOS_API, {
          headers: { Accept: 'application/vnd.github+json' },
        });

        if (!reposRes.ok) {
          throw new Error(`GitHub sync failed (${reposRes.status})`);
        }

        const reposPayload = await reposRes.json();
        const repos = Array.isArray(reposPayload) ? reposPayload : [];

        const eligibleRepos = repos
          .filter((repo) => !repo.fork && !repo.archived)
          .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

        const languageEntries = await Promise.all(
          eligibleRepos.map(async (repo) => {
            try {
              const res = await fetch(repo.languages_url, {
                headers: { Accept: 'application/vnd.github+json' },
              });

              if (!res.ok) return [repo.name, []];

              const payload = await res.json();
              const list = payload && typeof payload === 'object' ? Object.keys(payload) : [];
              return [repo.name, list];
            } catch {
              return [repo.name, []];
            }
          })
        );

        const languageMap = new Map(languageEntries);

        const syncedProjects = eligibleRepos.map((repo) => {
          const manual = manualByRepo.get(repo.name);
          const apiLanguages = languageMap.get(repo.name) || [];
          const topicTech = (repo.topics || []).map((topic) => topic.replace(/-/g, ' '));

          const technologies = Array.from(
            new Set([
              ...(manual?.technologies || []),
              ...apiLanguages,
              ...(repo.language ? [repo.language] : []),
              ...topicTech,
            ])
          ).filter(Boolean);

          const baseProject = {
            id: repo.id,
            title: manual?.title || titleFromRepoName(repo.name),
            description:
              manual?.description ||
              repo.description ||
              `GitHub project focused on ${repo.language || 'software engineering'} delivery and implementation.`,
            technologies,
            highlights:
              manual?.highlights?.length
                ? manual.highlights
                : [
                    `Primary language: ${repo.language || 'Mixed'}`,
                    `Last pushed: ${new Date(repo.pushed_at).toLocaleDateString()}`,
                    `Default branch: ${repo.default_branch}`,
                    `${repo.stargazers_count} stars · ${repo.forks_count} forks`,
                  ],
            github: repo.html_url,
            demo: repo.homepage || manual?.demo || '',
          };

          return {
            ...baseProject,
            matchedSkills: deriveMatchedSkills(baseProject),
          };
        });

        if (!cancelled) {
          setProjects(syncedProjects);
          setIsSyncing(false);
        }
      } catch (error) {
        if (!cancelled) {
          setProjects(fallbackProjects);
          setSyncError(error instanceof Error ? error.message : 'GitHub sync failed');
          setIsSyncing(false);
        }
      }
    };

    syncGithubProjects();

    return () => {
      cancelled = true;
    };
  }, [fallbackProjects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const filterMatch = resolveFilterHit(project, activeFilter);
      const queryBag = `${project.title} ${project.description} ${(project.technologies || []).join(' ')} ${(project.highlights || []).join(' ')} ${(project.matchedSkills || []).join(' ')}`.toLowerCase();
      const queryMatch = query.trim() ? queryBag.includes(query.toLowerCase().trim()) : true;
      return filterMatch && queryMatch;
    });
  }, [activeFilter, query, projects]);

  return (
    <section id="projects" className="page-section section-band">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">
        <div className="section-headline">
          <span className="section-label">builds</span>
          <h2>Delivery Portfolio</h2>
          <p>Live GitHub sync with project descriptions, repository links, and full mapped skills/technology coverage.</p>
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
          <div className={`project-sync-state ${syncError ? 'warn' : ''}`}>
            {isSyncing ? 'syncing github...' : syncError ? 'sync fallback active' : `synced from github (${projects.length})`}
          </div>
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
                  {(project.technologies || []).map((tech) => (
                    <span key={tech} className="chip">{tech}</span>
                  ))}
                </div>

                {(project.matchedSkills || []).length > 0 && (
                  <>
                    <div className="project-skill-head">
                      <Layers3 size={14} />
                      <span>matched core skills</span>
                    </div>
                    <div className="project-tech-row project-tech-row-skill">
                      {project.matchedSkills.map((skill) => (
                        <span key={skill} className="chip skill-chip">{skill}</span>
                      ))}
                    </div>
                  </>
                )}

                <ul>
                  {(project.highlights || []).map((item) => (
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
