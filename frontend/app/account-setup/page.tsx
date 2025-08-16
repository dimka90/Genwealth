'use client';
import React, { useState } from 'react';
import { Key, Shield } from 'lucide-react';

interface AccountSetupPageProps {
  onNext?: () => void;
}

const AccountSetupPage: React.FC<AccountSetupPageProps> = ({ onNext }) => {
  const [setupType, setSetupType] = useState('seed');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [bankDetails, setBankDetails] = useState({ account: '', routing: '' });

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <div className="text-center mb-8">
            <Key className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Account Setup</h1>
            <p className="text-gray-400">Secure your sensitive information</p>
          </div>

          <div className="mb-6">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setSetupType('seed')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                  setupType === 'seed' 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Seed Phrase
              </button>
              <button
                onClick={() => setSetupType('bank')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                  setupType === 'bank' 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Bank Details
              </button>
            </div>

            {setupType === 'seed' ? (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Seed Phrase
                </label>
                <textarea
                  value={seedPhrase}
                  onChange={(e) => setSeedPhrase(e.target.value)}
                  placeholder="Enter your 12 or 24 word seed phrase..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={bankDetails.account}
                    onChange={(e) => setBankDetails({...bankDetails, account: e.target.value})}
                    placeholder="Enter account number"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Routing Number
                  </label>
                  <input
                    type="text"
                    value={bankDetails.routing}
                    onChange={(e) => setBankDetails({...bankDetails, routing: e.target.value})}
                    placeholder="Enter routing number"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-white mb-1">Security Notice</h3>
                <p className="text-xs text-gray-400">
                  Your data will be encrypted client-side with AES encryption before being split using Shamir Secret Sharing.
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={onNext}
            disabled={!seedPhrase && !bankDetails.account}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            Continue to Trustee Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSetupPage;