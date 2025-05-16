import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProjectFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProjectFilter = ({ categories, activeCategory, onCategoryChange }: ProjectFilterProps) => {
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const [refs, setRefs] = useState<(HTMLButtonElement | null)[]>([]);

  // Set up refs for each button
  useEffect(() => {
    setRefs(refs => Array(categories.length + 1).fill(null));
  }, [categories.length]);

  // Calculate the position of the active indicator
  useEffect(() => {
    const index = activeCategory === 'all' ? 0 : categories.indexOf(activeCategory) + 1;
    const activeButton = refs[index];
    
    if (activeButton) {
      setWidth(activeButton.offsetWidth);
      setLeft(activeButton.offsetLeft);
    }
  }, [activeCategory, categories, refs]);

  return (
    <div className="relative mb-8 flex justify-center">
      <div className="bg-white py-2 px-1 rounded-lg shadow-sm inline-flex relative">
        {/* Active indicator */}
        <motion.div
          className="absolute h-8 rounded-md bg-blue-100 z-0"
          initial={false}
          animate={{
            width,
            left,
            x: 0
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        />

        {/* All button */}
        <button
          ref={el => refs[0] = el}
          className={`px-4 py-1 rounded-md text-sm font-medium z-10 relative ${
            activeCategory === 'all' ? 'text-blue-800' : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => onCategoryChange('all')}
        >
          All
        </button>

        {/* Category buttons */}
        {categories.map((category, index) => (
          <button
            key={category}
            ref={el => refs[index + 1] = el}
            className={`px-4 py-1 rounded-md text-sm font-medium z-10 relative ${
              activeCategory === category ? 'text-blue-800' : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilter;