
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

interface FounderStep1FormData {
  startupName: string;
  industry: string;
  stage: string;
  fundingGoal: string;
  teamSize: string;
}

const industryOptions = [
  "Fintech", "Healthtech", "E-commerce", "SaaS", 
  "AI/ML", "Edtech", "Cleantech", "Consumer", "Other"
];

const stageOptions = [
  "Idea", "MVP", "Pre-seed", "Seed", "Series A", "Series B+"
];

const teamSizeOptions = [
  "Solo founder", "2-5", "6-10", "11-20", "21-50", "51+"
];

const FounderOnboardingStep1 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid }, watch, setValue } = 
    useForm<FounderStep1FormData>({ mode: "onChange" });
  
  const currentValues = watch();
  
  const onSubmit = async (data: FounderStep1FormData) => {
    setIsLoading(true);
    
    try {
      console.log("Step 1 data:", data);
      
      // Store data in localStorage or state management
      localStorage.setItem("founderStep1", JSON.stringify(data));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Navigate to next step
      navigate("/onboarding/founder/step2");
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
  const areAllFieldsFilled = Boolean(
    currentValues.startupName && 
    currentValues.industry && 
    currentValues.stage && 
    currentValues.fundingGoal && 
    currentValues.teamSize
  );

  return (
    <div>
      <ProgressIndicator currentStep={1} totalSteps={2} />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startupName">Startup Name</Label>
            <Input
              id="startupName"
              placeholder="Enter your startup name"
              {...register("startupName", { required: true })}
            />
            {errors.startupName && (
              <p className="text-sm text-destructive">Startup name is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select
              onValueChange={(value) => setValue("industry", value)}
              {...register("industry", { required: true })}
            >
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select an industry" />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && (
              <p className="text-sm text-destructive">Industry is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stage">Stage</Label>
            <Select
              onValueChange={(value) => setValue("stage", value)}
              {...register("stage", { required: true })}
            >
              <SelectTrigger id="stage">
                <SelectValue placeholder="Select your startup stage" />
              </SelectTrigger>
              <SelectContent>
                {stageOptions.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.stage && (
              <p className="text-sm text-destructive">Stage is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fundingGoal">Funding Goal ($)</Label>
            <Input
              id="fundingGoal"
              type="number"
              placeholder="e.g. 500000"
              {...register("fundingGoal", { required: true })}
            />
            {errors.fundingGoal && (
              <p className="text-sm text-destructive">Funding goal is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="teamSize">Team Size</Label>
            <Select
              onValueChange={(value) => setValue("teamSize", value)}
              {...register("teamSize", { required: true })}
            >
              <SelectTrigger id="teamSize">
                <SelectValue placeholder="Select your team size" />
              </SelectTrigger>
              <SelectContent>
                {teamSizeOptions.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.teamSize && (
              <p className="text-sm text-destructive">Team size is required</p>
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

export default FounderOnboardingStep1;
