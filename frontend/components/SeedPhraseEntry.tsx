"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaKey, FaLock } from "react-icons/fa";
import { usePrivy } from "@privy-io/react-auth";
import { generateMasterKey, encryptWithKey, encryptMasterKeyWithPassword } from "@/lib/crypto";

export default function SeedPhraseEntry() {
  const { user } = usePrivy();
  const [seedPhrase, setSeedPhrase] = useState("");
  const [confirmSeedPhrase, setConfirmSeedPhrase] = useState("");
  const [pin, setPin] = useState("");
  const [trusteeEmail, setTrusteeEmail] = useState("");
  const [trusteePin, setTrusteePin] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // simulate encryption (replace with real crypto later)
  // const encryptSecret = (text: string) => {
  //   return btoa(text); // base64 encode for demo
  // };

  const handleSubmit = async () => {
    if (!seedPhrase || seedPhrase !== confirmSeedPhrase) return;
    if (!user) {
      alert("You must be logged in first!");
      return;
    }

    setLoading(true);
    try {
      // 1. Generate a random Master Key for this vault
      const masterKey = generateMasterKey();

      // 2. Encrypt the secret (Seed Phrase) with the Master Key
      const encryptedSecret = encryptWithKey(seedPhrase, masterKey);

      // 3. Encrypt the Master Key with the User's PIN
      const encryptedKeyForUser = await encryptMasterKeyWithPassword(masterKey, pin);

      // 4. Encrypt the Master Key with Trustee's Email/Password (if provided)
      let encryptedKeyForTrustee = '';
      if (trusteeEmail && trusteePin) {
        encryptedKeyForTrustee = await encryptMasterKeyWithPassword(masterKey, trusteePin);
      }

      const body = {
        userId: user.id,
        walletAddress: user.wallet?.address,
        title,
        description,
        encryptedSecret,
        encryptedKeyForUser,
        encryptedKeyForTrustee
      };

      const res = await fetch("http://localhost:3000/api/vaults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save vault");

      const data = await res.json();
      console.log("Vault saved:", data);
      alert("Vault saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving vault");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6 rounded-lg bg-gray-800 text-white mt-20"
    >
      <div className="flex items-center mb-6">
        <FaKey className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-xl font-bold">Enter Seed Phrase</h2>
      </div>

      <p className="mb-6 text-gray-300">
        Your seed phrase will be encrypted client-side before storage.
      </p>

      <div className="space-y-4">
        {/* Seed phrase */}
        <div>
          <label className="block text-sm font-medium mb-2">Seed Phrase</label>
          <textarea
            rows={3}
            value={seedPhrase}
            onChange={(e) => setSeedPhrase(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
          />
        </div>

        {/* Confirm seed phrase */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Confirm Seed Phrase
          </label>
          <textarea
            rows={3}
            value={confirmSeedPhrase}
            onChange={(e) => setConfirmSeedPhrase(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
          />
        </div>

        {/* Recovery PIN */}
        <div>
          <label className="block text-sm font-medium mb-2">Recovery PIN</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
          />
        </div>

        {/* Trustee email */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address of Trustee
          </label>
          <input
            type="email"
            value={trusteeEmail}
            onChange={(e) => setTrusteeEmail(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
            placeholder="trustee@example.com"
          />
        </div>

        {/* Trustee PIN */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Trustee Access Password (Share this securely with them!)
          </label>
          <input
            type="password"
            value={trusteePin}
            onChange={(e) => setTrusteePin(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
            placeholder="Create a password for your trustee..."
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div className="flex items-center text-sm text-gray-400">
          <FaLock className="mr-2" />
          <span>End-to-end encrypted</span>
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full py-3 rounded-lg font-medium transition-colors mt-4 ${seedPhrase && seedPhrase === confirmSeedPhrase && !loading
            ? "bg-indigo-500 hover:bg-indigo-600 text-white"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          disabled={!seedPhrase || seedPhrase !== confirmSeedPhrase || loading}
        >
          {loading ? "Encrypting..." : "Encrypt and Continue"}
        </button>
      </div>
    </motion.div>
  );
}
