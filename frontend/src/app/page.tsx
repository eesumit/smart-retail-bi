"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiShoppingCart, FiTrendingUp, FiPieChart, FiUsers, FiArrowRight } from "react-icons/fi";

export default function HomePage() {
  const features = [
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Monitor your business performance with live dashboards"
    },
    {
      icon: <FiShoppingCart className="w-6 h-6" />,
      title: "Inventory Management",
      description: "Track stock levels and automate reordering"
    },
    {
      icon: <FiPieChart className="w-6 h-6" />,
      title: "Sales Reporting",
      description: "Detailed insights into your revenue streams"
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Customer Insights",
      description: "Understand your customers' buying patterns"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-blue-900">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10 rounded-full"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
            }}
            animate={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              transition: {
                duration: Math.random() * 30 + 30,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>

      <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl space-y-8 mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-300">
              SmartRetail
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your retail business with our all-in-one management platform. 
            Gain powerful insights, streamline operations, and boost your sales.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/login"
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Get Started <FiArrowRight />
            </Link>
            <Link
              href="/register"
              className="bg-white/10 text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-all border border-white/20 hover:border-white/30 flex items-center justify-center gap-2"
            >
              Create Account
            </Link>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full px-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="text-green-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full mt-16 px-4"
        >
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">100+</div>
            <div className="text-gray-300">Businesses</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
            <div className="text-gray-300">Support</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">50K+</div>
            <div className="text-gray-300">Transactions</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
            <div className="text-gray-300">Uptime</div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your business?</h2>
          <Link
            href="/register"
            className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl text-lg font-medium"
          >
            Start Your Free Trial
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative py-8 text-center text-gray-400 text-sm">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} SmartRetail. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}