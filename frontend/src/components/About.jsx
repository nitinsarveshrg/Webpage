import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../mock';

const METRICS = [
  { val: 3, suffix: '+', lbl: 'Years Cloud & DevOps' },
  { val: 99, suffix: '.9%', lbl: 'Uptime SLA achieved' },
  { val: 60, suffix: '%', lbl: 'Deploy time reduced' },
  { val: 5, suffix: '+', lbl: 'Cloud certifications' },
];

const CountUp = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true;
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setCount(Math.round(ease * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref} className="ab-metric-val">{count}{suffix}</span>;
};

const About = () => (
  <section id="about" className="nx-section ab-section">
    <div className="section-anchor" aria-hidden="true" />
    <div className="about-chapter" aria-hidden="true">01</div>

    <div className="content-wrap">
      <div className="ab-header" data-reveal>
        <span className="section-label">ABOUT</span>
        <h2 className="ab-title">
          Operator<br /><em>Profile</em>
        </h2>
      </div>

      <div className="ab-layout">
        <div className="ab-body" data-reveal data-reveal-delay="2">
          <p>
            Cloud &amp; DevOps Engineer with hands-on experience building, automating, and operating
            production infrastructure at scale. I design systems that are resilient, observable,
            and relentlessly optimized — built to run and never fail.
          </p>
          <p>
            My stack spans the full delivery pipeline: infrastructure as code with Terraform and
            Ansible, container orchestration with Kubernetes and ECS, CI/CD via GitHub Actions,
            Jenkins, and ArgoCD. Observability through Prometheus, Grafana, CloudWatch, and Datadog.
          </p>
          <p>
            I operate across AWS, Azure, and GCP — with a bias for automation, an obsession with
            reliability, and zero tolerance for manual deployments.
          </p>
        </div>

        <div className="ab-metrics" data-reveal data-reveal-delay="3">
          {METRICS.map((m) => (
            <div key={m.lbl} className="ab-metric">
              <CountUp target={m.val} suffix={m.suffix} />
              <span className="ab-metric-lbl">{m.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
