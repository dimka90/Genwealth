"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center py-8 px-4 sm:px-8 md:px-16 lg:px-24 bg-[url('/background-image.jpg')] bg-no-repeat bg-cover bg-center text-white">
      <div className="absolute inset-0 bg-black/70" />

      {/* Centered content */}
      <div className="relative z-10 max-w-2xl w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6">
          If life changes, your secrets stay safe
        </h1>

        <p className="text-base sm:text-lg text-gray-400 mb-8">
          Assign trusted friends or family as recovery contacts, so your assets
          are safe no matter what happens.
        </p>

        <div className="inline-block ">
          <Link
            href="/signin"
            className="bg-gradient-to-br from-indigo-700 to-indigo-500 px-6 py-2 rounded-md block transition-all duration-200 hover:from-indigo-600 hover:to-indigo-400 text-sm sm:text-base"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
