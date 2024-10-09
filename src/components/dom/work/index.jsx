// Projects.js
import ProjectCard from './ProjectCard'; // Import ProjectCard


const Work = () => {
const projects = [
  {
    id: 1,
    number: '01',
    image: '/img/nycsavee.png',
    title: 'NYCLive Media',
    techStack: ['React', 'Next.js', 'Prismic', 'R3F'],
  },
  {
    id: 2,
    number: '02',
    image: '/img/bmcsavee.png',
    title: 'BMC Improv',
    techStack: ['React', 'Next.js', 'Prismic', 'R3F'],
  },
  // Add more project objects as needed
];

return (
    <div className="flex flex-col w-screen container mx-auto">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

export default Work;
