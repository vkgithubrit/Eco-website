// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCartStore } from "../store/cartStore";

// const Cart: React.FC = () => {
//   const { items, remove, updateQuantity, clearCart } = useCartStore();
//   const navigate = useNavigate();

//   const subtotal = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0,
//   );
//   const tax = subtotal * 0.08; // 8% tax rate for example
//   const total = subtotal + tax;

//   const handleQuantityChange = (
//     id: number,
//     currentQuantity: number,
//     change: number,
//   ) => {
//     const newQuantity = currentQuantity + change;
//     if (newQuantity < 1) {
//       remove(id);
//     } else {
//       updateQuantity(id, newQuantity);
//     }
//   };

//   if (items.length === 0) {
//     return (
//       <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col items-center justify-center p-4">
//         <div className="bg-white p-10 rounded-2xl shadow-sm max-w-lg w-full text-center border border-gray-100">
//           <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
//             <ShoppingBag className="h-10 w-10 text-indigo-300" />
//           </div>
//           <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
//             Your cart is empty
//           </h2>
//           <p className="text-gray-500 mb-8">
//             Looks like you haven't added anything to your cart yet.
//           </p>
//           <button
//             onClick={() => navigate("/")}
//             className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors w-full shadow-sm"
//           >
//             <ArrowLeft className="h-5 w-5" />
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-extrabold text-gray-900">
//             Shopping Cart
//           </h1>
//           <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
//             {items.reduce((acc, item) => acc + item.quantity, 0)} Items
//           </span>
//         </div>

//         <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
//           {/* Cart Items List */}
//           <div className="lg:col-span-8">
//             <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
//               <ul className="divide-y divide-gray-200">
//                 <AnimatePresence>
//                   {items.map((item) => (
//                     <motion.li
//                       key={item.id}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50 transition-colors overflow-hidden"
//                     >
//                       {/* Item Image */}
//                       <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-xl border border-gray-100 p-2 flex items-center justify-center">
//                         <img
//                           src={item.image}
//                           alt={item.title}
//                           className="max-h-full max-w-full object-contain"
//                         />
//                       </div>

//                       {/* Item Details */}
//                       <div className="flex-1 flex flex-col justify-between">
//                         <div className="flex justify-between gap-4">
//                           <div>
//                             <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider mb-1">
//                               {item.category}
//                             </p>
//                             <Link
//                               to={`/product/${item.id}`}
//                               className="text-base sm:text-lg font-semibold text-gray-900 hover:text-indigo-600 line-clamp-2"
//                             >
//                               {item.title}
//                             </Link>
//                           </div>
//                           <p className="text-lg font-bold text-gray-900 shrink-0">
//                             ${(item.price * item.quantity).toFixed(2)}
//                           </p>
//                         </div>

//                         <div className="mt-4 flex items-center justify-between">
//                           {/* Quantity Controls */}
//                           <div className="flex items-center border border-gray-300 rounded-lg bg-white">
//                             <button
//                               onClick={() =>
//                                 handleQuantityChange(item.id, item.quantity, -1)
//                               }
//                               className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-l-lg transition-colors focus:outline-none"
//                               aria-label="Decrease quantity"
//                             >
//                               <Minus className="h-4 w-4" />
//                             </button>
//                             <span className="w-10 text-center font-semibold text-gray-900">
//                               {item.quantity}
//                             </span>
//                             <button
//                               onClick={() =>
//                                 handleQuantityChange(item.id, item.quantity, 1)
//                               }
//                               className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-r-lg transition-colors focus:outline-none"
//                               aria-label="Increase quantity"
//                             >
//                               <Plus className="h-4 w-4" />
//                             </button>
//                           </div>

//                           {/* Remove Button */}
//                           <button
//                             onClick={() => remove(item.id)}
//                             className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                             <span className="hidden sm:inline">Remove</span>
//                           </button>
//                         </div>
//                       </div>
//                     </motion.li>
//                   ))}
//                 </AnimatePresence>
//               </ul>

//               <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
//                 <Link
//                   to="/"
//                   className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
//                 >
//                   <ArrowLeft className="h-4 w-4" />
//                   Continue Shopping
//                 </Link>
//                 <button
//                   onClick={clearCart}
//                   className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors"
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-4 mt-8 lg:mt-0">
//             <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 sticky top-24">
//               <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
//                 Order Summary
//               </h2>

//               <div className="space-y-4 text-sm text-gray-600 mb-6">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span className="font-medium text-gray-900">
//                     ${subtotal.toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span className="font-medium text-green-600">Free</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Estimated Tax (8%)</span>
//                   <span className="font-medium text-gray-900">
//                     ${tax.toFixed(2)}
//                   </span>
//                 </div>

//                 <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
//                   <span className="text-base font-bold text-gray-900">
//                     Total
//                   </span>
//                   <span className="text-2xl font-black text-indigo-600">
//                     ${total.toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 className="w-full bg-indigo-600 text-white px-6 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-colors shadow-sm focus:ring-4 focus:ring-indigo-100"
//                 onClick={() => alert("Checkout flow would start here!")}
//               >
//                 Proceed to Checkout
//               </button>

//               <div className="mt-4 text-center text-xs text-gray-500">
//                 <p>Secure checkout powered by TechStore</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


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