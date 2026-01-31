import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Terminal, ChevronDown } from 'lucide-react';
import { portfolioData } from '../mock';
import TypingEffect from './TypingEffect';
import MatrixRain from './MatrixRain';

const Hero = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootComplete(true);
      setTimeout(() => setShowContent(true), 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <MatrixRain />
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Terminal Boot Sequence - Cloud/DevOps specific */}
        <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 mb-8 font-mono text-sm shadow-lg shadow-cyan-500/20">
          <div className="flex items-center gap-2 mb-4 text-cyan-400">
            <Terminal size={16} />
            <span>CLOUD INFRASTRUCTURE TERMINAL v3.0.1</span>
          </div>
          <div className="space-y-1 text-green-400">
            <div><TypingEffect text="> Booting cloud infrastructure..." speed={30} /></div>
            <div className="ml-4"><TypingEffect text="✓ AWS Services: ONLINE" speed={30} /></div>
            <div className="ml-4"><TypingEffect text="✓ Kubernetes Cluster: ACTIVE" speed={30} /></div>
            <div className="ml-4"><TypingEffect text="✓ CI/CD Pipeline: RUNNING" speed={30} /></div>
            <div className="ml-4"><TypingEffect text="✓ Terraform State: LOCKED" speed={30} /></div>
            <div className="ml-4"><TypingEffect text="✓ Monitoring: ALL SYSTEMS NOMINAL" speed={30} /></div>
            {bootComplete && (
              <div className="text-cyan-400 mt-2">
                <TypingEffect text="> System operational. Displaying profile..." speed={30} />
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        {showContent && (
          <div className="text-center space-y-8 animate-fade-in">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-sm text-cyan-400 font-mono">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>&gt; STATUS: ONLINE | AVAILABLE_FOR_HIRE</span>
            </div>

            {/* Name with glitch effect */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight font-mono">
              <span className="text-cyan-400">&gt;_</span> {portfolioData.personal.name.split(' ')[0]}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 animate-gradient">
                {portfolioData.personal.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            {/* Title */}
            <div className="font-mono">
              <p className="text-xl md:text-2xl text-cyan-400 mb-2">
                <span className="text-white">&gt;_</span> {portfolioData.personal.title}
              </p>
              <p className="text-base md:text-lg text-zinc-400">
                [ {portfolioData.personal.tagline} ]
              </p>
            </div>

            {/* Command Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-mono">
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

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto">
              {[
                { label: 'YEARS_EXP', value: '5+' },
                { label: 'CLOUD_PLATFORMS', value: '3' },
                { label: 'DEPLOYMENTS', value: '50+' },
                { label: 'UPTIME_SLA', value: '99.9%' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-cyan-500/5 border border-cyan-500/30 rounded p-4">
                  <div className="text-3xl font-bold text-cyan-400 font-mono">{stat.value}</div>
                  <div className="text-xs text-zinc-500 mt-1 font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-cyan-400" size={32} />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
