import { FaCalendarCheck, FaBell } from 'react-icons/fa';

export default function CheckInReminder() {
  return (
    <div 
      className="max-w-md mx-auto p-6 rounded-lg bg-gray-800 text-white"
    >
      <div className="flex items-center mb-6">
        <FaCalendarCheck className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-xl font-bold">Regular Check-in</h2>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-700 rounded-lg">
          <div className="flex items-start">
            <FaBell className="text-indigo-300 mt-1 mr-3" />
            <div>
              <h3 className="font-medium">Why check in?</h3>
              <p className="text-sm text-gray-300 mt-1">
                To ensure your account remains active, please check in every 3 months.
                If you do not, your trustees will be notified to help recover your account.
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border border-indigo-500/50 rounded-lg bg-indigo-500/10">
          <p className="text-indigo-300 text-sm">
            <span className="font-medium">Next check-in due:</span> November 15, 2023
          </p>
        </div>
        
        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors">
          Check In Now
        </button>
      </div>
    </div>
  );
}