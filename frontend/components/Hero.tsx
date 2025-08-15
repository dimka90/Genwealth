"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center py-8 px-24 bg-[url('/background-image.jpg')] bg-no-repeat bg-cover text-white">
      <motion.div
        className="absolute inset-0 bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className="flex items-center justify-center gap-12 max-w-7xl w-full">
        {/* Left side - Text content */}
        <div className="max-w-2xl relative z-10 text-left flex-1">
          <motion.h1
            className="text-6xl font-semibold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut",
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
              ease: "easeOut",
            }}
          >
            Assign trusted friends or family as recovery contacts, so your
            assets are safe no matter what happens.
          </motion.p>
          
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
              href={""}
              className="bg-gradient-to-br from-indigo-700 to-indigo-500 px-6 py-2 rounded-md block transition-all duration-200 hover:from-indigo-600 hover:to-indigo-400"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
        
        {/* Right side - Image */}
        <div className="relative z-10 flex-1 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <Image
              src={"/coins.png"}
              alt="Hero Image"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}