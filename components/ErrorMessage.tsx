"use client";

import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-lg"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="p-2 bg-red-100 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-600" />
          </motion.div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-red-800 mb-1">
            Error occurred
          </h3>
          <p className="text-sm text-red-700">
            {message}
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex-shrink-0 p-1 text-red-400 hover:text-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>
      
      {/* Error Details */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ delay: 0.2 }}
        className="mt-3 pt-3 border-t border-red-200"
      >
        <p className="text-xs text-red-600">
          Please try again or contact support if the problem persists.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ErrorMessage;

