 "use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiLoader, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    number: false,
    specialChar: false,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    // Check password requirements
    setPasswordRequirements({
      length: form.password.length >= 8,
      number: /\d/.test(form.password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
    });
  }, [form.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form
      if (!form.name.trim()) {
        throw new Error("Please enter your name");
      }

      if (!form.email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      if (form.password !== form.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (!passwordRequirements.length || !passwordRequirements.number || !passwordRequirements.specialChar) {
        throw new Error("Password does not meet requirements");
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On successful registration
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
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
                <FiUser className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
              <p className="text-gray-600">Join SmartRetail today</p>
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

            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Account Created!</h3>
                <p className="text-gray-600">Redirecting to login page...</p>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>

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
                  <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <p className={`flex items-center ${passwordRequirements.length ? 'text-green-600' : 'text-gray-500'}`}>
                      <FiCheck className="mr-1" /> At least 8 characters
                    </p>
                    <p className={`flex items-center ${passwordRequirements.number ? 'text-green-600' : 'text-gray-500'}`}>
                      <FiCheck className="mr-1" /> Contains a number
                    </p>
                    <p className={`flex items-center ${passwordRequirements.specialChar ? 'text-green-600' : 'text-gray-500'}`}>
                      <FiCheck className="mr-1" /> Contains a special character
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
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
                        Creating account...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </motion.div>
              </motion.form>
            )}

            <motion.div 
              variants={itemVariants}
              className="mt-6 text-center text-sm text-gray-600"
            >
              <p>
                Already have an account?{' '}
                <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
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