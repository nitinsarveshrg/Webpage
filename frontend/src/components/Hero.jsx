import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Terminal, ChevronDown } from 'lucide-react';
import { portfolioData } from '../mock';
import TypingEffect from './TypingEffect';
import MatrixRain from './MatrixRain';
import { scrollToSectionById } from '../lib/sectionScroll';

const bootMessages = [
  '[BOOT] Spinning up Linux runtime...',
  '[OK] Multi-cloud fabric: ONLINE',
  '[OK] Kubernetes control plane: HEALTHY',
  '[OK] Delivery pipelines: FLOWING',
  '[OK] Terraform drift check: CLEAN',
  '[OK] Observability feed: LOCKED',
  '[OK] Race mode loaded: MERCEDES + MAX',
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
    '> ./decode_profile.sh',
    '> Cloud DevOps Engineer | 5+ years in production',
    '> AWS + Azure + GCP operator',
    '> Weekend mode: F1 race strategy + photography',
  ],
  toolchain: [
    '> loading execution stack...',
    '> IaC :: Terraform / Ansible / Helm',
    '> Containers :: Docker / Kubernetes',
    '> CI/CD :: Jenkins / ArgoCD / GitHub Actions',
  ],
  runbook: [
    '> tail -f ops_timeline.log',
    '> Reliability uplift pushed to 99.99%',
    '> MTTR cut by 45%',
    '> Cloud spend reduced by ~20%',
  ],
  cert_store: [
    '> verify --credentials --secure',
    '> AWS SAA :: VALID',
    '> HashiCorp Terraform Associate :: VALID',
    '> credential vault synced',
  ],
  secure_link: [
    '> establish_secure_channel --tls',
    '> hCaptcha guard :: active',
    '> no redirect :: in-page submit',
    '> secure channel ready',
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
    <section id="hero" className="portfolio-section hero-section justify-center bg-black">
      <MatrixRain />

      <div className={`section-shell max-w-7xl mx-auto px-6 py-20 relative z-10 w-full ${visibleLines > 0 ? 'section-frame-grow' : 'section-frame-preroll'}`}>
        <div className="hero-boot-console relative mb-8 font-mono text-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 hero-boot-head">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center gap-2">
              <Terminal size={15} />
              <span className="text-xs tracking-wide">visitor@grid-shell: ~/portfolio</span>
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
                  text="./launch_portfolio --mode live"
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
                  <div className="hero-status-pill inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-mono">
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
                    className="hero-main-btn hero-main-btn-primary font-bold border-2"
                  >
                    &gt; VIEW_PROJECTS
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => scrollToSection('contact')}
                    className="hero-main-btn hero-main-btn-secondary border-2 font-bold"
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
                      className="hero-stat-card rounded p-4 hero-stat-reveal"
                      style={{ animationDelay: `${idx * 140}ms` }}
                    >
                      <div className="text-3xl font-bold hero-stat-value font-mono">{stat.value}</div>
                      <div className="text-xs text-zinc-500 mt-1 font-mono">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside className="hero-side-console hero-block-reveal">
              <div className="hero-side-head">
                <span className="text-cyan-400">$</span> watch -n 1 /proc/trackside/runtime
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
                <div>[OK] control-plane: stable</div>
                <div>[OK] workloads: healthy</div>
                <div>[OK] release-queue: flowing</div>
                <div>[INFO] race telemetry feed: attached</div>
              </div>
              <div className="hero-command-console">
                <div className="hero-command-head">
                  <span className="text-cyan-400">visitor@nitin:~$</span> run ./{activeCommand}
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
                  jump
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

        .hero-boot-console {
          border: 1px solid rgba(251, 191, 36, 0.35);
          border-radius: 1rem;
          background:
            radial-gradient(circle at 12% -20%, rgba(161, 98, 7, 0.34), transparent 50%),
            radial-gradient(circle at 88% 0%, rgba(20, 184, 166, 0.24), transparent 44%),
            linear-gradient(155deg, rgba(12, 14, 20, 0.93), rgba(10, 12, 17, 0.95));
          box-shadow:
            inset 0 0 26px rgba(251, 191, 36, 0.06),
            0 22px 52px rgba(0, 0, 0, 0.48);
        }

        .hero-boot-head {
          border-bottom: 1px solid rgba(251, 191, 36, 0.3);
          color: #fde68a;
          background: linear-gradient(90deg, rgba(34, 20, 6, 0.45), rgba(17, 24, 39, 0.65));
        }

        @keyframes hero-block-reveal {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.975);
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
          text-shadow: 0 0 18px rgba(251, 191, 36, 0.22);
        }

        .hero-status-pill {
          color: #fef08a;
          border: 1px solid rgba(250, 204, 21, 0.38);
          background: linear-gradient(120deg, rgba(113, 63, 18, 0.42), rgba(8, 47, 73, 0.32));
          box-shadow: inset 0 0 12px rgba(250, 204, 21, 0.14);
        }

        .hero-main-btn {
          font-family: "JetBrains Mono", "Courier New", monospace;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .hero-main-btn:hover {
          transform: translateY(-1px);
        }

        .hero-main-btn-primary {
          color: #080b12;
          border-color: rgba(253, 224, 71, 0.9);
          background: linear-gradient(120deg, #facc15, #f59e0b);
          box-shadow: 0 10px 24px rgba(202, 138, 4, 0.38);
        }

        .hero-main-btn-primary:hover {
          background: linear-gradient(120deg, #fde047, #f59e0b);
          box-shadow: 0 12px 26px rgba(202, 138, 4, 0.45);
        }

        .hero-main-btn-secondary {
          color: #bef264;
          border-color: rgba(190, 242, 100, 0.56);
          background: rgba(12, 20, 11, 0.68);
          box-shadow: inset 0 0 10px rgba(190, 242, 100, 0.12);
        }

        .hero-main-btn-secondary:hover {
          color: #ecfccb;
          background: rgba(101, 163, 13, 0.22);
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
          border: 1px solid rgba(250, 204, 21, 0.32);
          background: rgba(22, 17, 8, 0.75);
          border-radius: 9999px;
          padding: 0.2rem 0.62rem;
          box-shadow: inset 0 0 10px rgba(250, 204, 21, 0.15);
        }

        .hero-runtime-label {
          color: #a1a1aa;
          font-size: 0.62rem;
          letter-spacing: 0.11em;
        }

        .hero-runtime-value {
          color: #fde68a;
          font-size: 0.68rem;
          letter-spacing: 0.05em;
          text-shadow: 0 0 10px rgba(250, 204, 21, 0.26);
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
          border: 1px solid rgba(250, 204, 21, 0.32);
          border-radius: 0.8rem;
          background: linear-gradient(160deg, rgba(15, 11, 5, 0.88), rgba(17, 24, 39, 0.52));
          padding: 0.9rem 0.88rem;
          box-shadow:
            inset 0 0 16px rgba(250, 204, 21, 0.1),
            0 10px 30px rgba(1, 4, 9, 0.5);
        }

        .hero-side-head {
          color: #d4d4d8;
          border-bottom: 1px solid rgba(250, 204, 21, 0.24);
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
          border: 1px solid rgba(250, 204, 21, 0.2);
          border-radius: 0.6rem;
          background: rgba(18, 15, 10, 0.78);
          padding: 0.42rem 0.5rem;
          display: grid;
          gap: 0.14rem;
        }

        .hero-side-label {
          color: #a1a1aa;
          font-size: 0.56rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .hero-side-value {
          color: #fde68a;
          font-size: 0.94rem;
          letter-spacing: 0.04em;
          text-shadow: 0 0 10px rgba(250, 204, 21, 0.3);
        }

        .hero-side-feed {
          margin-top: 0.72rem;
          color: #d4d4d8;
          font-size: 0.68rem;
          line-height: 1.55;
          border-top: 1px solid rgba(250, 204, 21, 0.18);
          padding-top: 0.62rem;
        }

        .hero-command-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.36rem;
          margin-bottom: 0.64rem;
        }

        .hero-command-tab {
          border: 1px solid rgba(250, 204, 21, 0.24);
          color: #d4d4d8;
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          border-radius: 9999px;
          padding: 0.14rem 0.48rem;
          transition: all 0.2s ease;
          background: rgba(15, 11, 5, 0.6);
        }

        .hero-command-tab:hover {
          color: #fde68a;
          border-color: rgba(250, 204, 21, 0.45);
        }

        .hero-command-tab-active {
          color: #fef3c7;
          border-color: rgba(250, 204, 21, 0.58);
          background: rgba(202, 138, 4, 0.2);
          box-shadow: inset 0 0 8px rgba(250, 204, 21, 0.16);
        }

        .hero-command-console {
          margin-top: 0.72rem;
          border-top: 1px solid rgba(250, 204, 21, 0.18);
          padding-top: 0.62rem;
        }

        .hero-command-head {
          color: #d4d4d8;
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
          border: 1px solid rgba(190, 242, 100, 0.4);
          border-radius: 9999px;
          color: #bef264;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.2rem 0.52rem;
          transition: all 0.2s ease;
        }

        .hero-command-jump:hover {
          color: #ecfccb;
          border-color: rgba(190, 242, 100, 0.58);
          background: rgba(101, 163, 13, 0.22);
        }

        .hero-stat-card {
          border: 1px solid rgba(250, 204, 21, 0.26);
          background: linear-gradient(155deg, rgba(21, 15, 7, 0.7), rgba(14, 21, 26, 0.72));
          box-shadow: inset 0 0 16px rgba(250, 204, 21, 0.09);
        }

        .hero-stat-value {
          color: #fde68a;
          text-shadow: 0 0 14px rgba(250, 204, 21, 0.2);
        }

        .terminal-scanlines {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            rgba(253, 224, 71, 0.04) 0px,
            rgba(253, 224, 71, 0.04) 1px,
            transparent 2px,
            transparent 4px
          );
        }

        .terminal-flicker {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top, rgba(250, 204, 21, 0.09), transparent 55%);
          animation: flicker 0.22s infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
