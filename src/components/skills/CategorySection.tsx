import React from 'react';
import { motion } from 'framer-motion';
import { SkillCard } from './SkillCard';
import { SkillCategory } from './types';

interface CategorySectionProps {
  data: SkillCategory;
  index: number;
}

export const CategorySection = ({ data, index }: CategorySectionProps) => {
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
          {data.skills.map((skill, idx) => (
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