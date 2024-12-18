export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: React.ReactNode;
}

export interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  skills: Skill[];
  color: string;
}