import CustomCursor from '@/components/CustomCursor';
import PrivySignIn from '@/components/PrivySignIn';
import ProgressStepper from '@/components/ProgressStepper';
import { Step } from '@/types/steps';

export default function SignInPage() {
  const steps: Step[] = [ 
    { id: '01', name: 'Sign In', status: 'current' },
    { id: '02', name: 'Account Setup', status: 'upcoming' },
    { id: '03', name: 'Trustees', status: 'upcoming' },
    { id: '04', name: 'Documents', status: 'upcoming' },
  ];

  return (
    <div className="min-h-screen p-4">
      <CustomCursor />
      <div className="max-w-4xl mx-auto">
        <div className="py-8">
          <ProgressStepper steps={steps} />
        </div>
        <PrivySignIn />
      </div>
    </div>
  );
}