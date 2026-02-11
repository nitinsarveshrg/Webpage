import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Terminal, ChevronDown } from 'lucide-react';
import { portfolioData } from '../mock';
import TypingEffect from './TypingEffect';
import MatrixRain from './MatrixRain';
import { scrollToSectionById } from '../lib/sectionScroll';

const bootMessages = [
  '[BOOT] Initializing cloud runtime...',
  '[OK] AWS Services: ONLINE',
  '[OK] Kubernetes Cluster: ACTIVE',
  '[OK] CI/CD Pipeline: RUNNING',
  '[OK] Terraform State: SYNCED',
  '[OK] Monitoring: ALL SYSTEMS NOMINAL',
  '[OK] Race Telemetry Profile: MERCEDES + VERSTAPPEN',
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);
const QUICK_COMMANDS = [
  { id: 'profile', label: 'profile', section: 'about' },
  { id: 'toolchain', label: 'toolchain', section: 'skills' },
  { id: 'runbook', label: 'runbook', section: 'experience' },
  { id: 'cert_store', label: 'cert_store', section: 'certifications' },
  { id: 'secure_link', label: 'secure_link', section: 'contact' },
];

const COMMAND_OUTPUT = {
  profile: [
    '> identity_decryption.sh',
    '> Cloud DevOps Engineer | 5+ years hands-on',
    '> Multi-cloud: AWS, Azure, GCP',
    '> Personal mode: Mercedes + Max Verstappen fan',
  ],
  toolchain: [
    '> loading capability matrix...',
    '> IaC: Terraform/Ansible/Helm',
    '> Containers: Docker + Kubernetes',
    '> CI/CD: Jenkins, ArgoCD, GitHub Actions',
  ],
  runbook: [
    '> tail -f career.log',
    '> 99.99% reliability improvements delivered',
    '> MTTR reduced by 45%',
    '> cloud cost reduced by 20%',
  ],
  cert_store: [
    '> verify --credentials --active',
    '> AWS SAA [ACTIVE]',
    '> HashiCorp Terraform Associate [ACTIVE]',
    '> secure trust store loaded',
  ],
  secure_link: [
    '> establish_secure_channel --encrypted',
    '> hCaptcha guard active',
    '> no external redirect',
    '> channel ready: transmit_message',
  ],
};

const Hero = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [heroRevealStep, setHeroRevealStep] = useState(0);
  const [runtimeStats, setRuntimeStats] = useState({
    cpu: randomInt(28, 61),
    mem: randomInt(42, 76),
    load: randomFloat(0.62, 1.84),
    net: randomInt(380, 980),
  });
  const [opsStats, setOpsStats] = useState({
    pods: randomInt(22, 48),
    deploys: randomInt(160, 310),
    incidents: randomInt(0, 4),
    p99: randomInt(72, 148),
  });
  const [activeCommand, setActiveCommand] = useState('profile');

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setVisibleLines(1);
    }, 220);

    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= bootMessages.length) {
          clearInterval(interval);
          setTimeout(() => setBootComplete(true), 350);
          setTimeout(() => setShowContent(true), 700);
          return prev;
        }
        return prev + 1;
      });
    }, 330);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!showContent) return undefined;

    setHeroRevealStep(0);
    const timers = [
      setTimeout(() => setHeroRevealStep(1), 120),
      setTimeout(() => setHeroRevealStep(2), 340),
      setTimeout(() => setHeroRevealStep(3), 620),
      setTimeout(() => setHeroRevealStep(4), 920),
      setTimeout(() => setHeroRevealStep(5), 1240),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [showContent]);

  useEffect(() => {
    if (!bootComplete) return undefined;

    const intervalId = window.setInterval(() => {
      setRuntimeStats({
        cpu: randomInt(28, 63),
        mem: randomInt(42, 79),
        load: randomFloat(0.62, 1.84),
        net: randomInt(380, 980),
      });
    }, 1700);

    return () => window.clearInterval(intervalId);
  }, [bootComplete]);

  useEffect(() => {
    if (!showContent) return undefined;

    const intervalId = window.setInterval(() => {
      setOpsStats({
        pods: randomInt(22, 48),
        deploys: randomInt(160, 310),
        incidents: randomInt(0, 4),
        p99: randomInt(72, 148),
      });
    }, 1900);

    return () => window.clearInterval(intervalId);
  }, [showContent]);

  const scrollToSection = (sectionId) => {
    scrollToSectionById(sectionId);
  };

  return (
    <section id="hero" className="portfolio-section justify-center bg-black">
      <MatrixRain />

      <div className={`section-shell max-w-7xl mx-auto px-6 py-20 relative z-10 w-full ${visibleLines > 0 ? 'section-frame-grow' : 'section-frame-preroll'}`}>
        <div className="relative bg-black/85 backdrop-blur-sm border border-cyan-500/40 rounded-lg mb-8 font-mono text-sm shadow-2xl shadow-cyan-500/20 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/30 text-cyan-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center gap-2">
              <Terminal size={15} />
              <span className="text-xs tracking-wide">visitor@cloud-shell: ~/portfolio</span>
            </div>
          </div>

          <div className="relative px-5 py-4 space-y-1 text-green-400 min-h-[220px]">
            {bootMessages.slice(0, visibleLines).map((line, idx) => (
              <div key={`${line}-${idx}`} className={idx === 0 ? 'text-cyan-300' : 'ml-3'}>
                <TypingEffect text={line} speed={18} startDelay={20} cursorChar="_" />
              </div>
            ))}

            {bootComplete && (
              <div className="pt-3 text-cyan-300">
                <span>visitor@portfolio:~$ </span>
                <TypingEffect
                  text="./render-profile --full --interactive"
                  speed={14}
                  cursorChar="█"
                  persistCursor
                />
              </div>
            )}

            <div className="terminal-scanlines" />
            <div className="terminal-flicker" />
          </div>
        </div>

        {bootComplete && (
          <div className="hero-runtime-strip">
            <span className="hero-runtime-chip"><span className="hero-runtime-label">MODE</span><span className="hero-runtime-value">LINUX_OPS</span></span>
            <span className="hero-runtime-chip"><span className="hero-runtime-label">CPU</span><span className="hero-runtime-value">{runtimeStats.cpu}%</span></span>
            <span className="hero-runtime-chip"><span className="hero-runtime-label">MEM</span><span className="hero-runtime-value">{runtimeStats.mem}%</span></span>
            <span className="hero-runtime-chip"><span className="hero-runtime-label">LOAD</span><span className="hero-runtime-value">{runtimeStats.load}</span></span>
            <span className="hero-runtime-chip"><span className="hero-runtime-label">NET</span><span className="hero-runtime-value">{runtimeStats.net}mb/s</span></span>
          </div>
        )}

        {showContent && (
          <div className="hero-overhaul-grid section-elongate-load">
            <div className="hero-left">
              {heroRevealStep >= 1 && (
                <div className="hero-block-reveal">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-sm text-cyan-400 font-mono">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>&gt; STATUS: ONLINE | AVAILABLE_FOR_HIRE</span>
                  </div>
                </div>
              )}

              {heroRevealStep >= 2 && (
                <div className="hero-block-reveal">
                  <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight font-mono hero-title-glow">
                    <span className="text-cyan-400">&gt;_ </span>
                    <TypingEffect
                      text={portfolioData.personal.name.split(' ')[0]}
                      speed={38}
                      cursorChar="_"
                      persistCursor
                    />
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 animate-gradient inline-block">
                      <TypingEffect
                        text={portfolioData.personal.name.split(' ').slice(1).join(' ')}
                        speed={32}
                        startDelay={220}
                        cursorChar="_"
                        persistCursor
                      />
                    </span>
                  </h1>
                </div>
              )}

              {heroRevealStep >= 3 && (
                <div className="font-mono hero-block-reveal">
                  <p className="text-xl md:text-2xl text-cyan-400 mb-2 hero-line-sweep">
                    <span className="text-white">&gt;_ </span>
                    <TypingEffect
                      text={portfolioData.personal.title}
                      speed={30}
                      cursorChar="_"
                      persistCursor
                    />
                  </p>
                  <p className="text-base md:text-lg text-zinc-400">
                    [ <TypingEffect text={portfolioData.personal.tagline} speed={18} startDelay={120} cursorChar="_" persistCursor /> ]
                  </p>
                </div>
              )}

              {heroRevealStep >= 4 && (
                <div className="flex flex-col sm:flex-row items-start gap-4 pt-4 font-mono hero-block-reveal">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection('projects')}
                    className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold border-2 border-cyan-400"
                  >
                    &gt; VIEW_PROJECTS
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => scrollToSection('contact')}
                    className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 font-bold"
                  >
                    &gt; INIT_CONTACT
                  </Button>
                </div>
              )}

              {heroRevealStep >= 5 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl">
                  {[
                    { label: 'YEARS_EXP', value: '5+' },
                    { label: 'CLOUD_PLATFORMS', value: '3' },
                    { label: 'DEPLOYMENTS', value: '50+' },
                    { label: 'UPTIME_SLA', value: '99.9%' },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-cyan-500/5 border border-cyan-500/30 rounded p-4 hero-stat-reveal"
                      style={{ animationDelay: `${idx * 140}ms` }}
                    >
                      <div className="text-3xl font-bold text-cyan-400 font-mono">{stat.value}</div>
                      <div className="text-xs text-zinc-500 mt-1 font-mono">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside className="hero-side-console hero-block-reveal">
              <div className="hero-side-head">
                <span className="text-cyan-400">$</span> watch -n 1 /proc/cloud/status
              </div>
              <div className="hero-command-tabs">
                {QUICK_COMMANDS.map((cmd) => (
                  <button
                    key={cmd.id}
                    type="button"
                    onClick={() => setActiveCommand(cmd.id)}
                    className={`hero-command-tab ${activeCommand === cmd.id ? 'hero-command-tab-active' : ''}`}
                  >
                    {cmd.label}
                  </button>
                ))}
              </div>
              <div className="hero-side-grid">
                <div className="hero-side-chip">
                  <span className="hero-side-label">active_pods</span>
                  <span className="hero-side-value">{opsStats.pods}</span>
                </div>
                <div className="hero-side-chip">
                  <span className="hero-side-label">deploys_30d</span>
                  <span className="hero-side-value">{opsStats.deploys}</span>
                </div>
                <div className="hero-side-chip">
                  <span className="hero-side-label">incidents_30d</span>
                  <span className="hero-side-value">{opsStats.incidents}</span>
                </div>
                <div className="hero-side-chip">
                  <span className="hero-side-label">p99_latency</span>
                  <span className="hero-side-value">{opsStats.p99}ms</span>
                </div>
              </div>
              <div className="hero-side-feed">
                <div>[OK] aws-control-plane: stable</div>
                <div>[OK] k8s-workloads: healthy</div>
                <div>[OK] cicd-queue: flowing</div>
                <div>[INFO] f1-mode: mercedes + max</div>
              </div>
              <div className="hero-command-console">
                <div className="hero-command-head">
                  <span className="text-cyan-400">visitor@nitin:~$</span> ./{activeCommand}
                </div>
                <div className="hero-command-output">
                  {COMMAND_OUTPUT[activeCommand].map((line) => (
                    <div key={`${activeCommand}-${line}`}>{line}</div>
                  ))}
                </div>
                <button
                  type="button"
                  className="hero-command-jump"
                  onClick={() => scrollToSection(QUICK_COMMANDS.find((cmd) => cmd.id === activeCommand)?.section || 'about')}
                >
                  open section
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-cyan-400" size={32} />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes flicker {
          0%,
          100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.12;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.9s ease-out;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }

        @keyframes hero-block-reveal {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes hero-line-sweep {
          from {
            clip-path: inset(0 100% 0 0);
            opacity: 0;
          }
          to {
            clip-path: inset(0 0 0 0);
            opacity: 1;
          }
        }

        @keyframes hero-stat-pop {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-block-reveal {
          animation: hero-block-reveal 0.72s cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        .hero-line-sweep {
          animation: hero-line-sweep 0.7s cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        .hero-stat-reveal {
          opacity: 0;
          animation: hero-stat-pop 0.6s ease forwards;
        }

        .hero-title-glow {
          text-shadow: 0 0 18px rgba(34, 211, 238, 0.15);
        }

        .hero-runtime-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin: -0.1rem 0 1.8rem;
          animation: hero-block-reveal 0.65s ease;
        }

        .hero-runtime-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border: 1px solid rgba(34, 211, 238, 0.36);
          background: rgba(8, 15, 25, 0.82);
          border-radius: 9999px;
          padding: 0.2rem 0.62rem;
          box-shadow: inset 0 0 10px rgba(34, 211, 238, 0.12);
        }

        .hero-runtime-label {
          color: #71717a;
          font-size: 0.62rem;
          letter-spacing: 0.11em;
        }

        .hero-runtime-value {
          color: #22d3ee;
          font-size: 0.68rem;
          letter-spacing: 0.05em;
        }

        .hero-overhaul-grid {
          display: grid;
          gap: 1.2rem;
          align-items: start;
        }

        @media (min-width: 1024px) {
          .hero-overhaul-grid {
            grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
          }
        }

        .hero-left {
          text-align: left;
        }

        .hero-side-console {
          border: 1px solid rgba(34, 211, 238, 0.34);
          border-radius: 0.8rem;
          background: linear-gradient(160deg, rgba(4, 9, 16, 0.88), rgba(8, 47, 73, 0.18));
          padding: 0.9rem 0.88rem;
          box-shadow:
            inset 0 0 16px rgba(34, 211, 238, 0.12),
            0 10px 30px rgba(2, 8, 23, 0.45);
        }

        .hero-side-head {
          color: #a1a1aa;
          border-bottom: 1px solid rgba(34, 211, 238, 0.24);
          padding-bottom: 0.5rem;
          margin-bottom: 0.65rem;
          font-size: 0.7rem;
          letter-spacing: 0.06em;
        }

        .hero-side-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.5rem;
        }

        .hero-side-chip {
          border: 1px solid rgba(34, 211, 238, 0.22);
          border-radius: 0.6rem;
          background: rgba(2, 6, 23, 0.78);
          padding: 0.42rem 0.5rem;
          display: grid;
          gap: 0.14rem;
        }

        .hero-side-label {
          color: #71717a;
          font-size: 0.56rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .hero-side-value {
          color: #22d3ee;
          font-size: 0.94rem;
          letter-spacing: 0.04em;
          text-shadow: 0 0 10px rgba(34, 211, 238, 0.36);
        }

        .hero-side-feed {
          margin-top: 0.72rem;
          color: #a1a1aa;
          font-size: 0.68rem;
          line-height: 1.55;
          border-top: 1px solid rgba(34, 211, 238, 0.18);
          padding-top: 0.62rem;
        }

        .hero-command-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.36rem;
          margin-bottom: 0.64rem;
        }

        .hero-command-tab {
          border: 1px solid rgba(34, 211, 238, 0.22);
          color: #a1a1aa;
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          border-radius: 9999px;
          padding: 0.14rem 0.48rem;
          transition: all 0.2s ease;
          background: rgba(2, 6, 23, 0.58);
        }

        .hero-command-tab:hover {
          color: #67e8f9;
          border-color: rgba(34, 211, 238, 0.42);
        }

        .hero-command-tab-active {
          color: #e4e4e7;
          border-color: rgba(34, 211, 238, 0.58);
          background: rgba(34, 211, 238, 0.14);
          box-shadow: inset 0 0 8px rgba(34, 211, 238, 0.2);
        }

        .hero-command-console {
          margin-top: 0.72rem;
          border-top: 1px solid rgba(34, 211, 238, 0.18);
          padding-top: 0.62rem;
        }

        .hero-command-head {
          color: #a1a1aa;
          font-size: 0.64rem;
          letter-spacing: 0.05em;
          margin-bottom: 0.36rem;
        }

        .hero-command-output {
          display: grid;
          gap: 0.22rem;
          color: #d4d4d8;
          font-size: 0.66rem;
          line-height: 1.45;
          min-height: 4.8rem;
        }

        .hero-command-jump {
          margin-top: 0.45rem;
          border: 1px solid rgba(34, 211, 238, 0.34);
          border-radius: 9999px;
          color: #22d3ee;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.2rem 0.52rem;
          transition: all 0.2s ease;
        }

        .hero-command-jump:hover {
          color: #ecfeff;
          border-color: rgba(34, 211, 238, 0.55);
          background: rgba(34, 211, 238, 0.14);
        }

        .terminal-scanlines {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            rgba(120, 255, 255, 0.05) 0px,
            rgba(120, 255, 255, 0.05) 1px,
            transparent 2px,
            transparent 4px
          );
        }

        .terminal-flicker {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top, rgba(34, 211, 238, 0.08), transparent 55%);
          animation: flicker 0.22s infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
