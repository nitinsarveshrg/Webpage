import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { portfolioData } from '../mock';

const FILTERS = ['All', 'AWS', 'Automation', 'Testing', 'Web', 'Platform'];
const GITHUB_USER = 'nitinsarveshrg';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;

const SKILL_MAP = {
  AWS: ['aws', 'ecs', 'ecr', 'fargate', 'cloudwatch'],
  Docker: ['docker', 'container'],
  Kubernetes: ['kubernetes', 'k8s'],
  Terraform: ['terraform', 'hcl'],
  Ansible: ['ansible'],
  Jenkins: ['jenkins'],
  'GitHub Actions': ['github actions', 'actions'],
  ArgoCD: ['argocd'],
  Python: ['python', 'fastapi'],
  Bash: ['bash', 'shell'],
  React: ['react', 'javascript', 'typescript'],
  Prometheus: ['prometheus'],
  Grafana: ['grafana'],
};

const deriveSkills = (p) => {
  const bag = `${p.title} ${p.description} ${(p.technologies || []).join(' ')}`.toLowerCase();
  return Object.entries(SKILL_MAP).filter(([, ks]) => ks.some((k) => bag.includes(k))).map(([s]) => s).slice(0, 5);
};

const matchFilter = (p, f) => {
  if (f === 'All') return true;
  const bag = `${p.title} ${p.description} ${(p.technologies || []).join(' ')}`.toLowerCase();
  if (f === 'AWS') return bag.includes('aws') || bag.includes('ecs');
  if (f === 'Automation') return bag.includes('automation') || bag.includes('pipeline') || bag.includes('terraform');
  if (f === 'Testing') return bag.includes('selenium') || bag.includes('testng') || bag.includes('bdd');
  if (f === 'Web') return bag.includes('react') || bag.includes('javascript') || bag.includes('frontend');
  if (f === 'Platform') return bag.includes('cloud') || bag.includes('infrastructure') || bag.includes('devops');
  return true;
};

const repoName = (url = '') => { const m = url.match(/github\.com\/[^/]+\/([^/?#]+)/i); return m ? m[1] : ''; };
const toTitle = (n = '') => n.replace(/[-_]+/g, ' ').trim().replace(/\b\w/g, (c) => c.toUpperCase());

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  const [projects, setProjects] = useState([]);
  const [syncing, setSyncing] = useState(true);
  const [syncErr, setSyncErr] = useState('');

  const fallback = useMemo(() => (portfolioData.projects || []).map((p) => ({ ...p, matchedSkills: deriveSkills(p) })), []);

  useEffect(() => {
    let cancelled = false;
    const manual = new Map((portfolioData.projects || []).map((p) => [repoName(p.github), p]).filter(([n]) => n));
    (async () => {
      try {
        const res = await fetch(GITHUB_API, { headers: { Accept: 'application/vnd.github+json' } });
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        const repos = (await res.json()).filter((r) => !r.fork && !r.archived);
        const langData = await Promise.all(repos.map(async (r) => {
          try { const lr = await fetch(r.languages_url, { headers: { Accept: 'application/vnd.github+json' } }); return [r.name, lr.ok ? Object.keys(await lr.json()) : []]; }
          catch { return [r.name, []]; }
        }));
        const langMap = new Map(langData);
        const synced = repos.map((r) => {
          const m = manual.get(r.name);
          const techs = [...new Set([...(m?.technologies || []), ...(langMap.get(r.name) || []), ...(r.language ? [r.language] : []), ...(r.topics || []).map((t) => t.replace(/-/g, ' '))])].filter(Boolean);
          const base = {
            id: r.id, title: m?.title || toTitle(r.name),
            description: m?.description || r.description || `${r.language || 'Software'} project.`,
            technologies: techs,
            highlights: m?.highlights?.length ? m.highlights : [`Language: ${r.language || 'Mixed'}`, `Updated: ${new Date(r.pushed_at).toLocaleDateString()}`, `${r.stargazers_count} stars`],
            github: r.html_url, demo: r.homepage || m?.demo || '',
          };
          return { ...base, matchedSkills: deriveSkills(base) };
        });
        if (!cancelled) { setProjects(synced); setSyncing(false); }
      } catch (e) {
        if (!cancelled) { setProjects(fallback); setSyncErr(String(e.message)); setSyncing(false); }
      }
    })();
    return () => { cancelled = true; };
  }, [fallback]);

  const filtered = useMemo(() => projects.filter((p) => {
    const fOk = matchFilter(p, filter);
    const qBag = `${p.title} ${p.description} ${(p.technologies || []).join(' ')}`.toLowerCase();
    return fOk && (q.trim() ? qBag.includes(q.toLowerCase()) : true);
  }), [projects, filter, q]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section id="projects" className="nx-section proj-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="proj-chapter" aria-hidden="true">05</div>

      <div className="content-wrap">
        <div className="proj-header">
          <div data-reveal>
            <span className="section-label">PORTFOLIO</span>
            <h2 className="proj-title">Deployed<br /><em>Work</em></h2>
          </div>
          <div className="proj-sync" data-reveal data-reveal-delay="2">
            <span className={`proj-sync-dot ${syncing ? 'pulse' : syncErr ? 'err' : 'ok'}`} />
            <span>{syncing ? 'Syncing GitHub…' : syncErr ? 'Fallback mode' : `${projects.length} repos`}</span>
          </div>
        </div>

        <div className="proj-controls" data-reveal data-reveal-delay="2">
          <div className="proj-filters">
            {FILTERS.map((f) => (
              <button key={f} className={`proj-filter ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="proj-search-wrap">
            <span className="proj-search-icon">⌕</span>
            <input className="proj-search-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="search repos, tech…" />
            <span className="proj-search-count">{filtered.length}</span>
          </div>
        </div>

        {filtered.length === 0 && <p className="proj-empty">No results — try a different filter.</p>}

        {featured && (
          <article className="proj-featured" data-reveal data-reveal-delay="3">
            <div className="proj-feat-top">
              <span className="proj-feat-badge">★ FEATURED</span>
              <div className="proj-feat-links">
                {featured.github && <a href={featured.github} target="_blank" rel="noopener noreferrer"><Github size={13} /> GitHub</a>}
                {featured.demo && <a href={featured.demo} target="_blank" rel="noopener noreferrer"><ExternalLink size={13} /> Live</a>}
              </div>
            </div>
            <h3 className="proj-feat-title">{featured.title}</h3>
            <p className="proj-feat-desc">{featured.description}</p>
            <div className="proj-chips">
              {(featured.technologies || []).map((t) => <span key={t} className="proj-chip">{t}</span>)}
            </div>
            {featured.matchedSkills?.length > 0 && (
              <div className="proj-chips">
                {featured.matchedSkills.map((s) => <span key={s} className="proj-chip-accent">{s}</span>)}
              </div>
            )}
            <ul className="proj-feat-hl">
              {(featured.highlights || []).map((h) => <li key={h}><span className="proj-bullet">▸</span>{h}</li>)}
            </ul>
          </article>
        )}

        {rest.length > 0 && (
          <div className="proj-grid">
            {rest.map((p, i) => (
              <article key={p.id} className="proj-card" data-reveal data-reveal-delay={Math.min(i + 1, 5)}>
                <span className="proj-card-num">{String(i + 2).padStart(2, '0')}</span>
                <h3 className="proj-card-title">{p.title}</h3>
                <p className="proj-card-desc">{p.description}</p>
                <div className="proj-chips">
                  {(p.technologies || []).slice(0, 4).map((t) => <span key={t} className="proj-chip">{t}</span>)}
                </div>
                <div className="proj-card-links">
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer"><Github size={12} /> GitHub</a>}
                  {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer"><ExternalLink size={12} /> Live</a>}
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
