import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { portfolioData } from '../mock';

const FILTERS = ['All', 'AWS', 'Automation', 'Testing', 'Web', 'Platform'];

const GITHUB_USER = 'nitinsarveshrg';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;

const SKILL_MAP = {
  AWS: ['aws', 'ecs', 'ecr', 'fargate', 'cloudwatch', 'vpc'],
  Azure: ['azure', 'azdo'],
  Docker: ['docker', 'container'],
  Kubernetes: ['kubernetes', 'k8s'],
  Terraform: ['terraform', 'hcl'],
  Ansible: ['ansible'],
  Jenkins: ['jenkins'],
  'GitHub Actions': ['github actions', 'actions'],
  ArgoCD: ['argocd'],
  Python: ['python', 'fastapi'],
  Bash: ['bash', 'shell'],
  SQL: ['sql'],
  React: ['react', 'javascript', 'typescript'],
  Prometheus: ['prometheus'],
  Grafana: ['grafana'],
};

const deriveSkills = (project) => {
  const bag = `${project.title} ${project.description} ${(project.technologies || []).join(' ')}`.toLowerCase();
  return Object.entries(SKILL_MAP)
    .filter(([, keys]) => keys.some((k) => bag.includes(k)))
    .map(([s]) => s)
    .slice(0, 6);
};

const matchesFilter = (project, filter) => {
  if (filter === 'All') return true;
  const bag = `${project.title} ${project.description} ${(project.technologies || []).join(' ')}`.toLowerCase();
  if (filter === 'AWS') return bag.includes('aws') || bag.includes('ecs') || bag.includes('fargate');
  if (filter === 'Automation') return bag.includes('automation') || bag.includes('pipeline') || bag.includes('terraform') || bag.includes('cicd');
  if (filter === 'Testing') return bag.includes('selenium') || bag.includes('testng') || bag.includes('bdd') || bag.includes('allure');
  if (filter === 'Web') return bag.includes('react') || bag.includes('javascript') || bag.includes('portfolio') || bag.includes('frontend');
  if (filter === 'Platform') return bag.includes('cloud') || bag.includes('infrastructure') || bag.includes('fastapi') || bag.includes('devops');
  return true;
};

const repoName = (url = '') => {
  const m = url.match(/github\.com\/[^/]+\/([^/?#]+)/i);
  return m ? m[1] : '';
};

const titleFromName = (name = '') =>
  name.replace(/[-_]+/g, ' ').trim().replace(/\b\w/g, (c) => c.toUpperCase());

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [syncing, setSyncing] = useState(true);
  const [syncError, setSyncError] = useState('');

  const fallback = useMemo(() =>
    (portfolioData.projects || []).map((p) => ({ ...p, matchedSkills: deriveSkills(p) })),
  []);

  useEffect(() => {
    let cancelled = false;
    const manualMap = new Map(
      (portfolioData.projects || []).map((p) => [repoName(p.github), p]).filter(([n]) => n)
    );

    (async () => {
      setSyncing(true);
      try {
        const res = await fetch(GITHUB_API, { headers: { Accept: 'application/vnd.github+json' } });
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        const repos = (await res.json()).filter((r) => !r.fork && !r.archived);

        const langEntries = await Promise.all(
          repos.map(async (r) => {
            try {
              const lr = await fetch(r.languages_url, { headers: { Accept: 'application/vnd.github+json' } });
              return [r.name, lr.ok ? Object.keys(await lr.json()) : []];
            } catch { return [r.name, []]; }
          })
        );
        const langMap = new Map(langEntries);

        const synced = repos.map((r) => {
          const manual = manualMap.get(r.name);
          const techs = [...new Set([
            ...(manual?.technologies || []),
            ...(langMap.get(r.name) || []),
            ...(r.language ? [r.language] : []),
            ...(r.topics || []).map((t) => t.replace(/-/g, ' ')),
          ])].filter(Boolean);

          const base = {
            id: r.id,
            title: manual?.title || titleFromName(r.name),
            description: manual?.description || r.description || `${r.language || 'Software'} project.`,
            technologies: techs,
            highlights: manual?.highlights?.length ? manual.highlights : [
              `Language: ${r.language || 'Mixed'}`,
              `Updated: ${new Date(r.pushed_at).toLocaleDateString()}`,
              `${r.stargazers_count} stars · ${r.forks_count} forks`,
            ],
            github: r.html_url,
            demo: r.homepage || manual?.demo || '',
          };
          return { ...base, matchedSkills: deriveSkills(base) };
        });

        if (!cancelled) { setProjects(synced); setSyncing(false); }
      } catch (e) {
        if (!cancelled) { setProjects(fallback); setSyncError(String(e.message)); setSyncing(false); }
      }
    })();

    return () => { cancelled = true; };
  }, [fallback]);

  const filtered = useMemo(() =>
    projects.filter((p) => {
      const filterOk = matchesFilter(p, activeFilter);
      const bag = `${p.title} ${p.description} ${(p.technologies || []).join(' ')}`.toLowerCase();
      const qOk = query.trim() ? bag.includes(query.toLowerCase()) : true;
      return filterOk && qOk;
    }),
  [projects, activeFilter, query]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section id="projects" className="nx-section proj-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">

        {/* Header */}
        <div className="proj-header">
          <div className="proj-header-left">
            <span className="proj-tag">PORTFOLIO</span>
            <h2>Live GitHub Projects</h2>
          </div>
          <div className="proj-sync-badge">
            <span className={`proj-sync-dot ${syncing ? 'syncing' : syncError ? 'error' : 'ok'}`} />
            <span>{syncing ? 'Syncing…' : syncError ? 'Fallback' : `${projects.length} repos synced`}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="proj-controls">
          <div className="proj-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`proj-filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >{f}</button>
            ))}
          </div>
          <div className="proj-search">
            <span className="proj-search-icon">⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search repos, tech, keywords…"
            />
            <span className="proj-search-count">{filtered.length}</span>
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="proj-empty">No repos match — try a different filter.</div>
        )}

        {/* Featured */}
        {featured && (
          <article className="proj-featured">
            <div className="proj-featured-top">
              <span className="proj-feat-label">★ FEATURED</span>
              <div className="proj-links">
                {featured.github && (
                  <a href={featured.github} target="_blank" rel="noopener noreferrer">
                    <Github size={14} /> GitHub
                  </a>
                )}
                {featured.demo && (
                  <a href={featured.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} /> Live
                  </a>
                )}
              </div>
            </div>
            <h3 className="proj-featured-title">{featured.title}</h3>
            <p className="proj-featured-desc">{featured.description}</p>
            <div className="proj-featured-meta">
              <div className="proj-chip-row">
                {(featured.technologies || []).map((t) => (
                  <span key={t} className="proj-chip">{t}</span>
                ))}
              </div>
              {featured.matchedSkills?.length > 0 && (
                <div className="proj-chip-row">
                  {featured.matchedSkills.map((s) => (
                    <span key={s} className="proj-chip proj-chip-accent">{s}</span>
                  ))}
                </div>
              )}
            </div>
            <ul className="proj-highlights">
              {(featured.highlights || []).map((h) => (
                <li key={h}><span className="proj-bullet">▸</span>{h}</li>
              ))}
            </ul>
          </article>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="proj-grid">
            {rest.map((p, i) => (
              <article key={p.id} className="proj-card">
                <div className="proj-card-idx">{String(i + 2).padStart(2, '0')}</div>
                <h3 className="proj-card-title">{p.title}</h3>
                <p className="proj-card-desc">{p.description}</p>
                <div className="proj-chip-row">
                  {(p.technologies || []).slice(0, 5).map((t) => (
                    <span key={t} className="proj-chip">{t}</span>
                  ))}
                </div>
                <ul className="proj-card-highlights">
                  {(p.highlights || []).slice(0, 2).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="proj-card-links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer">
                      <Github size={12} /> GitHub
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;
