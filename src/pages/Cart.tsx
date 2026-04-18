import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/cartStore";

const Cart: React.FC = () => {
  const { items, remove, updateQuantity, clearCart } =
    useCartStore();

  const navigate = useNavigate();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleQuantity = (
    id: number,
    qty: number,
    value: number
  ) => {
    const newQty = qty + value;

    if (newQty < 1) remove(id);
    else updateQuantity(id, newQty);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">

          <div className="w-24 h-24 mx-auto rounded-full bg-indigo-50 flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-indigo-500" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mb-8">
            Add products to your cart and enjoy shopping.
          </p>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Continue Shopping
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>

            <p className="text-gray-500 mt-1">
              {totalItems} items in your bag
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Products */}
          <div className="lg:col-span-2 space-y-5">

            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row gap-5"
                >

                  {/* Image */}
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-xl p-3 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">

                    <p className="text-xs uppercase text-indigo-600 font-semibold mb-1">
                      {item.category}
                    </p>

                    <Link
                      to={`/product/${item.id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-indigo-600 line-clamp-2"
                    >
                      {item.title}
                    </Link>

                    <p className="text-xl font-bold text-indigo-600 mt-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Controls */}
                    <div className="flex items-center justify-between mt-5">

                      <div className="flex items-center border rounded-xl overflow-hidden">

                        <button
                          onClick={() =>
                            handleQuantity(
                              item.id,
                              item.quantity,
                              -1
                            )
                          }
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="px-4 font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            handleQuantity(
                              item.id,
                              item.quantity,
                              1
                            )
                          }
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>

                      </div>

                      <button
                        onClick={() => remove(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>

                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>

          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-24">

              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">
                    Free
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-indigo-600">
                    ${total.toFixed(2)}
                  </span>
                </div>

              </div>

              <button
                onClick={() =>
                  alert("Checkout Started")
                }
                className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                Proceed to Checkout
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                <ShieldCheck className="h-4 w-4" />
                Secure Payment
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;