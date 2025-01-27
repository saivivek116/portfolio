/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2, Server, Database, Terminal, Layout,
  Cpu, Cloud, Settings, Palette, Globe, Layers
} from 'lucide-react';

const skillsData = [
  {
    category: "Frontend",
    icon: <Layout className="w-8 h-8" />,
    skills: [
      { name: "React", level: "Advanced", icon: <Code2 className="w-6 h-6" /> },
      { name: "TypeScript", level: "Advanced", icon: <Code2 className="w-6 h-6" /> },
      { name: "Next.js", level: "Intermediate", icon: <Globe className="w-6 h-6" /> },
      { name: "Bootstrap", level: "Advanced", icon: <Palette className="w-6 h-6" /> },
      { name: "Tailwind CSS", level: "Advanced", icon: <Palette className="w-6 h-6" /> }
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    category: "Backend",
    icon: <Server className="w-8 h-8" />,
    skills: [
      { name: "Node.js", level: "Advanced", icon: <Server className="w-6 h-6" /> },
      { name: "SpringBoot", level: "Advanced", icon: <Server className="w-6 h-6" /> },
      { name: "Python", level: "Intermediate", icon: <Code2 className="w-6 h-6" /> },
      { name: "PostgreSQL", level: "Advanced", icon: <Database className="w-6 h-6" /> },
      { name: "MySQL", level: "Advanced", icon: <Database className="w-6 h-6" /> },
      { name: "GraphQL", level: "Intermediate", icon: <Layers className="w-6 h-6" /> }
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    category: "DevOps & Tools",
    icon: <Settings className="w-8 h-8" />,
    skills: [
      { name: "Docker", level: "Advanced", icon: <Cpu className="w-6 h-6" /> },
      { name: "Kubernetes", level: "Advanced", icon: <Terminal className="w-6 h-6" /> },
      { name: "AWS", level: "Intermediate", icon: <Cloud className="w-6 h-6" /> },
      { name: "Redis", level: "Advanced", icon: <Terminal className="w-6 h-6" /> },
      { name: "Git", level: "Advanced", icon: <Terminal className="w-6 h-6" /> },
      { name: "Linux", level: "Advanced", icon: <Terminal className="w-6 h-6" /> }
    ],
    color: "from-orange-500 to-red-500"
  }
];

const SkillCard = ({ skill, delay }: { skill: any; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.15, delay }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-600">
          {skill.icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{skill.name}</h4>
          {/* <p className="text-sm text-gray-500">{skill.level}</p> */}
        </div>
      </div>
    </motion.div>
  );
};

const CategorySection = ({ data, index }: { data: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div className={`p-6 rounded-2xl bg-gradient-to-br ${data.color}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-white/10 rounded-lg text-white">
            {data.icon}
          </div>
          <h3 className="text-xl font-semibold text-white">{data.category}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.skills.map((skill: any, idx: number) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              delay={index * 0.1 + idx * 0.1}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-16">Skills & Expertise</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <CategorySection key={category.category} data={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;