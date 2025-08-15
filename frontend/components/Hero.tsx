"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-[url('/background-image.jpg')] bg-no-repeat bg-cover text-white">
      <motion.div 
        className="absolute inset-0 bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      <div className="max-w-2xl relative z-10">
        <motion.h1 
          className="text-6xl font-semibold"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            ease: "easeOut" 
          }}
        >
          If life changes, your secrets stay safe
        </motion.h1>
        
        <motion.p 
          className="my-4 text-lg text-gray-400"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.6,
            ease: "easeOut" 
          }}
        >
          Assign trusted friends or family as recovery contacts, so your assets
          are safe no matter what happens.
        </motion.p>
        
        <motion.div 
          className="inline-block border border-gray-500 rounded-lg p-1 bg-white/10 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.9,
            ease: "easeOut" 
          }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href={""} 
            className="bg-gradient-to-br from-indigo-700 to-indigo-500 px-6 py-2 rounded-md block transition-all duration-200 hover:from-indigo-600 hover:to-indigo-400"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </div>
  );
}