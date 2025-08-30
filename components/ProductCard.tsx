import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  similarity: number;
  brand?: string;
  description?: string;
  tags?: string[];
  colors?: string[];
  relatedProducts?: any[];
}

export default function ProductCard({ 
  id, 
  name, 
  category, 
  imageUrl, 
  similarity, 
  brand, 
  description, 
  tags, 
  colors,
  relatedProducts 
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-200 p-4 flex flex-col items-center gap-2 cursor-pointer"
    >
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-28 h-28 object-cover rounded mb-2 border"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        <div className="absolute top-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
          {Math.round(similarity * 100)}%
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-lg font-semibold text-gray-900">{name}</div>
        
        <div className="flex items-center gap-1 text-sm text-gray-500 justify-center">
          <Tag className="w-4 h-4" />
          {category}
        </div>
        
        {brand && (
          <div className="text-sm text-blue-600 font-medium">{brand}</div>
        )}
        
        {description && (
          <div className="text-xs text-gray-600 mt-1 line-clamp-2" title={description}>
            {description}
          </div>
        )}
      </div>
      
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs text-gray-400">+{tags.length - 3}</span>
          )}
        </div>
      )}
      
      {colors && colors.length > 0 && (
        <div className="flex gap-1 justify-center">
          {colors.slice(0, 4).map((color, index) => (
            <span
              key={index}
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
          {colors.length > 4 && (
            <span className="text-xs text-gray-400">+{colors.length - 4}</span>
          )}
        </div>
      )}
      
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="text-xs text-gray-500">
          {relatedProducts.length} related products
        </div>
      )}
    </motion.div>
  );
}

