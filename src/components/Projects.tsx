'use client';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: 'Frontend Components',
    description: 'Explore my collection of interactive React components and engaging games. Each component is built with modern web technologies and best practices.',
    image: '/images/frontend-components.png',
    technologies: ['JavaScript', 'React', 'CSS'],
    githubUrl: 'https://github.com/saivivek116/frontend-components',
    liveUrl: 'https://frontend-components-pi.vercel.app/',
    features: [
      'Re-usable UI Components',
      'Games',
      'Puzzles'
    ]
  },
  {
    title: 'AI Finance Management',
    description: 'Smart Financial Assistant that helps you manage multiple accounts for everyday expenses and savings goals. Set personalized budgets, track income and spending in real time, receive email alerts for budget limits, and log purchases by snapping receipts. Get actionable insights through Gemini, all in one seamless platform.',
    image: '/images/aifinance.webp', // You'll need to add project images
    technologies: ['Nextjs', 'JavaScript', 'Gemini AI', 'LangChain'],
    githubUrl: 'https://github.com/saivivek116/finance',
    liveUrl: 'https://github.com/saivivek116/finance',
    status: "working",
    features: [
    ]
  },
  {
    title: 'Handshake Helper',
    description: 'Chrome extension that evaluates resume-job description matches and generates screening questions using AI',
    image: '/images/handshake.webp', // You'll need to add project images
    technologies: ['Python', 'JavaScript', 'Flask', 'LangChain', 'OpenAI API'],
    githubUrl: 'https://github.com/saivivek116/handshake-chrome-extension',
    liveUrl: 'https://github.com/saivivek116/handshake-chrome-extension',
    features: [
      'Resume-job matching analysis',
      'AI-powered question generation',
      'Browser extension integration'
    ],
  },
  {
    title: 'Survey Master',
    description: 'Full-stack survey application with real-time progress tracking and feedback',
    image: '/images/survey.png',
    technologies: ['JavaScript', 'Spring Boot', 'AWS', 'Docker', 'Kubernetes', 'Jenkins'],
    githubUrl: 'https://github.com/saivivek116/surveyform',
    liveUrl: 'https://github.com/saivivek116/surveyform',
    features: [
      'Real-time progress tracking',
      'CI/CD with Jenkins',
      'High availability with AWS'
    ]
  },
  {
    title: 'Fitness Application',
    description: 'Fitness guidance website offering personalized gym and diet plans',
    image: '/images/freaking-fit.webp',
    technologies: ['React', 'Firebase', 'SCSS', 'React Router'],
    githubUrl: 'https://github.com/saivivek116/freaking_fit',
    liveUrl: 'https://freaking-fit-v5.web.app/',
    features: [
      'User authentication',
      'Personalized workout plans',
      'Interactive UI components'
    ]
  },
  {
    title: 'Campus Blogs',
    description: 'Real-time blog application with dynamic chat functionality',
    image: '/images/college_building.webp',
    technologies: ['Angular', 'Node.js', 'Express', 'MongoDB', 'WebSocket'],
    githubUrl: 'https://github.com/saivivek116/project',
    liveUrl: 'https://github.com/saivivek116/project',
    features: [
      'Real-time chat',
      'CRUD operations',
      'Image upload capability'
    ]
  }
];

const Projects = () => {

  const handleProjectClick = (url: string) => {
    window.open(url, "_blank");
  }
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-16">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative" onClick={() => handleProjectClick(project.liveUrl)}>
              {/* {project?.status && <Badge className='bg-yellow-300 !text-black absolute top-2 right-2'>Working</Badge>} */}
              <div className="aspect-video">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  // objectFit='contain'
                  height={500}
                  className="w-full h-full object-contain"
                />

              </div>
              <div className="p-6">
                <h3 className="text-xl text-gray-900 dark:text-gray-100 font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    className="flex items-center text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-900 "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={20} className="mr-2" />
                    Code
                  </a>
                  {
                    project?.liveUrl!==project?.githubUrl && <a
                      href={project?.liveUrl}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={20} className="mr-2" />
                      Live Demo
                    </a>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;