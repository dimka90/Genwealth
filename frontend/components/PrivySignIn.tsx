import { FaEnvelope, FaWallet } from 'react-icons/fa';

export default function PrivySignIn() {
  return (
    <div 
      className="max-w-md mx-auto p-6 rounded-lg bg-gray-800 text-white"
    >
      <div className="flex items-center mb-6">
        <FaWallet className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-xl font-bold">Sign In with Privy</h2>
      </div>
      
      <p className="mb-6 text-gray-300">
        Enter your email to sign in. Privy will automatically create a wallet for you.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center border border-gray-600 rounded-lg px-4 py-3">
          <FaEnvelope className="text-gray-400 mr-3" />
          <input
            type="email"
            placeholder="your@email.com"
            className="bg-transparent flex-1 outline-none text-white"
          />
        </div>
        
        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors">
          Continue with Email
        </button>
      </div>
    </div>
  );
}