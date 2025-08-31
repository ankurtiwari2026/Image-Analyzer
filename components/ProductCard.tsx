"use client";

import { motion } from 'framer-motion';
import { Star, Tag, Palette, ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const similarityPercentage = Math.round((product.similarity || 0) * 100);
  
  const getSimilarityColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getSimilarityText = (percentage: number) => {
    if (percentage >= 80) return 'Excellent Match';
    if (percentage >= 60) return 'Good Match';
    if (percentage >= 40) return 'Fair Match';
    return 'Low Match';
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        
        {/* Similarity Badge */}
        <div className="absolute top-3 right-3">
          <div className={`${getSimilarityColor(similarityPercentage)} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg`}>
            {similarityPercentage}%
          </div>
        </div>

        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-3 left-3">
            <div className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
              {product.category}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and Brand */}
        <div>
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          {product.brand && (
            <p className="text-xs text-gray-500 mt-1 font-medium">
              {product.brand}
            </p>
          )}
        </div>

        {/* Similarity Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs text-gray-600 font-medium">
              {getSimilarityText(similarityPercentage)}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {similarityPercentage}% match
          </span>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                <Tag className="w-2 h-2" />
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="text-xs text-gray-400 px-2 py-1">
                +{product.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-2">
            <Palette className="w-3 h-3 text-gray-400" />
            <div className="flex gap-1">
              {product.colors.slice(0, 4).map((color: string, index: number) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {product.description && (
          <p className="text-xs text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

