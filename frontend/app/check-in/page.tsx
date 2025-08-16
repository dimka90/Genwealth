// import ProgressStepper from '@/components/ProgressStepper';
import CheckInReminder from '@/components/CheckInReminder';

export default function CheckInPage() {
//   const steps = [
//     { id: '01', name: 'Sign In', status: 'complete' },
//     { id: '02', name: 'Account Setup', status: 'complete' },
//     { id: '03', name: 'Trustees', status: 'complete' },
//     { id: '04', name: 'Documents', status: 'complete' },
//   ];

  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="py-8">
          {/* <ProgressStepper steps={steps} /> */}
        </div>
        
        <CheckInReminder />
      </div>
    </div>
  );
}