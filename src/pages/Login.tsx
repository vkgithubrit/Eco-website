import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LogIn,
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [error, setError] = useState("");

  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    location.state?.from?.pathname || "/";

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError(
        "Please enter username and password."
      );
      return;
    }

    login({
      id: Date.now().toString(),
      name: username,
      email: `${username}@gmail.com`,
      token: "demo-token",
    });

    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8"
      >

        {/* Top Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-indigo-100 p-4 rounded-full">
            <ShieldCheck className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to continue shopping
        </p>

        {/* Error */}
        {error && (
          <div className="mb-5 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Username */}
          <div className="relative">
            <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-4 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Options */}
          <div className="flex justify-between text-sm">

            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-700"
            >
              Forgot?
            </button>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
          >
            <LogIn className="h-5 w-5" />
            Sign In
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          New user?{" "}
          <span className="text-indigo-600 font-medium cursor-pointer">
            Create account
          </span>
        </p>

      </motion.div>
    </div>
  );
};

export default Login;