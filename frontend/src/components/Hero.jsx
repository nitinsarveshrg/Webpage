import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Cloud, Server, Database, Network, ChevronDown, Play } from 'lucide-react';
import { portfolioData } from '../mock';
import CloudParticles from './CloudParticles';

const Hero = () => {
  const [statusLoading, setStatusLoading] = useState(true);
  const [systemsOnline, setSystemsOnline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusLoading(false);
      setTimeout(() => setSystemsOnline(true), 300);
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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
      <CloudParticles />
      
      {/* Animated grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Cloud Infrastructure Status Panel */}
        <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-blue-500/30 rounded-lg p-6 mb-8 shadow-2xl shadow-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Cloud className="text-blue-400" size={24} />
              <span className="text-blue-400 font-bold text-lg">CLOUD INFRASTRUCTURE DASHBOARD</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                statusLoading ? 'bg-yellow-500 animate-pulse' : 
                systemsOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}></div>
              <span className="text-sm text-slate-300">
                {statusLoading ? 'INITIALIZING...' : systemsOnline ? 'ALL SYSTEMS OPERATIONAL' : 'OFFLINE'}
              </span>
            </div>
          </div>
          
          {/* System Status Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-800/50 border border-blue-500/20 rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <Server className="text-blue-400" size={16} />
                <span className="text-xs text-slate-400">COMPUTE</span>
              </div>
              <div className="text-green-400 text-sm font-bold">ONLINE</div>
            </div>
            <div className="bg-slate-800/50 border border-blue-500/20 rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <Database className="text-blue-400" size={16} />
                <span className="text-xs text-slate-400">STORAGE</span>
              </div>
              <div className="text-green-400 text-sm font-bold">ACTIVE</div>
            </div>
            <div className="bg-slate-800/50 border border-blue-500/20 rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <Network className="text-blue-400" size={16} />
                <span className="text-xs text-slate-400">NETWORK</span>
              </div>
              <div className="text-green-400 text-sm font-bold">HEALTHY</div>
            </div>
            <div className="bg-slate-800/50 border border-blue-500/20 rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <Play className="text-blue-400" size={16} />
                <span className="text-xs text-slate-400">CI/CD</span>
              </div>
              <div className="text-green-400 text-sm font-bold">RUNNING</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {systemsOnline && (
          <div className="text-center space-y-8 animate-fade-in">
            {/* Name */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              <span className="text-slate-400">Hello, I'm</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-gradient">
                {portfolioData.personal.name}
              </span>
            </h1>

            {/* Title */}
            <div>
              <p className="text-2xl md:text-3xl text-blue-400 font-semibold mb-2">
                {portfolioData.personal.title}
              </p>
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                {portfolioData.personal.tagline}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/50"
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10"
              >
                Get In Touch
              </Button>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto">
              {[
                { label: 'Years Experience', value: '5+', icon: Server },
                { label: 'Cloud Platforms', value: '3', icon: Cloud },
                { label: 'Projects Deployed', value: '50+', icon: Play },
                { label: 'Uptime SLA', value: '99.9%', icon: Network }
              ].map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div key={idx} className="bg-slate-900/50 border-2 border-blue-500/30 rounded-lg p-4 hover:border-blue-500/60 transition-all">
                    <IconComponent className="text-blue-400 mx-auto mb-2" size={24} />
                    <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                    <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-blue-400" size={32} />
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
