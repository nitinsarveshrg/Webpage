import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../mock';
import AnimatedBackground from './AnimatedBackground';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden">
      {/* Animated network background */}
      <AnimatedBackground opacity={0.2} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center space-y-8">
          {/* Welcome badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-sm text-zinc-300">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Available for opportunities
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              {portfolioData.personal.name}
            </span>
          </h1>

          {/* Title */}
          <p className="text-2xl md:text-3xl text-zinc-300 font-semibold">
            {portfolioData.personal.title}
          </p>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            {portfolioData.personal.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white group"
            >
              View My Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              <Download className="mr-2" size={20} />
              Download Resume
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 pt-8">
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-zinc-700 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-cyan-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
