
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center mb-8">
        <h1 className="font-bold mb-2 text-gray-900">
          <span className="text-5xl tracking-tight">SF</span>
        </h1>
        <h2 className="text-xl text-gray-700 mb-6">SwipeFund</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Connect founders and investors through a simple, efficient matching experience.
        </p>
        
        <div className="space-y-4">
          <Button
            onClick={() => navigate("/auth")}
            className="w-full max-w-xs bg-gray-900 hover:bg-gray-800"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
