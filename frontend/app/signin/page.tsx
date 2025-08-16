import { Shield } from 'lucide-react';

interface SignInPageProps {
  onNext?: () => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Secure Document Storage</h1>
            <p className="text-gray-400">Sign in with your email to get started</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            
            <button 
              onClick={onNext}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              Sign In with Privy
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-400">
                A secure wallet will be created automatically
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;