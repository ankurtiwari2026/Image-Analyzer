"use client";

import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="relative">
        {/* Main Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
        
        {/* Inner Sparkle */}
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6 text-blue-600" />
        </motion.div>
      </div>
      
      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-center"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Analyzing your image
        </h3>
        <p className="text-gray-600 text-sm">
          Our AI is processing your image to find similar products
        </p>
        
        {/* Animated Dots */}
        <motion.div
          className="mt-4 flex justify-center space-x-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-blue-600 rounded-full"
            />
          ))}
        </motion.div>
      </motion.div>
      
      {/* Progress Bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="mt-6 w-64 h-2 bg-gray-200 rounded-full overflow-hidden"
      >
        <motion.div
          animate={{ 
            x: ["-100%", "100%"],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;

