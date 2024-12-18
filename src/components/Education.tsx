import { GraduationCap } from 'lucide-react';

const educationData = [
  {
    degree: "Master of Science in Computer Science",
    school: "George Mason University",
    location: "Fairfax, VA",
    period: "Jan 2023 - Dec 2024",
    description: "Specialized in Software Engineering, Cloud Computing, and Database Systems.",
    achievements: [
      "GPA: 3.96/4.0",
      "Working as Research Assistant on NASA-funded project",
      "Relevant Coursework: Data Structures & Algorithms, Software Testing, Cloud Computing, Database Systems, User Interface Design & Development, Object-Oriented Programming"
    ]
  },
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    school: "JNTUH College of Engineering Sulthanpur",
    location: "India",
    period: "Aug 2016 - Sep 2020",
    description: "Foundation in computer science and engineering principles.",
    achievements: [
      "GPA: 3.4/4.0",
      "Built strong foundation in software development",
      "Completed multiple academic projects"
    ]
  }
];

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">Education</h2>
        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.school}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{edu.location}</p>
                  <p className="mt-4 text-gray-700">{edu.description}</p>
                  <ul className="mt-4 space-y-2">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;