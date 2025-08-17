// import ProgressStepper from '@/components/ProgressStepper';
import CheckInReminder from '@/components/CheckInReminder';
// import { Step } from '@/types/steps';

export default function CheckInPage() {
  // const steps: Step[] = [
  //   { id: '01', name: 'Sign In', status: 'complete' },
  //   { id: '02', name: 'Account Setup', status: 'complete' },
  //   { id: '03', name: 'Trustees', status: 'complete' },
  //   { id: '04', name: 'Documents', status: 'complete' },
  // ];

  return (
    <div className="min-h-screen mt-20 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="py-8">
          {/* <ProgressStepper steps={steps} /> */}
        </div>
        <CheckInReminder />
      </div>
    </div>
  );
}