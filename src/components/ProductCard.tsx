import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "../services/api";
import { useCartStore } from "../store/cartStore";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { add } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group"
    >
      {/* Product Image */}
      <Link
        to={`/product/${product.id}`}
        className="relative h-56 bg-white p-6 flex items-center justify-center overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-gray-700">
            {product.rating.rate}
          </span>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow border-t border-gray-50">
        <span className="text-xs font-medium text-indigo-500 uppercase tracking-wider mb-2">
          {product.category}
        </span>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-indigo-600 transition-colors h-12">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            to={`/product/${product.id}`}
            className="flex items-center justify-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-gray-900 transition-colors border border-gray-200"
          >
            <Eye className="h-4 w-4" />
            Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
