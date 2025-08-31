"use client";

import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';

interface FilterProps {
  value: number;
  setValue: (value: number) => void;
}

const Filter: React.FC<FilterProps> = ({ value, setValue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <SlidersHorizontal className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Similarity Filter</h3>
          <p className="text-sm text-gray-500">Adjust the minimum similarity threshold</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Minimum Similarity</span>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {(value * 100).toFixed(0)}%
          </span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <motion.button
            onClick={() => setValue(0.3)}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              value === 0.3 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Low
          </motion.button>
          <motion.button
            onClick={() => setValue(0.5)}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              value === 0.5 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Medium
          </motion.button>
          <motion.button
            onClick={() => setValue(0.7)}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              value === 0.7 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            High
          </motion.button>
          <motion.button
            onClick={() => setValue(0.9)}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              value === 0.9 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Very High
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Filter;
