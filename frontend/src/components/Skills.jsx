import React from 'react';
import { Card } from './ui/card';
import { Cloud, Container, Code, Activity } from 'lucide-react';
import { portfolioData } from '../mock';
import AnimatedBackground from './AnimatedBackground';

const Skills = () => {
  const skillCategories = [
    { title: 'Cloud Platforms', skills: portfolioData.skills.cloud, icon: Cloud, color: 'cyan' },
    { title: 'DevOps Tools', skills: portfolioData.skills.devops, icon: Container, color: 'blue' },
    { title: 'Programming', skills: portfolioData.skills.programming, icon: Code, color: 'purple' },
    { title: 'Monitoring', skills: portfolioData.skills.monitoring, icon: Activity, color: 'green' }
  ];

  return (
    <section id="skills" className="py-20 bg-zinc-950 relative overflow-hidden">
      <AnimatedBackground opacity={0.1} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-4"></div>
          <p className="text-zinc-400 text-lg">Technologies and tools I work with</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="bg-zinc-900 border-zinc-800 p-6 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <IconComponent className="text-cyan-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-zinc-300">{skill.name}</span>
                        <span className="text-cyan-400 text-sm font-semibold">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
