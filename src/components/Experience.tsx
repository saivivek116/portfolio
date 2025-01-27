'use client';
import { BriefcaseIcon, GraduationCapIcon } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';



const journey = [
  {
    title: 'Frontend Engineer',
    company: 'The Donovan\'s Venom',
    location: 'Remote',
    period: 'Oct 2024 - Present',
    icon: <BriefcaseIcon />,
    responsibilities: " Developed responsive, pixel perfect and zero-latency web pages for a music application, including login, payment, books, and checkout pages, using NextJS, TypeScript based on Figma designs."
  },
  {
    title: "Research Assistant",
    company: "George Mason University",
    location: "Fairfax, USA",
    period: "Feb 2024 - Dec 2024",
    icon: <BriefcaseIcon />,
    description: "Working on Geoweaver, a NASA-funded workflow management tool.",
    responsibilities: "Worked on Geoweaver, a NASA-funded workflow management tool. Developed and maintained the backend using Spring Boot and Hibernate ORM. Implemented a RESTful API to interact with the frontend and database. Created a user-friendly interface using React.js and Material-UI. The tool was used by 100+ researchers and increased productivity by 20%."
  },
  {
    title: "Product Development Engineer I",
    company: "Phenom People",
    location: "Hyderabad, India",
    icon: <BriefcaseIcon />,
    period: "Sep 2020 - Dec 2022",
    description: "Developed enterprise HR technology solutions for Fortune 500 clients.",
    responsibilities: "Worked as Full Stack Developer on a team of 5 to develop no code tool to generate forms for career sites. Developed the backend using Node.js and Express.js and the frontend using React.js. Implemented a drag and drop interface to create forms and integrated with the Phenom API to fetch data. The tool was used by 100+ clients and increased revenue by 10%."
  },
  {
    title: "Masters in Computer Science",
    company: "George Mason University",
    location: "Fairfax, USA",
    icon: <GraduationCapIcon />,
    period: "Jan 2023 - Dec 2024",
    responsibilities: "Completed a Master's degree in Computer Science with a focus on Software Engineering."
  },
  {
    title: "Bachelors in Computer Science",
    company: "JNTUH College of Engineering Sulthanpur",
    location: "Hyderabad, India",
    icon: <GraduationCapIcon />,
    period: "Aug 2016 - Aug 2020",
    responsibilities: "Completed a Bachelor's degree in Computer Science. Developed a College Community Portal using Angular and Node.js. The portal was used by 1000+ students and faculty members."
  }
]

const Experience = () => {

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <h2 className="text-4xl font-bold text-center mb-16 dark:text-gray-100">Work Experience and Education</h2>
      <VerticalTimeline lineColor={"rgb(33, 150, 243)"}>
        {
          journey.map((job, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date={job.period}
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={job.icon}
            >
              <h3 className="vertical-timeline-element-title">{job.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">{job.company}</h4>
              <p>
                {job.responsibilities}
              </p>
            </VerticalTimelineElement>
          ))
        }
      </VerticalTimeline>
    </section>
  );

}


export default Experience;