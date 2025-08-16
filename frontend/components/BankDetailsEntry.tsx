import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBank, FaLock } from 'react-icons/fa';

export default function BankDetailsEntry() {
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    routingNumber: '',
    accountName: ''
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto p-6 rounded-lg bg-gray-800 text-white"
    >
      <div className="flex items-center mb-6">
        <FaBank className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-xl font-bold">Enter Bank Details</h2>
      </div>
      
      <p className="mb-6 text-gray-300">
        Your bank details will be encrypted client-side before storage.
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Account Name</label>
          <input
            type="text"
            value={bankDetails.accountName}
            onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Account Number</label>
          <input
            type="text"
            value={bankDetails.accountNumber}
            onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Routing Number</label>
          <input
            type="text"
            value={bankDetails.routingNumber}
            onChange={(e) => setBankDetails({...bankDetails, routingNumber: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
          />
        </div>
        
        <div className="flex items-center text-sm text-gray-400">
          <FaLock className="mr-2" />
          <span>End-to-end encrypted</span>
        </div>
        
        <button 
          className={`w-full py-3 rounded-lg font-medium transition-colors mt-4 ${
            bankDetails.accountName && bankDetails.accountNumber && bankDetails.routingNumber
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!bankDetails.accountName || !bankDetails.accountNumber || !bankDetails.routingNumber}
        >
          Encrypt and Continue
        </button>
      </div>
    </motion.div>
  );
}