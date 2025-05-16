import { Link } from 'react-router-dom';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    description: string;
    images: string[];
    technologies: string[];
    date: string;
    liveDemo?: string;
    sourceCode?: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
    >
      {/* Project Image */}
      <Link to={`/projects/${project._id}`} className="block relative h-48 overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>

      {/* Project Info */}
      <div className="p-6 flex-grow flex flex-col">
        <Link to={`/projects/${project._id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-700 transition-colors">
            {project.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Date */}
        <div className="flex items-center text-gray-500 text-xs mb-4 mt-auto">
          <Calendar className="w-3 h-3 mr-1" />
          <time dateTime={project.date}>
            {format(new Date(project.date), 'MMMM yyyy')}
          </time>
        </div>

        {/* Links */}
        <div className="flex space-x-3">
          <Link
            to={`/projects/${project._id}`}
            className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors"
          >
            View Details
          </Link>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-green-700 hover:text-green-900 transition-colors flex items-center"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Demo
            </a>
          )}
          {project.sourceCode && (
            <a
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center"
            >
              <Github className="w-3 h-3 mr-1" />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;