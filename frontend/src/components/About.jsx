import React from 'react';
import { portfolioData } from '../mock';

const METRICS = [
  { val: '3+', lbl: 'Years in Cloud & DevOps' },
  { val: '99.9%', lbl: 'Uptime SLA achieved' },
  { val: '60%', lbl: 'Deployment time reduced' },
  { val: '5+', lbl: 'Cloud Certifications' },
];

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
            Cloud & DevOps Engineer with hands-on experience building, automating, and operating
            production infrastructure at scale. I design systems that are resilient, observable,
            and relentlessly optimized.
          </p>
          <p>
            My toolkit spans the full delivery pipeline — infrastructure as code with Terraform
            and Ansible, container orchestration with Kubernetes and ECS, and CI/CD workflows
            through GitHub Actions, Jenkins, and ArgoCD.
          </p>
          <p>
            I operate across AWS, Azure, and GCP with a bias for automation, a obsession with
            observability, and a commitment to zero-downtime deployments.
          </p>
        </div>

        <div className="ab-metrics" data-reveal data-reveal-delay="3">
          {METRICS.map((m) => (
            <div key={m.lbl} className="ab-metric">
              <span className="ab-metric-val">{m.val}</span>
              <span className="ab-metric-lbl">{m.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
