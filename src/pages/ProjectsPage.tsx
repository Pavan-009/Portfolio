import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectFilter from '../components/ui/ProjectFilter';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { projectApi } from '../services/api';
import { toast } from '../components/ui/Toaster';

interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  categories: string[];
  date: string;
  priority: number;
  liveDemo?: string;
  sourceCode?: string;
}

enum SortOption {
  NEWEST = 'newest',
  OLDEST = 'oldest',
  PRIORITY = 'priority',
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.PRIORITY);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.getAll();
        setProjects(response.data);
        
        // Extract unique categories
        const allCategories = response.data.flatMap(
          (project: Project) => project.categories
        );
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Filter projects based on active category
    const filtered =
      activeCategory === 'all'
        ? projects
        : projects.filter((project) =>
            project.categories.includes(activeCategory)
          );

    // Sort projects based on selected option
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case SortOption.NEWEST:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case SortOption.OLDEST:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case SortOption.PRIORITY:
          return b.priority - a.priority;
        default:
          return 0;
      }
    });

    setFilteredProjects(sorted);
  }, [projects, activeCategory, sortOption]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h1>
        <p className="text-gray-600">
          Browse through my portfolio of projects showcasing my skills and experience in web development.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <LoadingSpinner size="large" />
        </div>
      ) : projects.length > 0 ? (
        <>
          {/* Filters and Sort */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <ProjectFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <div className="w-full md:w-auto">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full md:w-auto px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={SortOption.PRIORITY}>Sort by: Featured</option>
                <option value={SortOption.NEWEST}>Sort by: Newest First</option>
                <option value={SortOption.OLDEST}>Sort by: Oldest First</option>
              </select>
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-3 bg-blue-50 border border-blue-100 rounded-lg p-8 text-center"
                >
                  <p className="text-blue-700">No projects found in this category</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      ) : (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-8 text-center">
          <p className="text-blue-700 mb-4">No projects found</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;