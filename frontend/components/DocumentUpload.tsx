import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaFile, FaSpinner } from 'react-icons/fa';

export default function DocumentUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const handleUpload = useCallback(async () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    // Simulate IPFS upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    // Here you would call your IPFS upload function
  }, [uploadedFile]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto p-6 rounded-lg bg-gray-800 text-white"
    >
      <div className="flex items-center mb-6">
        <FaUpload className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-xl font-bold">Upload Document</h2>
      </div>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          uploadedFile ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-600 hover:border-gray-500'
        }`}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          className="hidden"
          onChange={(e) => e.target.files && setUploadedFile(e.target.files[0])}
        />
        
        {uploadedFile ? (
          <div className="flex items-center justify-center">
            <FaFile className="text-indigo-500 text-3xl mr-3" />
            <div>
              <p className="font-medium">{uploadedFile.name}</p>
              <p className="text-sm text-gray-400">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        ) : (
          <>
            <FaUpload className="mx-auto text-3xl text-gray-400 mb-3" />
            <p className="text-gray-300">Click to select a file or drag and drop</p>
            <p className="text-sm text-gray-500 mt-2">Files will be encrypted and stored on IPFS</p>
          </>
        )}
      </div>
      
      <button 
        onClick={handleUpload}
        disabled={!uploadedFile || isUploading}
        className={`w-full mt-6 py-3 rounded-lg font-medium flex items-center justify-center ${
          uploadedFile && !isUploading
            ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isUploading ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            Uploading to IPFS...
          </>
        ) : (
          'Upload and Store CID'
        )}
      </button>
    </motion.div>
  );
}