import ProgressStepper from '../components/ui/ProgressStepper';
import DocumentUpload from '../components/documents/DocumentUpload';
import DocumentList from '../components/documents/DocumentList';

export default function DocumentUploadPage() {
  const steps = [
    { id: '01', name: 'Sign In', status: 'complete' },
    { id: '02', name: 'Account Setup', status: 'complete' },
    { id: '03', name: 'Trustees', status: 'complete' },
    { id: '04', name: 'Documents', status: 'current' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="py-8">
          <ProgressStepper steps={steps} />
        </div>
        
        <div className="space-y-8">
          <DocumentUpload />
          <DocumentList />
        </div>
      </div>
    </div>
  );
}