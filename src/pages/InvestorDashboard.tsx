
import { Button } from "@/components/ui/button";

const InvestorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Investor Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome to your investor dashboard. Discover promising startups that match your investment criteria.</p>
      
      <div className="grid gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>
          <p className="text-gray-600 mb-4">Define your investment preferences to find the best startup matches.</p>
          <Button>Edit Profile</Button>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
