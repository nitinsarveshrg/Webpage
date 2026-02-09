import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Terminal, ChevronDown } from 'lucide-react';
import { portfolioData } from '../mock';
import TypingEffect from './TypingEffect';
import MatrixRain from './MatrixRain';

const bootMessages = [
  '[BOOT] Initializing cloud runtime...',
  '[OK] AWS Services: ONLINE',
  '[OK] Kubernetes Cluster: ACTIVE',
  '[OK] CI/CD Pipeline: RUNNING',
  '[OK] Terraform State: SYNCED',
  '[OK] Monitoring: ALL SYSTEMS NOMINAL',
];

const Hero = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [heroRevealStep, setHeroRevealStep] = useState(0);

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="portfolio-section scroll-mt-24 justify-center bg-black">
      <MatrixRain />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
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

        {showContent && (
          <div className="text-center space-y-8 section-elongate-load">
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
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-mono hero-block-reveal">
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto">
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
            filter: blur(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
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
