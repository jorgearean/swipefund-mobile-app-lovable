
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  onBack: () => void;
  canContinue: boolean;
}

const NavigationButtons = ({ 
  isFirstStep, 
  isLastStep, 
  isLoading, 
  onBack, 
  canContinue 
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between mt-8">
      {!isFirstStep ? (
        <Button 
          variant="outline" 
          onClick={onBack}
          disabled={isLoading}
          type="button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      ) : (
        <div></div>
      )}
      
      <Button type="submit" disabled={isLoading || !canContinue}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            {isLastStep ? "Complete" : "Continue"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default NavigationButtons;
