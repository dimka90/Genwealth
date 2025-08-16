'use client'
import React, { useState } from 'react';
import { FileText, Users, Clock, CheckCircle } from 'lucide-react';

interface DashboardPageProps {
  onNext?: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNext }) => {
  const [lastCheckIn] = useState(new Date().toLocaleDateString());
  const [nextCheckIn] = useState(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString());

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your secure document storage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-8 h-8 text-indigo-500" />
              <div>
                <h3 className="text-lg font-semibold text-white">Documents</h3>
                <p className="text-2xl font-bold text-indigo-500">3</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Stored securely on IPFS</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-indigo-500" />
              <div>
                <h3 className="text-lg font-semibold text-white">Trustees</h3>
                <p className="text-2xl font-bold text-indigo-500">3</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Recovery guardians active</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-8 h-8 text-indigo-500" />
              <div>
                <h3 className="text-lg font-semibold text-white">Status</h3>
                <p className="text-2xl font-bold text-green-500">Active</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Last check-in: {lastCheckIn}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Check-in Schedule</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Last Check-in</span>
                <span className="text-white">{lastCheckIn}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Next Required</span>
                <span className="text-indigo-500">{nextCheckIn}</span>
              </div>
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-400 font-medium">You are up to date!</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                Upload New Document
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                Manage Trustees
              </button>
              <button 
                onClick={onNext}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                View Recovery Options
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;