import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/cartStore";

const Cart: React.FC = () => {
  const { items, remove, updateQuantity, clearCart } = useCartStore();
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08; // 8% tax rate for example
  const total = subtotal + tax;

  const handleQuantityChange = (
    id: number,
    currentQuantity: number,
    change: number,
  ) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) {
      remove(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-sm max-w-lg w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-indigo-300" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors w-full shadow-sm"
          >
            <ArrowLeft className="h-5 w-5" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Shopping Cart
          </h1>
          <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
            {items.reduce((acc, item) => acc + item.quantity, 0)} Items
          </span>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8">
            <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
              <ul className="divide-y divide-gray-200">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50 transition-colors overflow-hidden"
                    >
                      {/* Item Image */}
                      <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-xl border border-gray-100 p-2 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between gap-4">
                          <div>
                            <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider mb-1">
                              {item.category}
                            </p>
                            <Link
                              to={`/product/${item.id}`}
                              className="text-base sm:text-lg font-semibold text-gray-900 hover:text-indigo-600 line-clamp-2"
                            >
                              {item.title}
                            </Link>
                          </div>
                          <p className="text-lg font-bold text-gray-900 shrink-0">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity, -1)
                              }
                              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-l-lg transition-colors focus:outline-none"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-10 text-center font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity, 1)
                              }
                              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-r-lg transition-colors focus:outline-none"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => remove(item.id)}
                            className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <Link
                  to="/"
                  className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-medium text-gray-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-black text-indigo-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                className="w-full bg-indigo-600 text-white px-6 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-colors shadow-sm focus:ring-4 focus:ring-indigo-100"
                onClick={() => alert("Checkout flow would start here!")}
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center text-xs text-gray-500">
                <p>Secure checkout powered by TechStore</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
