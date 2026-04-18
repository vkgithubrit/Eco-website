import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Loader2,
  AlertCircle,
  Filter,
  Sparkles,
} from "lucide-react";
import { api } from "../services/api";
import type { Product } from "../services/api";
import ProductCard from "../components/ProductCard";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">
          Loading Products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-500">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="h-8 w-8" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Products
          </h1>

          <p className="text-indigo-100 max-w-2xl mx-auto">
            Shop smart with premium quality products at the best price.
          </p>
        </div>
      </section>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-5 grid md:grid-cols-2 gap-4">

          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
            >
              <option value="all">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-4 py-12">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Products
          </h2>

          <span className="text-sm text-gray-500">
            {filteredProducts.length} Items Found
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-3">

                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.max(1, p - 1)
                    )
                  }
                  className="px-5 py-2 rounded-xl border bg-white hover:bg-gray-100 disabled:opacity-50"
                >
                  Prev
                </button>

                <span className="px-4 py-2 font-medium">
                  {currentPage} / {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(totalPages, p + 1)
                    )
                  }
                  className="px-5 py-2 rounded-xl border bg-white hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>

              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <Search className="h-14 w-14 text-gray-300 mx-auto mb-4" />

            <h3 className="text-xl font-semibold text-gray-800">
              No Products Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-5 px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;