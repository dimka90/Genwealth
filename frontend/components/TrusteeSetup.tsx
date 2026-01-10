'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserShield, FaCheck, FaKey } from 'react-icons/fa';
import { splitSecret } from '@/lib/shamir';
import { generateMasterKey } from '@/lib/crypto';
import toast from 'react-hot-toast';

export default function TrusteeSetup() {
  const [trustees, setTrustees] = useState<string[]>(['', '', '']);
  const [shares, setShares] = useState<string[]>([]);

  const handleChange = (index: number, value: string) => {
    const newTrustees = [...trustees];
    newTrustees[index] = value;
    setTrustees(newTrustees);
  };

  const handleConfirm = async () => {
    try {
      // 1. Generate a Master Key (in a real app, this would wrap the user's seed phrase)
      const masterKey = generateMasterKey();
      console.log("Master Key generated:", masterKey);

      // 2. Split the Master Key into 3 shares, threshold 2
      const generatedShares = splitSecret(masterKey, 3, 2);
      setShares(generatedShares);

      toast.success("Secret successfully split into 3 shares!");
      console.log("Shares generated:", generatedShares);

      // In a real app, we would now encrypt each share with the trustee's public key
      // and send it to the backend.
    } catch (error) {
      console.error("Error splitting secret:", error);
      toast.error("Failed to generate shares");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto p-6 rounded-lg bg-gray-800 text-white"
    >
      <div className="flex items-center mb-6">
        <FaUserShield className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-xl font-bold">Setup Recovery Trustees</h2>
      </div>

      {!shares.length ? (
        <>
          <p className="mb-6 text-gray-300">
            Enter email addresses of 3 trustees. We will use Shamir's Secret Sharing to split your key.
            (Threshold: 2 of 3)
          </p>

          <div className="space-y-4">
            {trustees.map((trustee, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1 border border-gray-600 rounded-lg px-4 py-3">
                  <input
                    type="email"
                    placeholder={`Trustee ${index + 1} email`}
                    value={trustee}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="bg-transparent w-full outline-none text-white"
                  />
                </div>
                {trustee.includes('@') && (
                  <FaCheck className="ml-3 text-green-400" />
                )}
              </div>
            ))}

            <button
              onClick={handleConfirm}
              className={`w-full py-3 rounded-lg font-medium transition-colors mt-6 ${trustees.every(t => t.includes('@'))
                  ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              disabled={!trustees.every(t => t.includes('@'))}
            >
              Generate Shares & Confirm
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-900/30 p-4 rounded-lg border border-green-800 mb-4">
            <h3 className="text-green-400 font-bold flex items-center gap-2 mb-2">
              <FaCheck /> Shares Generated
            </h3>
            <p className="text-sm text-gray-300">
              Your master key has been split into 3 shares. In a real scenario, these would be securely sent to your trustees.
            </p>
          </div>

          {shares.map((share, idx) => (
            <div key={idx} className="bg-gray-700 p-3 rounded-lg flex items-center gap-3">
              <FaKey className="text-yellow-500" />
              <div className="overflow-hidden">
                <p className="text-xs text-gray-400">Share for {trustees[idx]}</p>
                <p className="text-sm font-mono truncate">{share}</p>
              </div>
            </div>
          ))}
          <button
            onClick={() => setShares([])}
            className="w-full bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-medium transition-colors mt-6"
          >
            Reset
          </button>
        </div>
      )}
    </motion.div>
  );
}