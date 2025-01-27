// 'use client';
// import React from 'react';
// // import { motion } from 'framer-motion';
// import { Skill } from './types';

// interface SkillCardProps {
//   skill: Skill;
//   delay: number;
// }

// export const SkillCard = ({ skill, delay }: SkillCardProps) => {
//   return (
//     // <motion.div
//     //   initial={{ opacity: 0, y: 20 }}
//     //   whileInView={{ opacity: 1, y: 0 }}
//     //   viewport={{ once: true }}
//     //   transition={{ duration: 0.5, delay }}
//     //   whileHover={{ scale: 1.05 }}
//     //   className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
//     // >
//     <div className="flex items-center gap-3">
//       <div className="text-gray-600">
//         {skill.icon}
//       </div>
//       <div>
//         <h4 className="font-medium text-gray-900">{skill.name}</h4>
//         <p className="text-sm text-gray-500">{skill.level}</p>
//       </div>
//     </div>
//     // </motion.div>
//   );
// };