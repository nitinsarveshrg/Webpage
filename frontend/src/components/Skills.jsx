import React from 'react';
import { Card } from './ui/card';
import { Cloud, Container, Code, Activity, Terminal } from 'lucide-react';
import { portfolioData } from '../mock';

const Skills = () => {
  const skillCategories = [
    { title: 'Cloud Platforms', skills: portfolioData.skills.cloud, icon: Cloud },
    { title: 'DevOps Tools', skills: portfolioData.skills.devops, icon: Container },
    { title: 'Programming', skills: portfolioData.skills.programming, icon: Code },
    { title: 'Monitoring', skills: portfolioData.skills.monitoring, icon: Activity }
  ];

  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 font-mono">
            <Terminal className="inline mr-3" size={40} />
            &gt; ./scan_skills.sh --all
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 ml-16 mb-4"></div>
          <p className="text-zinc-400 text-lg font-mono ml-16">[ ANALYZING TECHNICAL CAPABILITIES... ]</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="bg-black/50 border-cyan-500/30 p-6 hover:border-cyan-500 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/50 rounded flex items-center justify-center">
                    <IconComponent className="text-cyan-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400 font-mono">&gt; {category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-zinc-300 font-mono text-sm">[{skill.name}]</span>
                        <span className="text-green-400 text-sm font-semibold font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-cyan-500/20">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}        </div>
      </div>
    </section>
  );
};

export default Skills;
