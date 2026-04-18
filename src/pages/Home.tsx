// import React, { useState, useEffect } from "react";
// import { motion } from 'framer-motion';
// import { Search, Loader2, AlertCircle, Filter } from "lucide-react";
// import { api } from "../services/api";
// import type { Product } from "../services/api";
// import ProductCard from "../components/ProductCard";

// const Home: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [debouncedSearch, setDebouncedSearch] = useState<string>("");
//   const [selectedCategory, setSelectedCategory] = useState<string>("all");

//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const itemsPerPage = 8;

//   // Debounce search term
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchTerm);
//       setCurrentPage(1);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // Fetch initial data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const [productsData, categoriesData] = await Promise.all([
//           api.getProducts(),
//           api.getCategories(),
//         ]);
//         setProducts(productsData);
//         setCategories(categoriesData);
//       } catch (err) {
//         setError("Failed to fetch data. Please try again later.");
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter products based on search and category
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.title
//       .toLowerCase()
//       .includes(debouncedSearch.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "all" || product.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const currentProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   if (loading) {
//     return (
//       <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50">
//         <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
//         <p className="text-gray-600 font-medium">Loading products...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50 p-4">
//         <div className="bg-red-50 p-6 rounded-lg max-w-md w-full text-center border border-red-100">
//           <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//           <h3 className="text-lg font-bold text-red-800 mb-2">
//             Oops! Something went wrong
//           </h3>
//           <p className="text-red-600">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-6 px-4 py-2 bg-red-100 text-red-700 rounded-md font-medium hover:bg-red-200 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen pb-12">
//       {/* Hero Section / Controls */}
//       <div className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight hidden sm:block">
//               Our Products
//             </h1>

//             <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 flex-grow max-w-2xl justify-end">
//               {/* Search Bar */}
//               <div className="relative w-full sm:max-w-md">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
//                 />
//               </div>

//               {/* Category Filter */}
//               <div className="relative w-full sm:w-48 shrink-0">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Filter className="h-4 w-4 text-gray-400" />
//                 </div>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
//                   className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg border appearance-none bg-white"
//                 >
//                   <option value="all">All Categories</option>
//                   {categories.map((category) => (
//                     <option
//                       key={category}
//                       value={category}
//                       className="capitalize"
//                     >
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {filteredProducts.length > 0 ? (
//           <>
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, staggerChildren: 0.1 }}
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//             >
//               {currentProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </motion.div>

//             {totalPages > 1 && (
//               <div className="mt-12 flex justify-center items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Previous
//                 </button>
//                 <span className="text-sm text-gray-700 mx-4">
//                   Page <span className="font-semibold">{currentPage}</span> of{" "}
//                   <span className="font-semibold">{totalPages}</span>
//                 </span>
//                 <button
//                   onClick={() =>
//                     setCurrentPage((p) => Math.min(totalPages, p + 1))
//                   }
//                   disabled={currentPage === totalPages}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="text-center py-20">
//             <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-1">
//               No products found
//             </h3>
//             <p className="text-gray-500">
//               Try adjusting your search or filter to find what you're looking
//               for.
//             </p>
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setSelectedCategory("all");
//               }}
//               className="mt-4 text-indigo-600 hover:text-indigo-500 font-medium"
//             >
//               Clear all filters
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Home;


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