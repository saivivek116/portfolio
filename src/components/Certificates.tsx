import Image from 'next/image';
import Link from 'next/link';

const certifications = [
  { name: 'AWS Developer Associate', image: '/images/aws.png', src: "https://www.credly.com/badges/1bcbf19f-4f52-4867-9b34-3f4177c02c26/public_url" },
  { name: 'GitHub Essentials', image: '/images/github.webp', src: "https://www.linkedin.com/learning/certificates/35c8963cdb3b5bf8d0e3af89a335521474493bc9c3fec3ac5dddb1d2f45b9f6e?u=42290089" },
  { name: 'Docker', image: '/images/docker.jpg', src: "https://www.linkedin.com/learning/certificates/1aba776fd63c2cf3a81b9d14412e6d0bb50a77ef6ceb50e94aba6860b40ae2ab?u=42290089" },
  { name: 'Smart Coder', image: '/images/smartcoder.avif', src: "https://smartinterviews.in/certificate/039fae57" },
];

const Certificates: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <h2 className="text-4xl font-bold text-center mb-16 dark:text-gray-100">Certifications</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {certifications.map((cert, index) => (
          <Link
            key={index}
            href={cert.src}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="border border-gray-300 bg-white rounded-lg w-60 h-60 cursor-pointer overflow-hidden flex flex-col items-center justify-center">
              <div className=' bg-white dark:text-gray-100 flex-1 flex items-center justify-center'>
                <Image
                  src={cert.image}
                  alt={cert.name}
                  width={160}
                  height={160}
                  className="rounded-md h-50"
                />
              </div>
              <div className="text-center py-2 bg-gray-400 dark:text-gray-100 w-full">
                {cert.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Certificates;