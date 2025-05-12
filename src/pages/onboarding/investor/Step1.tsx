
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import ProgressIndicator from "@/components/onboarding/ProgressIndicator";
import NavigationButtons from "@/components/onboarding/NavigationButtons";

interface InvestorStep1FormData {
  investorName: string;
  investorType: string;
  geographyFocus: string;
  stageFocus: string;
}

const investorTypeOptions = [
  "Angel Investor", "Venture Capital", "Corporate VC", 
  "Family Office", "Accelerator", "Other"
];

const geographyOptions = [
  "Global", "North America", "Europe", "Asia", "Latin America", 
  "Africa", "Middle East", "Oceania"
];

const stageOptions = [
  "Idea", "MVP", "Pre-seed", "Seed", "Series A", "Series B+", "All Stages"
];

const InvestorOnboardingStep1 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = 
    useForm<InvestorStep1FormData>({ mode: "onChange" });
  
  const currentValues = watch();
  
  const onSubmit = async (data: InvestorStep1FormData) => {
    setIsLoading(true);
    
    try {
      console.log("Step 1 data:", data);
      
      // Store data in localStorage or state management
      localStorage.setItem("investorStep1", JSON.stringify(data));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Navigate to next step
      navigate("/onboarding/investor/step2");
    } catch (error) {
      console.error("Error saving data:", error);
      toast({
        title: "Error",
        description: "There was an error saving your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if all fields have values
  const areAllFieldsFilled = 
    currentValues.investorName && 
    currentValues.investorType && 
    currentValues.geographyFocus && 
    currentValues.stageFocus;

  return (
    <div>
      <ProgressIndicator currentStep={1} totalSteps={2} />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="investorName">Investor Name or Firm Name</Label>
            <Input
              id="investorName"
              placeholder="Enter your name or firm name"
              {...register("investorName", { required: true })}
            />
            {errors.investorName && (
              <p className="text-sm text-destructive">Investor name is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="investorType">Investor Type</Label>
            <Select
              onValueChange={(value) => setValue("investorType", value)}
              {...register("investorType", { required: true })}
            >
              <SelectTrigger id="investorType">
                <SelectValue placeholder="Select investor type" />
              </SelectTrigger>
              <SelectContent>
                {investorTypeOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.investorType && (
              <p className="text-sm text-destructive">Investor type is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="geographyFocus">Geography Focus</Label>
            <Select
              onValueChange={(value) => setValue("geographyFocus", value)}
              {...register("geographyFocus", { required: true })}
            >
              <SelectTrigger id="geographyFocus">
                <SelectValue placeholder="Select geography focus" />
              </SelectTrigger>
              <SelectContent>
                {geographyOptions.map((geo) => (
                  <SelectItem key={geo} value={geo}>
                    {geo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.geographyFocus && (
              <p className="text-sm text-destructive">Geography focus is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stageFocus">Stage Focus</Label>
            <Select
              onValueChange={(value) => setValue("stageFocus", value)}
              {...register("stageFocus", { required: true })}
            >
              <SelectTrigger id="stageFocus">
                <SelectValue placeholder="Select stage focus" />
              </SelectTrigger>
              <SelectContent>
                {stageOptions.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.stageFocus && (
              <p className="text-sm text-destructive">Stage focus is required</p>
            )}
          </div>
        </div>
        
        <NavigationButtons
          isFirstStep={true}
          isLastStep={false}
          isLoading={isLoading}
          onBack={() => {}}
          canContinue={areAllFieldsFilled}
        />
      </form>
    </div>
  );
};

export default InvestorOnboardingStep1;
