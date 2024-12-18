import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ children, className = '' }: BadgeProps) => {
  return (
    <span className={`px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm ${className}`}>
      {children}
    </span>
  );
};

export default Badge;