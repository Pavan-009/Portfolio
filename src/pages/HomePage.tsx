import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Database, Layout,Bug , BarChart, ExternalLink } from 'lucide-react';
import ProjectCard from '../components/ui/ProjectCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AboutSection from '../components/sections/AboutSection';
import { projectApi, contactApi } from '../services/api';
import { toast } from '../components/ui/Toaster';

interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  date: string;
  liveDemo?: string;
  sourceCode?: string;
  property: string;
}

const HomePage = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await projectApi.getAll();
        // Get the top 3 projects sorted by priority
        const featured = response.data
          .sort((a: Project, b: Project) => b.priority - a.priority)
          .slice(0, 3);
        setFeaturedProjects(featured);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load featured projects');
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await contactApi.sendEmail(contactForm);
      toast.success('Message sent successfully!');
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const services = [
    {
      icon: <Layout className="w-6 h-6" />,
      title: 'Web Development',
      description: 'Creating responsive and performant web applications using modern technologies.',
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Frontend Development',
      description: 'Building interactive user interfaces with React and other modern frameworks.',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Backend Development',
      description: 'Developing scalable APIs and server-side applications.',
    },
    {
      icon: <Bug  className="w-6 h-6" />,
      title: 'Debugging & Optimization',
      description: 'Identifying and fixing performance issues in web applications.',
  
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
            >
              Turning Ideas into{' '}
              <span className="text-teal-300">Innovative Solutions</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-blue-100 mb-8"
            >
              Full-stack developer specializing in creating beautiful, functional, and scalable web applications.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center"
            >
              <Link
                to="/projects"
                className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                View Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <a
                href="#contact"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                Contact Me
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">My Services</h2>
            <p className="text-gray-600">
              I offer a wide range of development services to help bring your ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-700 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
              <p className="text-gray-600 max-w-2xl">
                Here are some of my recent projects. Each project represents my skills and expertise in different areas of web development.
              </p>
            </div>
            <Link
              to="/projects"
              className="text-blue-700 font-medium flex items-center hover:text-blue-900 transition-colors hidden md:flex"
            >
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="large" />
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-8 text-center">
              <p className="text-blue-700 mb-4">No projects found</p>
              <Link
                to="/admin/projects/new"
                className="inline-flex items-center text-blue-700 font-medium hover:text-blue-900"
              >
                Add your first project <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg font-medium shadow-md hover:bg-blue-800 transition-colors"
            >
              View All Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600">
              Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-blue-700 p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <p>Guntur</p>
                  <p>pavankumar.99gpk@gmail.com</p>
                  <p>9502396821</p>
                </div>
                <div className="flex space-x-4 mt-8">
                  <a
                    href="https://github.com/selariousKnight"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-200 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className={`w-full bg-blue-700 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-800 transition-colors ${
                      sending ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {sending ? (
                      <span className="flex items-center justify-center">
                        <LoadingSpinner size="small" color="white" />
                        <span className="ml-2">Sending...</span>
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;