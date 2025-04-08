import React from 'react';
import { CategoryType } from '@/data/useCasesData';
import { motion } from 'framer-motion';

interface UseCaseCategoryProps {
  categories: CategoryType[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

export const UseCaseCategory: React.FC<UseCaseCategoryProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Explore by Category</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`
              relative px-5 py-3 rounded-lg flex items-center gap-2.5 transition-all duration-200
              ${activeCategory === category.id 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
                : 'bg-gray-900 text-gray-300 border border-gray-800 hover:border-green-500/20 hover:bg-gray-800'}
            `}
          >
            <span className={`${activeCategory === category.id ? 'text-white' : 'text-green-500'}`}>
              {category.icon}
            </span>
            <span className="font-medium">{category.name}</span>
            
            {activeCategory === category.id && (
              <motion.span
                layoutId="categoryHighlight"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 -z-10"
                initial={false}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default UseCaseCategory; 