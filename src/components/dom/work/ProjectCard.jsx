import Image from 'next/image';
import Link from 'next/link';

const ProjectCard = ({ project, index }) => {
  return (
    <div className="w-full flex justify-center my-8">
      <div className="relative w-screen  flex flex-col md:flex-row border text-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Project Number */}
        <div className="text-6xl font-bold text-white absolute top-0 left-0 pl-4 pt-4">
          {index + 1}
        </div>

        {/* Project Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={project.image}
            alt={project.title}
            width={500}
            height={300}
            className="object-cover w-full h-full select-none pointer-events-none"
          />
        </div>

        {/* Project Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-start">
          <div>
            <h2 className="flex justify-start text-2xl font-semibold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-gray-600 text-sm">{project.description}</p>
          </div>

          <div className="mt-4">
            <p className="flex justify-start text-sm text-gray-400 mb-1">Tech Stack:</p>
            <ul className="flex space-x-2">
              {project.techStack.map((tech, idx) => (
                <li
                  key={idx}
                  className="text-xs font-medium bg-gray-100 rounded-full px-3 py-1 text-gray-800"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Link to Project Page */}
          <Link href={`/projects/${project.id}`} passHref>
            <p className="w-full mt-6 text-white text-sm border flex items-center justify-center space-x-2 py-2">
              <span>VIEW</span> 
              <svg className="w-6 h-6 inline-block" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_105_351)">
                  <path d="M156.064 143.936L112.127 100L156.064 56.0636L200 100L156.064 143.936ZM43.9364 143.936L0 100L43.9364 56.0636L87.8728 100L43.9364 143.936ZM100 200L56.0636 156.064L100 112.127L143.936 156.064L100 200ZM100 87.8728L56.0636 43.9364L100 0L143.936 43.9364L100 87.8728Z" fill="url(#paint0_linear_105_351)"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_105_351" x1="20.5" y1="16" x2="100" y2="200" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff"/>
                    <stop offset="1" stopColor="#ffffff"/>
                  </linearGradient>
                  <clipPath id="clip0_105_351">
                    <rect width="200" height="200" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
