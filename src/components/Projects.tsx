import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Handshake Helper',
    description: 'Chrome extension that evaluates resume-job description matches and generates screening questions using AI',
    image: '/handshake-helper.jpg', // You'll need to add project images
    technologies: ['Python', 'JavaScript', 'FastAPI', 'LangChain', 'ChatGPT API'],
    githubUrl: 'https://github.com/saivivek116/handshake-helper',
    liveUrl: '',
    features: [
      'Resume-job matching analysis',
      'AI-powered question generation',
      'Browser extension integration'
    ]
  },
  {
    title: 'Survey Master',
    description: 'Full-stack survey application with real-time progress tracking and feedback',
    image: '/survey-master.jpg',
    technologies: ['JavaScript', 'Spring Boot', 'AWS', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/saivivek116/surveyform',
    liveUrl: '',
    features: [
      'Real-time progress tracking',
      'CI/CD with Jenkins',
      'High availability with AWS'
    ]
  },
  {
    title: 'Fitness Application',
    description: 'Fitness guidance website offering personalized gym and diet plans',
    image: '/fitness-app.jpg',
    technologies: ['React', 'Firebase', 'SASS', 'React Router'],
    githubUrl: 'https://github.com/saivivek116/fitness-app',
    liveUrl: '',
    features: [
      'User authentication',
      'Personalized workout plans',
      'Interactive UI components'
    ]
  },
  {
    title: 'Campus Blogs',
    description: 'Real-time blog application with dynamic chat functionality',
    image: '/campus-blogs.jpg',
    technologies: ['Angular', 'Node.js', 'Express', 'MongoDB', 'WebSocket'],
    githubUrl: 'https://github.com/saivivek116/campus-blogs',
    liveUrl: '',
    features: [
      'Real-time chat',
      'CRUD operations',
      'Image upload capability'
    ]
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
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
                    className="flex items-center text-gray-600 hover:text-gray-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={20} className="mr-2" />
                    Code
                  </a>
                  {project?.liveUrl && <a
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