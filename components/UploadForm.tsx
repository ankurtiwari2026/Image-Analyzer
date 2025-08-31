"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon, Search, Sparkles, Camera, Link, X, CheckCircle, Loader2 } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export type UploadFormProps = {
  image: string | null;
  setImage: (img: string | null) => void;
  setDominantColor: (color: string | null) => void;
  setFile: (file: File | null) => void;
  analyzed: boolean;
  inferredColor: string | null;
  inferredCategory: string | null;
  inferredName: string;
  onAnalyze?: () => void;
  onSearch: () => void;
  onSave: () => void;
  analyzing?: boolean;
};

const UploadForm: React.FC<UploadFormProps> = (props) => {
  const { 
    image, 
    setImage, 
    setDominantColor, 
    setFile, 
    analyzed, 
    inferredColor, 
    inferredCategory, 
    inferredName, 
    onAnalyze, 
    onSearch, 
    onSave, 
    analyzing 
  } = props;

  const [urlInput, setUrlInput] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');

  const extractDominantColor = (src: string) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let r = 0, g = 0, b = 0, count = 0;
        const step = 10 * 4;
        for (let i = 0; i < data.length; i += step) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
          setDominantColor(`#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`);
        }
      };
      img.onerror = () => setDominantColor(null);
      img.src = src;
    } catch {
      setDominantColor(null);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setImage(dataUrl);
        extractDominantColor(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  }, [setFile, setImage, extractDominantColor]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false
  });

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
  };

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) return;
    
    setImage(urlInput);
    try {
      const res = await fetch('/api/fetch-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.dataUrl) extractDominantColor(data.dataUrl);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const clearImage = () => {
    setImage(null);
    setFile(null);
    setUrlInput('');
    setDominantColor(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-4xl mx-auto"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-8"
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
          AI-Powered Image Analysis
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Upload any image and discover similar products using advanced AI technology powered by Google Gemini
        </p>
      </motion.div>

      {/* Upload Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8"
      >
        {/* Upload Method Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
          <motion.button
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
              uploadMethod === 'file' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setUploadMethod('file')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Camera className="w-4 h-4" />
            Upload File
          </motion.button>
          <motion.button
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
              uploadMethod === 'url' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setUploadMethod('url')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link className="w-4 h-4" />
            Image URL
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {uploadMethod === 'file' ? (
            <motion.div
              key="file-upload"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  isDragActive || isDragOver
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
                onDragOver={() => setIsDragOver(true)}
                onDragLeave={() => setIsDragOver(false)}
              >
                <input {...getInputProps()} />
                <motion.div
                  animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                </motion.div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {isDragActive ? 'Drop your image here' : 'Drag & drop an image here'}
                </p>
                <p className="text-gray-500 mb-4">or click to browse files</p>
                <p className="text-sm text-gray-400">Supports: JPG, PNG, GIF, WebP</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="url-upload"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex gap-3">
                <input
                  type="url"
                  placeholder="Paste image URL here..."
                  value={urlInput}
                  onChange={handleUrlChange}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                />
                <motion.button
                  onClick={handleUrlSubmit}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Preview */}
        <AnimatePresence>
          {image && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <div className="relative bg-gray-50 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Image Preview</h3>
                  <motion.button
                    onClick={clearImage}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={image} 
                      alt="Preview" 
                      className="max-h-64 rounded-lg shadow-lg object-contain bg-white"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    {analyzed && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-medium text-gray-700 mb-2">Product Details</h4>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">Name:</span> {inferredName}</div>
                            <div><span className="font-medium">Category:</span> {inferredCategory || 'N/A'}</div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Color:</span>
                              {inferredColor && (
                                <span 
                                  className="inline-block w-4 h-4 rounded border shadow-sm" 
                                  style={{ backgroundColor: inferredColor }}
                                />
                              )}
                              {inferredColor || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <AnimatePresence>
          {image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              {onAnalyze && (
                <motion.button
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white shadow-lg transition-all ${
                    analyzing 
                      ? 'bg-indigo-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                  }`}
                  onClick={onAnalyze}
                  disabled={!image || analyzing}
                  whileHover={!analyzing ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!analyzing ? { scale: 0.95 } : {}}
                >
                  {analyzing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  {analyzing ? 'Analyzing...' : 'Analyze Image'}
                </motion.button>
              )}
              
              <motion.button
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-medium shadow-lg transition-all"
                onClick={onSearch}
                disabled={!image || !analyzed}
                whileHover={!(!image || !analyzed) ? { scale: 1.05, y: -2 } : {}}
                whileTap={!(!image || !analyzed) ? { scale: 0.95 } : {}}
              >
                <Search className="w-4 h-4" />
                Find Similar Products
              </motion.button>
              
              <motion.button
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-lg font-medium shadow-lg transition-all"
                onClick={onSave}
                disabled={!image || !analyzed}
                whileHover={!(!image || !analyzed) ? { scale: 1.05, y: -2 } : {}}
                whileTap={!(!image || !analyzed) ? { scale: 0.95 } : {}}
              >
                <CheckCircle className="w-4 h-4" />
                Save to Catalog
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default UploadForm;
