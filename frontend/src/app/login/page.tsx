"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Basic validation
      if (!form.email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      if (form.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // On successful login
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/30 to-green-100/30"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              opacity: 0.2
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              transition: {
                duration: Math.random() * 30 + 30,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md z-10"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 h-2"></div>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your SmartRetail dashboard</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg"
              >
                <p className="text-red-700">{error}</p>
              </motion.div>
            )}

            <motion.form 
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="your@email.com"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${loading ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700'}`}
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </motion.div>
            </motion.form>

            <motion.div 
              variants={itemVariants}
              className="mt-6 text-center text-sm text-gray-600"
            >
              <p>
                Don't have an account?{' '}
                <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </a>
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} SmartRetail. All rights reserved.
        </div>
      </motion.div>
    </div>
  );
}