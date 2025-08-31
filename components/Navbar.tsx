"use client";

import { motion } from 'framer-motion';
import { Sparkles, Zap, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 glass-effect border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                AI Image Analyzer
              </h1>
              <p className="text-xs text-gray-500 font-medium">Powered by Gemini</p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a
              href="#features"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Features
            </motion.a>
            <motion.a
              href="#how-it-works"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              How it Works
            </motion.a>
            <motion.a
              href="#about"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              About
            </motion.a>
          </div>

          {/* CTA Button */}
          <motion.button
            className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Search className="w-4 h-4" />
            <span>Start Analyzing</span>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <div className="w-5 h-0.5 bg-gray-600 rounded"></div>
              <div className="w-5 h-0.5 bg-gray-600 rounded"></div>
              <div className="w-5 h-0.5 bg-gray-600 rounded"></div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200"
      >
        <div className="px-4 py-3 space-y-3">
          <a href="#features" className="block text-gray-700 hover:text-blue-600 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600 transition-colors">
            How it Works
          </a>
          <a href="#about" className="block text-gray-700 hover:text-blue-600 transition-colors">
            About
          </a>
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium">
            Start Analyzing
          </button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
