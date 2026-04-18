import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  LogOut,
  LogIn,
  Menu,
  X,
  Store,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, logout, user } = useAuthStore();
  const { items } = useCartStore();

  const navigate = useNavigate();

  const cartItemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 group"
          >
            <div className="bg-indigo-100 p-2 rounded-xl group-hover:bg-indigo-200 transition">
              <Store className="h-6 w-6 text-indigo-600" />
            </div>

            <span className="text-xl font-bold text-gray-800">
              VivekStore
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Home
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>

              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Hi, {user?.name || "User"}
                </span>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-2">

            <Link
              to="/cart"
              className="relative p-2 text-gray-700"
            >
              <ShoppingCart className="h-6 w-6" />

              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-4 py-4 space-y-3">

          <Link
            to="/"
            onClick={closeMenu}
            className="block text-gray-700 hover:text-indigo-600 font-medium"
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <p className="text-sm text-gray-500">
                Hi, {user?.name || "User"}
              </p>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
