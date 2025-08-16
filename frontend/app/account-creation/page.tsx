import { useState } from 'react';
// import ProgressStepper from '@/components/ProgressStepper';
import SeedPhraseEntry from '@/components/SeedPhraseEntry';
import BankDetailsEntry from '@/components/BankDetailsEntry';

export default function AccountCreation() {
  const [activeTab, setActiveTab] = useState<'seed' | 'bank'>('seed');
  
  // const steps = [
  //   { id: '01', name: 'Sign In', status: 'complete' },
  //   { id: '02', name: 'Account Setup', status: 'current' },
  //   { id: '03', name: 'Trustees', status: 'upcoming' },
  //   { id: '04', name: 'Documents', status: 'upcoming' },
  // ];

  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="py-8">
          {/* <ProgressStepper steps={steps} /> */}
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveTab('seed')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === 'seed'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Seed Phrase
            </button>
            <button
              onClick={() => setActiveTab('bank')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === 'bank'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Bank Details
            </button>
          </div>
        </div>
        
        {activeTab === 'seed' ? <SeedPhraseEntry /> : <BankDetailsEntry />}
      </div>
    </div>
  );
}