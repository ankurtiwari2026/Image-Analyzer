"use client";
import { useState, useEffect } from 'react';

interface RelatedProduct {
  _id: string;
  name: string;
  category: string;
  imageUrl: string;
  tags?: string[];
  colors?: string[];
  brand?: string;
  similarity?: number;
}

interface RelatedProductsProps {
  productId: string;
  limit?: number;
}

export default function RelatedProducts({ productId, limit = 6 }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!productId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch(`/api/related-products?id=${productId}&limit=${limit}`);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch related products');
        }
        
        setRelatedProducts(data.relatedProducts || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load related products');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [productId, limit]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Related Products</h3>
        <div className="text-gray-600">Loading related products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Related Products</h3>
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Related Products</h3>
        <div className="text-gray-600">No related products found.</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Related Products ({relatedProducts.length})</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {relatedProducts.map((product) => (
          <div key={product._id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
              {product.similarity && (
                <div className="absolute top-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                  {Math.round(product.similarity * 100)}%
                </div>
              )}
            </div>
            <div className="mt-2">
              <div className="text-sm font-medium text-gray-900 truncate" title={product.name}>
                {product.name}
              </div>
              <div className="text-xs text-gray-500">{product.category}</div>
              {product.brand && (
                <div className="text-xs text-blue-600">{product.brand}</div>
              )}
              {product.colors && product.colors.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.colors.slice(0, 2).map((color, index) => (
                    <span
                      key={index}
                      className="w-3 h-3 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                  {product.colors.length > 2 && (
                    <span className="text-xs text-gray-400">+{product.colors.length - 2}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


