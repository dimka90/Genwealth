'use client';
import React, { useState } from 'react';
import { Users, AlertCircle } from 'lucide-react';

interface TrusteeSetupPageProps {
  onNext?: () => void;
}

const TrusteeSetupPage: React.FC<TrusteeSetupPageProps> = ({ onNext }) => {
  const [trustees, setTrustees] = useState(['', '', '']);

  const updateTrustee = (index: number, email: string) => {
    const newTrustees = [...trustees];
    newTrustees[index] = email;
    setTrustees(newTrustees);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <div className="text-center mb-8">
            <Users className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Trustee Setup</h1>
            <p className="text-gray-400">Choose 3 trusted individuals to help with recovery</p>
          </div>

          <div className="space-y-4 mb-6">
            {trustees.map((trustee, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Trustee {index + 1} Email
                </label>
                <input
                  type="email"
                  value={trustee}
                  onChange={(e) => updateTrustee(index, e.target.value)}
                  placeholder={`trustee${index + 1}@example.com`}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-white mb-1">How Recovery Works</h3>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Each trustee receives an encrypted share of your recovery key</li>
                  <li>• 2 out of 3 trustees are needed to recover your account</li>
                  <li>• Trustees will be contacted if you do not check in for 3 months</li>
                </ul>
              </div>
            </div>
          </div>

          <button 
            onClick={onNext}
            disabled={trustees.some(t => !t)}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            Setup Trustees
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrusteeSetupPage;