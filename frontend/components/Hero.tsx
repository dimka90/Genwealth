"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center py-8 px-4 sm:px-8 md:px-16 lg:px-24 bg-[url('/background-image.jpg')] bg-no-repeat bg-cover bg-center text-white">
      <motion.div
        className="absolute inset-0 bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-7xl w-full">
        {/* Left side - Text content */}
        <div className="max-w-2xl relative z-10 text-center lg:text-left flex-1 order-2 lg:order-1 mt-8 lg:mt-0">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold"
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
            className="my-4 text-base sm:text-lg text-gray-400"
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
              href="/signin"
              className="bg-gradient-to-br from-indigo-700 to-indigo-500 px-6 py-2 rounded-md block transition-all duration-200 hover:from-indigo-600 hover:to-indigo-400 text-sm sm:text-base"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
        
        {/* Right side - Image */}
        <div className="relative z-10 flex-1 flex justify-center order-1 lg:order-2 w-full max-w-md lg:max-w-none">
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
            className="w-full"
          >
            <Image
              src={"/coins.png"}
              alt="Hero Image"
              width={500}
              height={300}
              className="rounded-lg shadow-lg w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}