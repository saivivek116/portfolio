import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({ id, title, children, className = 'bg-white' }: SectionProps) => {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">{title}</h2>
        {children}
      </div>
    </section>
  );
};

export default Section;