"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/90 backdrop-blur-lg border-b border-gray-800/50" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white hover:text-indigo-400 transition-colors">
            SecureVault
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="/security"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Security
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/signin"
              className="text-gray-300 hover:text-white font-medium transition-colors"
            >
              Sign In
            </Link>
          <motion.div
            className="inline-block border border-gray-500 rounded-lg p-1 bg-white/10 backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.9,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/signin"
              className="bg-gradient-to-br from-indigo-700 to-indigo-500 px-6 py-2 rounded-md block transition-all duration-200 hover:from-indigo-600 hover:to-indigo-400 text-sm sm:text-base"
            >
              Get Started
            </Link>
          </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;