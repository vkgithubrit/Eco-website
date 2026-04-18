import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Loader2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import type { Product } from '../services/api';
import { useCartStore } from '../store/cartStore';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { add } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await api.getProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details. It may not exist or there is a network issue.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      setIsAdding(true);
      add(product);
      setTimeout(() => setIsAdding(false), 500); // Visual feedback
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full text-center border border-gray-100">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h3>
          <p className="text-gray-500 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors w-full"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-white p-8 rounded-xl border border-gray-50 relative aspect-square">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-wider rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-yellow-700">{product.rating.rate}</span>
                  <span className="text-yellow-600 text-sm ml-1">({product.rating.count} reviews)</span>
                </div>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-black text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="prose prose-sm sm:prose-base text-gray-600 mb-10 border-t border-gray-100 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto">
                <button
                  onClick={handleAddToCart}
                  className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-sm ${
                    isAdding
                      ? 'bg-green-500 text-white shadow-green-200 hover:bg-green-600'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'
                  }`}
                >
                  <ShoppingCart className="h-6 w-6" />
                  {isAdding ? 'Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
