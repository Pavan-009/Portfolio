import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Code, Database, Layout, Server } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { skillsApi } from '../services/api';
import { toast } from '../components/ui/Toaster';

interface Skill {
  _id: string;
  category: string;
  icon: string;
  items: string[];
}

const AdminSkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [newSkill, setNewSkill] = useState({
    category: '',
    icon: 'code',
    items: [''],
  });

  useEffect(() => {
    fetchSkills();
  }, []);

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

  const handleAddSkill = async () => {
    try {
      const filteredItems = newSkill.items.filter(item => item.trim() !== '');
      if (!newSkill.category || filteredItems.length === 0) {
        toast.error('Please provide a category and at least one skill');
        return;
      }

      await skillsApi.create({
        ...newSkill,
        items: filteredItems,
      });
      
      toast.success('Skill added successfully');
      setNewSkill({ category: '', icon: 'code', items: [''] });
      fetchSkills();
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error('Failed to add skill');
    }
  };

  const handleUpdateSkill = async (id: string) => {
    if (!editingSkill) return;

    try {
      const filteredItems = editingSkill.items.filter(item => item.trim() !== '');
      if (!editingSkill.category || filteredItems.length === 0) {
        toast.error('Please provide a category and at least one skill');
        return;
      }

      await skillsApi.update(id, {
        ...editingSkill,
        items: filteredItems,
      });
      
      toast.success('Skill updated successfully');
      setEditingSkill(null);
      fetchSkills();
    } catch (error) {
      console.error('Error updating skill:', error);
      toast.error('Failed to update skill');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      await skillsApi.delete(id);
      toast.success('Skill deleted successfully');
      fetchSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error('Failed to delete skill');
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'layout':
        return <Layout className="w-6 h-6" />;
      case 'server':
        return <Server className="w-6 h-6" />;
      case 'database':
        return <Database className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Skills</h1>

      {/* Add New Skill Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Skill</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Frontend Development"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <select
                value={newSkill.icon}
                onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="code">Code</option>
                <option value="layout">Layout</option>
                <option value="server">Server</option>
                <option value="database">Database</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills
            </label>
            {newSkill.items.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...newSkill.items];
                    newItems[index] = e.target.value;
                    setNewSkill({ ...newSkill, items: newItems });
                  }}
                  className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newItems = newSkill.items.filter((_, i) => i !== index);
                    setNewSkill({ ...newSkill, items: newItems.length ? newItems : [''] });
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setNewSkill({ ...newSkill, items: [...newSkill.items, ''] })}
              className="text-blue-700 hover:text-blue-800 font-medium text-sm flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Skill
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddSkill}
            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Add Skill Category
          </button>
        </div>
      </div>

      {/* Skills List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <motion.div
            key={skill._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            {editingSkill && editingSkill._id === skill._id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingSkill.category}
                    onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <select
                    value={editingSkill.icon}
                    onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="code">Code</option>
                    <option value="layout">Layout</option>
                    <option value="server">Server</option>
                    <option value="database">Database</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills
                  </label>
                  {editingSkill.items.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newItems = [...editingSkill.items];
                          newItems[index] = e.target.value;
                          setEditingSkill({ ...editingSkill, items: newItems });
                        }}
                        className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = editingSkill.items.filter((_, i) => i !== index);
                          setEditingSkill({ ...editingSkill, items: newItems.length ? newItems : [''] });
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setEditingSkill({ ...editingSkill, items: [...editingSkill.items, ''] })}
                    className="text-blue-700 hover:text-blue-800 font-medium text-sm flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Skill
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateSkill(skill._id)}
                    className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingSkill(null)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-blue-700 mr-3">
                      {getIconComponent(skill.icon)}
                    </div>
                    <h3 className="text-lg font-semibold">{skill.category}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingSkill(skill)}
                      className="text-blue-700 hover:text-blue-800"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AdminSkillsPage;