import CustomCursor from "@/components/CustomCursor";
import RecoveryFlow from "@/components/RecoveryFlow";

export default function RecoveryPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <CustomCursor />
      <div className="max-w-4xl mx-auto py-8">
        <RecoveryFlow />
      </div>
    </div>
  );
}