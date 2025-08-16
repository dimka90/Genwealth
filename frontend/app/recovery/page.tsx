'use client';
import React, { useState } from 'react';
import { Shield, AlertCircle, Mail, Clock, CheckCircle } from 'lucide-react';

interface Share {
  trustee: string;
  submitted: boolean;
}

const RecoveryPage: React.FC = () => {
  const [recoveryStep] = useState('initiated');
  const [shares] = useState<Share[]>([
    { trustee: 'alice@example.com', submitted: true },
    { trustee: 'bob@example.com', submitted: true },
    { trustee: 'charlie@example.com', submitted: false }
  ]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Account Recovery</h1>
            <p className="text-gray-400">Recovery process has been initiated</p>
          </div>

          <div className="mb-6">
            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-white mb-1">Recovery Initiated</h3>
                  <p className="text-xs text-gray-300">
                    No check-in detected for 3 months. Trustees have been notified to submit their recovery shares.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-medium text-white mb-4">Trustee Status</h3>
            <div className="space-y-3">
              {shares.map((share, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-indigo-500" />
                    <span className="text-white">{share.trustee}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {share.submitted ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-green-400 font-medium">Submitted</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-5 h-5 text-yellow-500" />
                        <span className="text-yellow-400 font-medium">Pending</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-white mb-2">Recovery Progress</h3>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
              <div className="bg-indigo-500 h-3 rounded-full" style={{ width: '67%' }}></div>
            </div>
            <p className="text-xs text-gray-400">2 of 3 shares collected (67% complete)</p>
          </div>

          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-white mb-1">Recovery Ready</h3>
                <p className="text-xs text-gray-300">
                  Sufficient shares collected. Your AES key can now be reconstructed and your data decrypted.
                </p>
              </div>
            </div>
          </div>

          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 mt-6">
            Complete Recovery
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPage;