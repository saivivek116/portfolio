import {
  Code2, Server, Database, Terminal, Layout,
  Cpu, Cloud, Settings, Palette, Globe, Layers,
  GitBranch
} from 'lucide-react';
import { SkillCategory } from './types';

export const skillsData: SkillCategory[] = [
  {
    category: "Frontend",
    icon: <Layout className="w-8 h-8" />,
    skills: [
      { name: "React", level: "Advanced", icon: <Code2 className="w-6 h-6" /> },
      { name: "TypeScript", level: "Advanced", icon: <Code2 className="w-6 h-6" /> },
      { name: "Next.js", level: "Intermediate", icon: <Globe className="w-6 h-6" /> },
      { name: "Tailwind CSS", level: "Advanced", icon: <Palette className="w-6 h-6" /> }
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    category: "Backend",
    icon: <Server className="w-8 h-8" />,
    skills: [
      { name: "Node.js", level: "Advanced", icon: <Server className="w-6 h-6" /> },
      { name: "Python", level: "Intermediate", icon: <Code2 className="w-6 h-6" /> },
      { name: "PostgreSQL", level: "Advanced", icon: <Database className="w-6 h-6" /> },
      { name: "GraphQL", level: "Intermediate", icon: <Layers className="w-6 h-6" /> }
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    category: "DevOps & Tools",
    icon: <Settings className="w-8 h-8" />,
    skills: [
      { name: "Docker", level: "Advanced", icon: <Cpu className="w-6 h-6" /> },
      { name: "AWS", level: "Intermediate", icon: <Cloud className="w-6 h-6" /> },
      { name: "Git", level: "Advanced", icon: <GitBranch className="w-6 h-6" /> },
      { name: "Linux", level: "Advanced", icon: <Terminal className="w-6 h-6" /> }
    ],
    color: "from-orange-500 to-red-500"
  }
];