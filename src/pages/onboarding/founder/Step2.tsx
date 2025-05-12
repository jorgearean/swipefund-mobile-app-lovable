
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import ProgressIndicator from "@/components/onboarding/ProgressIndicator";
import NavigationButtons from "@/components/onboarding/NavigationButtons";

interface FounderStep2FormData {
  pitchDeckUrl: string;
  tractionSummary: string;
  linkedinUrl: string;
  preferredInvestorType: string;
  preferredGeography: string;
}

const investorTypeOptions = [
  "Angel Investors", "Venture Capital", "Family Offices", 
  "Accelerators", "Corporate VCs", "Any"
];

const geographyOptions = [
  "Global", "North America", "Europe", "Asia", "Latin America", 
  "Africa", "Middle East", "Oceania"
];

const FounderOnboardingStep2 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = 
    useForm<FounderStep2FormData>({ mode: "onChange" });
  
  const currentValues = watch();
  
  const onSubmit = async (data: FounderStep2FormData) => {
    setIsLoading(true);
    
    try {
      console.log("Step 2 data:", data);
      
      // Get step 1 data from localStorage
      const step1Data = JSON.parse(localStorage.getItem("founderStep1") || "{}");
      
      // Combine data from both steps
      const completeData = { ...step1Data, ...data };
      console.log("Complete founder data:", completeData);
      
      // Store complete data
      localStorage.setItem("founderProfile", JSON.stringify(completeData));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Profile Complete!",
        description: "Your founder profile has been created successfully.",
      });
      
      // Navigate to dashboard
      navigate("/founder-dashboard");
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
  
  const handleBack = () => {
    navigate("/onboarding/founder/step1");
  };

  // Check if all fields have values
  const areAllFieldsFilled = 
    currentValues.pitchDeckUrl && 
    currentValues.tractionSummary && 
    currentValues.linkedinUrl && 
    currentValues.preferredInvestorType && 
    currentValues.preferredGeography;

  return (
    <div>
      <ProgressIndicator currentStep={2} totalSteps={2} />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pitchDeckUrl">Pitch Deck URL</Label>
            <Input
              id="pitchDeckUrl"
              placeholder="Enter URL to your pitch deck"
              {...register("pitchDeckUrl", { 
                required: true,
                pattern: {
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: "Please enter a valid URL"
                }
              })}
            />
            {errors.pitchDeckUrl && (
              <p className="text-sm text-destructive">
                {errors.pitchDeckUrl.message || "Pitch deck URL is required"}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tractionSummary">Traction Summary</Label>
            <Textarea
              id="tractionSummary"
              placeholder="Briefly describe your startup's traction"
              className="resize-none"
              {...register("tractionSummary", { 
                required: true,
                maxLength: {
                  value: 500,
                  message: "Summary must be 500 characters or less"
                }
              })}
            />
            {errors.tractionSummary && (
              <p className="text-sm text-destructive">
                {errors.tractionSummary.message || "Traction summary is required"}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              placeholder="Enter your LinkedIn profile URL"
              {...register("linkedinUrl", { 
                required: true,
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/,
                  message: "Please enter a valid LinkedIn URL"
                }
              })}
            />
            {errors.linkedinUrl && (
              <p className="text-sm text-destructive">
                {errors.linkedinUrl.message || "LinkedIn URL is required"}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preferredInvestorType">Preferred Investor Type</Label>
            <Select
              onValueChange={(value) => setValue("preferredInvestorType", value)}
              {...register("preferredInvestorType", { required: true })}
            >
              <SelectTrigger id="preferredInvestorType">
                <SelectValue placeholder="Select preferred investor type" />
              </SelectTrigger>
              <SelectContent>
                {investorTypeOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.preferredInvestorType && (
              <p className="text-sm text-destructive">Preferred investor type is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preferredGeography">Preferred Geography</Label>
            <Select
              onValueChange={(value) => setValue("preferredGeography", value)}
              {...register("preferredGeography", { required: true })}
            >
              <SelectTrigger id="preferredGeography">
                <SelectValue placeholder="Select preferred geography" />
              </SelectTrigger>
              <SelectContent>
                {geographyOptions.map((geo) => (
                  <SelectItem key={geo} value={geo}>
                    {geo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.preferredGeography && (
              <p className="text-sm text-destructive">Preferred geography is required</p>
            )}
          </div>
        </div>
        
        <NavigationButtons
          isFirstStep={false}
          isLastStep={true}
          isLoading={isLoading}
          onBack={handleBack}
          canContinue={areAllFieldsFilled}
        />
      </form>
    </div>
  );
};

export default FounderOnboardingStep2;
