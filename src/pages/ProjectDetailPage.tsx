import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { projectApi } from '../services/api';
import { toast } from '../components/ui/Toaster';

interface Project {
  _id: string;
  title: string;
  description: string;
  projectLink: string;
  images: string[];
  videos: string[];
  technologies: string[];
  date: string;
  categories: string[];
  priority: number;
  liveDemo?: string;
  sourceCode?: string;
}

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        const response = await projectApi.getById(id);
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project details');
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 border border-red-100 rounded-lg p-8 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Project Not Found</h2>
          <p className="text-red-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/projects" 
            className="inline-flex items-center text-red-700 font-medium hover:text-red-800"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link 
        to="/projects" 
        className="inline-flex items-center text-blue-700 font-medium hover:text-blue-800 mb-8"
      >
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Projects
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Image */}
        <div className="relative h-96 bg-gray-100">
          {project.images && project.images.length > 0 ? (
            <img
              src={project.images[activeImage]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>

        {/* Thumbnail Selection */}
        {project.images && project.images.length > 1 && (
          <div className="flex overflow-x-auto p-4 gap-4 bg-gray-50">
            {project.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded overflow-hidden ${
                  activeImage === index ? 'ring-2 ring-blue-500' : 'opacity-70'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="p-8">
          {/* Title and External Links */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900"
            >
              {project.title}
            </motion.h1>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                </a>
              )}
              {project.sourceCode && (
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" /> Source Code
                </a>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-y-4 gap-x-8 mb-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <time dateTime={project.date}>
                {format(new Date(project.date), 'MMMM yyyy')}
              </time>
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              <div className="flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <span key={category}>{category}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Videos */}
          {project.videos && project.videos.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Project Videos</h2>
              <div className="grid grid-cols-1 gap-4">
                {project.videos.map((video, index) => (
                  <div key={index} className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={video}
                      title={`Project Video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-64 md:h-96 rounded-lg"
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Link */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Project Link</h2>
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 break-all"
            >
              {project.projectLink}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;