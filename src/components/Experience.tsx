import { Briefcase } from 'lucide-react';

const experienceData = [
  {
    position: "Research Assistant",
    company: "George Mason University",
    location: "Fairfax, USA",
    period: "Feb 2024 - Present",
    description: "Working on Geoweaver, a NASA-funded workflow management tool.",
    responsibilities: [
      "Enhanced database compatibility by implementing cross-database support with Hibernate ORM",
      "Upgraded Spring Boot application from 2.4 to 3.3 with modern Java features",
      "Developed CI/CD pipeline reducing deployment time by 85%",
      "Created automated testing suite improving code coverage to 85%",
      "Built MacOS installer automating setup and database migration processes"
    ]
  },
  {
    position: "Product Development Engineer I",
    company: "Phenom People",
    location: "Hyderabad, India",
    period: "Sep 2020 - Dec 2022",
    description: "Developed enterprise HR technology solutions for Fortune 500 clients.",
    responsibilities: [
      "Built reusable React components achieving 90% adoption across teams",
      "Developed automation tool reducing client migration time from weeks to days",
      "Implemented versioning system reducing data inconsistencies by 10%",
      "Created tenant configuration system with RBAC for enhanced security",
      "Onboarded 50+ enterprise clients improving overall revenue by 20%"
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">Experience</h2>
        <div className="space-y-8">
          {experienceData.map((exp, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{exp.location}</p>
                  <p className="mt-4 text-gray-700">{exp.description}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        <span className="text-gray-600">{responsibility}</span>
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

export default Experience;