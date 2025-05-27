import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Server } from 'lucide-react';
import { skillsApi } from '../../services/api';
import LoadingSpinner from '../ui/LoadingSpinner';
import { toast } from '../ui/Toaster';
import pavanImage from '../../asserts/pavan.jpg';

interface Skill {
  _id: string;
  category: string;
  icon: string;
  items: string[];
}
//About section component
const AboutSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillsApi.getAll();
        setSkills(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching skills:', error);
        toast.error('Failed to load skills');
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'layout':
        return <Layout className="w-6 h-6" />;
      case 'server':
        return <Server className="w-6 h-6" />;
      case 'database':
        return <Database className="w-6 h-6" />;
      case 'code':
        return <Code className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative w-48 h-48 mx-auto"
              >
                <img
                  src={pavanImage}
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover shadow-lg"
                />
                <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-10"></div>
              </motion.div>
            </div>
            
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4"
              >
                <p className="text-gray-700 leading-relaxed">
                  I am a passionate developer with a strong foundation in frontend technologies, bringing over 3+ of experience in crafting engaging web applications using HTML, CSS, JavaScript, jQuery,and React JS. My initial curiosity in how the web works has naturally led me to explore the full spectrum of web development. While my core expertise lies in the client-side, I am actively expanding my knowledge into backend domains, currently learning MongoDB for robust data management and Zustand for efficient state management within my React projects. This journey reflects my commitment to becoming a versatile full-stack developer capable of building comprehensive and scalable solutions.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  I specialize in creating scalable, user-friendly applications using React and Node.js. 
                  My approach combines clean code principles with modern design patterns to deliver 
                  high-quality solutions that solve real-world problems.
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Skills & Expertise</h3>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="large" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skillGroup, index) => (
                  <motion.div
                    key={skillGroup._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-white rounded-lg p-6 shadow-md"
                  >
                    <div className="flex items-center mb-4">
                      <div className="text-blue-600 mr-3">
                        {getIconComponent(skillGroup.icon)}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {skillGroup.category}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;