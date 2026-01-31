import React from 'react';
import { Card } from './ui/card';
import { Cloud, Container, Code, Activity, BarChart3 } from 'lucide-react';
import { portfolioData } from '../mock';

const Skills = () => {
  const skillCategories = [
    { title: 'Cloud Platforms', skills: portfolioData.skills.cloud, icon: Cloud, gradient: 'from-blue-500 to-cyan-500' },
    { title: 'DevOps Tools', skills: portfolioData.skills.devops, icon: Container, gradient: 'from-cyan-500 to-teal-500' },
    { title: 'Programming', skills: portfolioData.skills.programming, icon: Code, gradient: 'from-purple-500 to-pink-500' },
    { title: 'Monitoring', skills: portfolioData.skills.monitoring, icon: Activity, gradient: 'from-green-500 to-emerald-500' }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-blue-400" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Technical Expertise
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
          <p className="text-slate-400 text-lg mt-4">Proficiency across cloud infrastructure and DevOps tooling</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="bg-slate-900/50 border-2 border-blue-500/30 p-6 hover:border-blue-500/60 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
                        <span className="text-blue-400 text-sm font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                        <div
                          className={`h-full bg-gradient-to-r ${category.gradient} transition-all duration-1000 ease-out shadow-lg`}
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
