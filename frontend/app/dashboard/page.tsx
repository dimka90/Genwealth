import { FaBox, FaShieldAlt, FaClock, FaFile } from 'react-icons/fa';

export default function Dashboard() {
  const stats = [
    { name: 'Documents Stored', value: '12', icon: FaFile, change: '+2', changeType: 'positive' },
    { name: 'Active Trustees', value: '3/3', icon: FaShieldAlt, change: '0', changeType: 'neutral' },
    { name: 'Days Until Check-in', value: '42', icon: FaClock, change: '-7', changeType: 'negative' },
    { name: 'IPFS Storage', value: '24.5 MB', icon: FaBox, change: '+3.2', changeType: 'positive' },
  ];

  return (
    <div className="min-h-screen mt-20 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-gray-700">
                  <stat.icon className="text-indigo-400 text-xl" />
                </div>
              </div>
              <div className={`mt-4 text-sm ${
                stat.changeType === 'positive' ? 'text-green-400' : 
                stat.changeType === 'negative' ? 'text-red-400' : 'text-gray-400'
              }`}>
                {stat.changeType === 'positive' ? '↑' : stat.changeType === 'negative' ? '↓' : ''}
                {stat.change} since last month
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <FaClock className="text-indigo-400 mr-2" />
              Upcoming Check-in
            </h2>
            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="text-gray-300 mb-2">Next check-in due in 42 days</p>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">Last check-in: 45 days ago</p>
            </div>
            <button className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-medium transition-colors">
              Check In Now
            </button>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col justify-between">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <FaShieldAlt className="text-indigo-400 mr-2" />
              Recovery
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Trustee 1</span>
                <span className="text-green-400 text-sm">Active</span>
              </div>
            
            </div>
            <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-colors">
              Manage Trustees
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}