
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

const OnboardingLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current role from the URL
  const isFounder = location.pathname.includes("/onboarding/founder");
  
  const handleClose = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          <span className="inline-block">SF</span>
        </h1>
      </div>
      
      <Card className="w-full max-w-2xl relative">
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="px-6 pt-10 pb-4">
          <h2 className="text-2xl font-semibold text-center">Complete Your Profile</h2>
          <p className="text-center text-gray-600 mt-2">Help us match you with the right connections</p>
        </div>
        
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingLayout;
