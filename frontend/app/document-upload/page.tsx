'use client';
import React, { useState, useRef } from 'react';
import { Upload, Shield, FileText } from 'lucide-react';

interface DocumentUploadPageProps {
  onNext?: () => void;
}

const DocumentUploadPage: React.FC<DocumentUploadPageProps> = ({ onNext }) => {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles([...files, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <div className="text-center mb-8">
            <FileText className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Upload Documents</h1>
            <p className="text-gray-400">Securely store your important documents</p>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
              dragOver 
                ? 'border-indigo-500 bg-indigo-500/10' 
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-gray-400">
              Supports PDF, DOC, TXT, and image files
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            />
          </div>

          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-white mb-4">Selected Files</h3>
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-indigo-500" />
                      <div>
                        <p className="text-white font-medium">{file.name}</p>
                        <p className="text-gray-400 text-sm">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gray-800 rounded-lg p-4 mt-6 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-white mb-1">IPFS Storage</h3>
                <p className="text-xs text-gray-400">
                  Documents are stored on IPFS with metadata recorded on-chain for immutable proof.
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={onNext}
            disabled={files.length === 0}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            Upload & Secure Documents
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadPage;