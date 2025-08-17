"use client";
import { useState } from "react";
import { FaEnvelope, FaWallet } from "react-icons/fa";
import { useLoginWithEmail } from "@privy-io/react-auth";

export default function PrivySignIn() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const { sendCode, loginWithCode } = useLoginWithEmail();
  return (
    <div className="max-w-md mx-auto p-6 rounded-lg bg-gray-800 text-white">
      <div className="flex items-center mb-6">
        <FaWallet className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-xl font-bold">Sign In with Privy</h2>
      </div>

      <p className="mb-6 text-gray-300">
        Enter your email to sign in. Privy will automatically create a wallet
        for you.
      </p>

      <div className="space-y-4">
        <div className="flex items-center border border-gray-600 rounded-lg px-4 py-3">
          <FaEnvelope className="text-gray-400 mr-3" />
          <input
            type="email"
            placeholder="your@email.com"
            className="bg-transparent flex-1 outline-none text-white"
            onChange={(e) => setEmail(e.currentTarget.value)}
            value={email}
          />
        </div>

        <button
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors"
          onClick={() => sendCode({ email })}
        >
          Continue with Email
        </button>
      </div>
      <input onChange={(e) => setCode(e.currentTarget.value)} value={code} />
      <button onClick={() => loginWithCode({ code })}>Login</button>
    </div>
  );
}
