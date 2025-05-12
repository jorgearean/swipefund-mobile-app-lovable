
import { Button } from "@/components/ui/button";

const FounderDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Founder Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome to your founder dashboard. This is where you'll manage your startup profile and connect with investors.</p>
      
      <div className="grid gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>
          <p className="text-gray-600 mb-4">Add details about your startup to attract the right investors.</p>
          <Button>Edit Profile</Button>
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;
