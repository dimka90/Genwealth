'use client';
import { useState } from 'react';
import { FaShieldAlt, FaKey, FaCheckCircle } from 'react-icons/fa';

export default function RecoveryFlow() {
  const [activeStep, setActiveStep] = useState<'initiate' | 'collect' | 'complete'>('initiate');
  const [sharesSubmitted, setSharesSubmitted] = useState(0);

  return (
    <div 
      className="max-w-md mx-auto p-6 rounded-lg bg-gray-800 text-white"
    >
      <div className="flex items-center mb-6">
        <FaShieldAlt className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-xl font-bold">Account Recovery</h2>
      </div>
      
      {activeStep === 'initiate' && (
        <div className="space-y-6">
          <p className="text-gray-300">
            Your account has been inactive for more than 3 months. To recover access, we will need at least 2 of your 3 trustees to submit their recovery shares.
          </p>
          
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Trustees Contacted:</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></span>
                trustee1@example.com (Pending)
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></span>
                trustee2@example.com (Pending)
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></span>
                trustee3@example.com (Pending)
              </li>
            </ul>
          </div>
          
          <button 
            onClick={() => setActiveStep('collect')}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Initiate Recovery
          </button>
        </div>
      )}
      
      {activeStep === 'collect' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaKey className="text-indigo-400 mr-2" />
              <span>Shares Collected: {sharesSubmitted}/2</span>
            </div>
            <div className="w-1/2 bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-indigo-500 h-2.5 rounded-full" 
                style={{ width: `${(sharesSubmitted/2)*100}%` }}
              ></div>
            </div>
          </div>
          
          <p className="text-gray-300">
            Waiting for your trustees to submit their shares. You will be notified when enough shares are collected.
          </p>
          
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Recovery Progress:</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className={`w-4 h-4 rounded-full mr-2 ${sharesSubmitted > 0 ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                trustee1@example.com ({sharesSubmitted > 0 ? 'Submitted' : 'Pending'})
              </li>
              <li className="flex items-center">
                <span className={`w-4 h-4 rounded-full mr-2 ${sharesSubmitted > 1 ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                trustee2@example.com ({sharesSubmitted > 1 ? 'Submitted' : 'Pending'})
              </li>
            </ul>
          </div>
          
          <button 
            onClick={() => {
              setSharesSubmitted(2);
              setActiveStep('complete');
            }}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Simulate Shares Received (Demo)
          </button>
        </div>
      )}
      
      {activeStep === 'complete' && (
        <div className="text-center space-y-6">
          <FaCheckCircle className="text-green-400 text-5xl mx-auto" />
          <h3 className="text-xl font-bold">Recovery Complete!</h3>
          <p className="text-gray-300">
            Your account has been successfully recovered. You can now access your encrypted data.
          </p>
          <button 
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Access Your Account
          </button>
        </div>
      )}
    </div>
  );
}