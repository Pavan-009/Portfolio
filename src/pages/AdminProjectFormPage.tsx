import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash, Calendar } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { projectApi } from '../services/api';
import { toast } from '../components/ui/Toaster';

interface ProjectFormData {
  title: string;
  description: string;
  projectLink: string;
  images: string[];
  videos: string[];
  technologies: string[];
  date: string;
  categories: string[];
  priority: number;
  liveDemo: string;
  sourceCode: string;
}

const AdminProjectFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [submitting, setSubmitting] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [newVideo, setNewVideo] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: '',
      description: '',
      projectLink: '',
      images: [],
      videos: [],
      technologies: [],
      date: new Date().toISOString().split('T')[0],
      categories: [],
      priority: 0,
      liveDemo: '',
      sourceCode: '',
    },
  });

  const watchImages = watch('images');
  const watchVideos = watch('videos');
  const watchTechnologies = watch('technologies');
  const watchCategories = watch('categories');

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        const response = await projectApi.getById(id);
        const project = response.data;

        // Format the date for the input field
        const formattedDate = new Date(project.date).toISOString().split('T')[0];

        reset({
          ...project,
          date: formattedDate,
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project');
        setLoading(false);
        navigate('/admin');
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id, reset, navigate]);

  const onSubmit = async (data: ProjectFormData) => {
    setSubmitting(true);

    try {
      if (id) {
        await projectApi.update(id, data);
        toast.success('Project updated successfully');
      } else {
        await projectApi.create(data);
        toast.success('Project created successfully');
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error(id ? 'Failed to update project' : 'Failed to create project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddImage = () => {
    if (!newImage.trim()) return;
    
    setValue('images', [...watchImages, newImage]);
    setNewImage('');
  };

  const handleRemoveImage = (index: number) => {
    setValue(
      'images',
      watchImages.filter((_, i) => i !== index)
    );
  };

  const handleAddVideo = () => {
    if (!newVideo.trim()) return;
    
    setValue('videos', [...watchVideos, newVideo]);
    setNewVideo('');
  };

  const handleRemoveVideo = (index: number) => {
    setValue(
      'videos',
      watchVideos.filter((_, i) => i !== index)
    );
  };

  const handleAddTechnology = () => {
    if (!newTechnology.trim()) return;
    
    setValue('technologies', [...watchTechnologies, newTechnology]);
    setNewTechnology('');
  };

  const handleRemoveTechnology = (index: number) => {
    setValue(
      'technologies',
      watchTechnologies.filter((_, i) => i !== index)
    );
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    
    setValue('categories', [...watchCategories, newCategory]);
    setNewCategory('');
  };

  const handleRemoveCategory = (index: number) => {
    setValue(
      'categories',
      watchCategories.filter((_, i) => i !== index)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/admin')}
          className="inline-flex items-center text-blue-700 font-medium hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {id ? 'Edit Project' : 'Create New Project'}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            {/* Basic Info Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 gap-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={5}
                    {...register('description', { required: 'Description is required' })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  ></textarea>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                {/* Project Link */}
                <div>
                  <label htmlFor="projectLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="projectLink"
                    type="url"
                    {...register('projectLink', { 
                      required: 'Project link is required',
                      pattern: {
                        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                        message: 'Enter a valid URL'
                      }
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.projectLink ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.projectLink && (
                    <p className="mt-1 text-sm text-red-500">{errors.projectLink.message}</p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="date"
                      type="date"
                      {...register('date', { required: 'Project date is required' })}
                      className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.date ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
                  )}
                </div>

                {/* Priority */}
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority (0-10, higher = more important)
                  </label>
                  <input
                    id="priority"
                    type="number"
                    min="0"
                    max="10"
                    step="1"
                    {...register('priority', { 
                      valueAsNumber: true,
                      min: { value: 0, message: 'Priority must be at least 0' },
                      max: { value: 10, message: 'Priority cannot exceed 10' }
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.priority ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.priority && (
                    <p className="mt-1 text-sm text-red-500">{errors.priority.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Media Section */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Media</h2>

              {/* Images */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images <span className="text-red-500">*</span> (URLs)
                </label>
                <Controller
                  name="images"
                  control={control}
                  rules={{ required: 'At least one image is required' }}
                  render={({ field }) => (
                    <div>
                      <div className="flex">
                        <input
                          type="url"
                          value={newImage}
                          onChange={(e) => setNewImage(e.target.value)}
                          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter image URL"
                        />
                        <button
                          type="button"
                          onClick={handleAddImage}
                          className="bg-blue-700 text-white px-4 py-2 rounded-r-md hover:bg-blue-800 transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {field.value.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          {field.value.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`Project image ${index + 1}`}
                                className="w-full h-32 object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-2 text-sm text-gray-500">No images added yet</p>
                      )}
                      
                      {errors.images && (
                        <p className="mt-1 text-sm text-red-500">{errors.images.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Videos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Videos (Optional, embed URLs)
                </label>
                <Controller
                  name="videos"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <div className="flex">
                        <input
                          type="url"
                          value={newVideo}
                          onChange={(e) => setNewVideo(e.target.value)}
                          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter video embed URL"
                        />
                        <button
                          type="button"
                          onClick={handleAddVideo}
                          className="bg-blue-700 text-white px-4 py-2 rounded-r-md hover:bg-blue-800 transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {field.value.length > 0 ? (
                        <div className="space-y-4 mt-4">
                          {field.value.map((video, index) => (
                            <div key={index} className="relative">
                              <div className="aspect-w-16 aspect-h-9 mb-2">
                                <iframe
                                  src={video}
                                  title={`Project Video ${index + 1}`}
                                  className="w-full h-48 rounded-md"
                                  allowFullScreen
                                ></iframe>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveVideo(index)}
                                className="text-red-600 hover:text-red-800 font-medium text-sm"
                              >
                                <Trash className="w-4 h-4 inline mr-1" /> Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-2 text-sm text-gray-500">No videos added yet</p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Categories & Technologies Section */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Categories & Technologies</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technologies <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="technologies"
                    control={control}
                    rules={{ required: 'At least one technology is required' }}
                    render={({ field }) => (
                      <div>
                        <div className="flex">
                          <input
                            type="text"
                            value={newTechnology}
                            onChange={(e) => setNewTechnology(e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add technology (e.g., React)"
                          />
                          <button
                            type="button"
                            onClick={handleAddTechnology}
                            className="bg-blue-700 text-white px-4 py-2 rounded-r-md hover:bg-blue-800 transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {field.value.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {field.value.map((tech, index) => (
                              <div
                                key={index}
                                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                              >
                                {tech}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTechnology(index)}
                                  className="ml-1 text-blue-800 hover:text-blue-600"
                                >
                                  <Trash className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="mt-2 text-sm text-gray-500">No technologies added yet</p>
                        )}
                        
                        {errors.technologies && (
                          <p className="mt-1 text-sm text-red-500">{errors.technologies.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categories <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="categories"
                    control={control}
                    rules={{ required: 'At least one category is required' }}
                    render={({ field }) => (
                      <div>
                        <div className="flex">
                          <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add category (e.g., Web App)"
                          />
                          <button
                            type="button"
                            onClick={handleAddCategory}
                            className="bg-blue-700 text-white px-4 py-2 rounded-r-md hover:bg-blue-800 transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {field.value.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {field.value.map((category, index) => (
                              <div
                                key={index}
                                className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                              >
                                {category}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCategory(index)}
                                  className="ml-1 text-gray-600 hover:text-gray-900"
                                >
                                  <Trash className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="mt-2 text-sm text-gray-500">No categories added yet</p>
                        )}
                        
                        {errors.categories && (
                          <p className="mt-1 text-sm text-red-500">{errors.categories.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Additional Links (Optional)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Live Demo */}
                <div>
                  <label htmlFor="liveDemo" className="block text-sm font-medium text-gray-700 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    id="liveDemo"
                    type="url"
                    {...register('liveDemo', {
                      pattern: {
                        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                        message: 'Enter a valid URL'
                      }
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.liveDemo ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.liveDemo && (
                    <p className="mt-1 text-sm text-red-500">{errors.liveDemo.message}</p>
                  )}
                </div>

                {/* Source Code */}
                <div>
                  <label htmlFor="sourceCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Source Code URL
                  </label>
                  <input
                    id="sourceCode"
                    type="url"
                    {...register('sourceCode', {
                      pattern: {
                        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                        message: 'Enter a valid URL'
                      }
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.sourceCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.sourceCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.sourceCode.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="px-6 py-2 border border-gray-300 rounded-md mr-4 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 bg-blue-700 text-white rounded-md font-medium hover:bg-blue-800 transition-colors ${
                  submitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {submitting ? (
                  <>
                    <LoadingSpinner size="small" color="white" /> Saving...
                  </>
                ) : id ? (
                  'Update Project'
                ) : (
                  'Create Project'
                )}
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProjectFormPage;