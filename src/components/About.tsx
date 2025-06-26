'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
            <Image
              src="/images/profile.webp" // You'll need to add your image
              alt="Sai Vivek Vangaveti"
              width={768}
              height={1024}
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
              Passionate Full Stack Engineer with 4 years of experience building customer facing applications, No Code tools, and automation tools using React, Next.js, Node.js, and Spring Boot. Proven ability to ship end-to-end features with a customer-first mindset.
Certified AWS Developer with strong experience in CI/CD, micro-services, RESTful API, GraphQL, scalable system design.
Experienced working within agile. Innovating Applications using GenAI is my recent focus. 
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;