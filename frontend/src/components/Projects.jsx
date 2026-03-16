import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
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
  return Object.entries(SKILL_MAP).filter(([, ks]) => ks.some((k) => bag.includes(k))).map(([s]) => s).slice(0, 4);
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

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.8, ease: [0.16, 0.86, 0.24, 1], delay },
});

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [syncing, setSyncing] = useState(true);

  const fallback = useMemo(
    () => (portfolioData.projects || []).map((p) => ({ ...p, matchedSkills: deriveSkills(p) })),
    []
  );

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
      } catch {
        if (!cancelled) { setProjects(fallback); setSyncing(false); }
      }
    })();
    return () => { cancelled = true; };
  }, [fallback]);

  const list = useMemo(() => (projects.length ? projects : fallback).filter((p) => matchFilter(p, filter)), [projects, fallback, filter]);

  return (
    <section id="projects" className="nx-section projects-section">
      <div className="section-anchor" aria-hidden="true" />
      <div className="content-wrap">

        <motion.div {...inView(0)}>
          <div className="section-label">Projects</div>
          <h2 className="section-heading">
            Work in<br /><em>production.</em>
          </h2>
        </motion.div>

        <motion.div className="projects-filters" {...inView(0.12)}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`pf-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {syncing && (
          <div style={{ color: 'var(--text-3)', fontSize: '0.80rem', fontFamily: 'var(--mono)', marginBottom: '2rem' }}>
            Syncing GitHub…
          </div>
        )}

        <div className="projects-grid">
          {list.map((p, i) => (
            <motion.div key={p.id} className="proj-card" {...inView(0.06 + i * 0.04)}>
              <div className="proj-title">{p.title}</div>
              <div className="proj-desc">{p.description}</div>

              {p.highlights?.length > 0 && (
                <div className="proj-highlights">
                  {p.highlights.slice(0, 3).map((h) => (
                    <div key={h} className="proj-highlight">{h}</div>
                  ))}
                </div>
              )}

              <div className="proj-tags">
                {(p.matchedSkills || []).map((s) => (
                  <span key={s} className="proj-tag">{s}</span>
                ))}
              </div>

              <div className="proj-links">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link">
                    <Github size={12} /> Code
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="proj-link">
                    <ExternalLink size={12} /> Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
