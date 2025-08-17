"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaKey, FaLock } from "react-icons/fa";

export default function SeedPhraseEntry() {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [confirmSeedPhrase, setConfirmSeedPhrase] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto p-6 rounded-lg bg-gray-800 text-white"
    >
      <div className="flex items-center mb-6">
        <FaKey className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-xl font-bold">Enter Seed Phrase</h2>
      </div>

      <p className="mb-6 text-gray-300">
        Your seed phrase will be encrypted client-side before storage.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Seed Phrase</label>
          <textarea
            rows={3}
            value={seedPhrase}
            onChange={(e) => setSeedPhrase(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">PIN</label>
          <input
            // rows={3}
            type="number"
            // value={confirmSeedPhrase}
            // onChange={(e) => setConfirmSeedPhrase(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address of Trustee
          </label>
          <input
            // rows={3}
            type="email"
            // value={confirmSeedPhrase}
            // onChange={(e) => setConfirmSeedPhrase(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div className="flex items-center text-sm text-gray-400">
          <FaLock className="mr-2" />
          <span>End-to-end encrypted</span>
        </div>

        <button
          className={`w-full py-3 rounded-lg font-medium transition-colors mt-4 ${
            seedPhrase && seedPhrase === confirmSeedPhrase
              ? "bg-indigo-500 hover:bg-indigo-600 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!seedPhrase || seedPhrase !== confirmSeedPhrase}
        >
          Encrypt and Continue
        </button>
      </div>
    </motion.div>
  );
}
