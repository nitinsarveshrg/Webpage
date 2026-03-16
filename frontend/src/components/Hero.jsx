import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../mock';
import { scrollToSectionById } from '../lib/sectionScroll';

const CODE_LINES = [
  { prompt: '$', cmd: 'kubectl get nodes --all-namespaces', delay: 0 },
  { out: 'node-01   Ready   control-plane   47d', delay: 600 },
  { out: 'node-02   Ready   worker          47d', delay: 900 },
  { out: 'node-03   Ready   worker          47d', delay: 1200 },
  { prompt: '$', cmd: 'terraform plan -out=prod.tfplan', delay: 2000 },
  { out: 'Plan: 0 to add, 0 to change, 0 to destroy.', delay: 2600 },
  { prompt: '$', cmd: 'argocd app list', delay: 3400 },
  { out: '3/3 apps  Synced  Healthy  ✓', delay: 4000 },
];

const Hero = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const certs = useMemo(() => portfolioData.certifications.slice(0, 2), []);

  useEffect(() => {
    const timers = CODE_LINES.map((_, i) =>
      window.setTimeout(() => setVisibleLines(i + 1), CODE_LINES[i].delay + 600)
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <section id="hero" className="nx-section hero-section">
      <div className="section-anchor" aria-hidden="true" />

      <div className="hero-status" data-reveal>
        <span className="hero-status-dot" aria-hidden="true" />
        <span>AVAILABLE</span>
        <span className="hero-status-sep" aria-hidden="true">·</span>
        <span>TORONTO, CANADA</span>
        <span className="hero-status-sep" aria-hidden="true">·</span>
        <span>CLOUD · DEVOPS · SRE</span>
      </div>

      <div className="content-wrap hero-wrap">
        <div className="hero-left">
          <div className="hero-monogram" data-reveal>NS</div>
          <div className="hero-name">
            <span className="hero-name-first" data-reveal data-reveal-delay="1">NITIN</span>
            <span className="hero-name-last" data-reveal data-reveal-delay="2">SARVESH</span>
          </div>
          <p className="hero-role" data-reveal data-reveal-delay="3">{portfolioData.personal.title}</p>
          <p className="hero-tagline" data-reveal data-reveal-delay="4">{portfolioData.personal.tagline}</p>
          <div className="hero-certs" data-reveal data-reveal-delay="5">
            {certs.map((c) => (
              <span key={c.id} className="hero-cert">
                <ShieldCheck size={10} /> {c.name}
              </span>
            ))}
          </div>
          <div className="hero-actions" data-reveal data-reveal-delay="6">
            <button className="btn-primary" onClick={() => scrollToSectionById('projects')}>View Work</button>
            <button className="btn-ghost" onClick={() => scrollToSectionById('contact')}>Hire Me →</button>
          </div>
        </div>

        <aside className="hero-terminal" data-reveal data-reveal-delay="4">
          <div className="hero-t-bar">
            <span className="hero-t-dots" aria-hidden="true"><span /><span /><span /></span>
            <span className="hero-t-title">nitin@k8s-prod:~$</span>
          </div>
          <div className="hero-t-body">
            {CODE_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={line.prompt ? 'hero-t-cmd' : 'hero-t-out'}>
                {line.prompt && <span className="hero-t-prompt">$</span>}
                <span>{line.prompt ? line.cmd : line.out}</span>
              </div>
            ))}
            {visibleLines < CODE_LINES.length && (
              <div className="hero-t-cmd">
                <span className="hero-t-prompt">$</span>
                <span className="hero-t-cursor" aria-hidden="true" />
              </div>
            )}
          </div>
        </aside>
      </div>

      <button className="hero-scroll-cta" onClick={() => scrollToSectionById('about')} aria-label="Scroll down" data-reveal data-reveal-delay="7">
        <ChevronDown size={18} />
      </button>
    </section>
  );
};

export default Hero;
