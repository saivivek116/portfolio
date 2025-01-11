import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center dark:text-gray-100 mb-16">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={imageRef}
            className="relative aspect-square rounded-2xl overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-600/20 group-hover:to-blue-600/30 transition-all duration-300" />
            <img
              src="/images/profile.webp" // You'll need to add your image
              alt="Sai Vivek Vangaveti"
              className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold dark:text-gray-100 mb-4">Who I Am</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I am a full-stack developer with around 3 years of hands-on experience in building scalable and reliable software solutions. I hold a Master's degree in Computer Science from George Mason University and have worked as a Research Assistant on a NASA-funded project. I specialize in React, Spring Boot, and cloud technologies, focusing on creating efficient and maintainable solutions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;