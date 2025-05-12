
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import ProgressIndicator from "@/components/onboarding/ProgressIndicator";
import NavigationButtons from "@/components/onboarding/NavigationButtons";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface InvestorStep2FormData {
  ticketSize: string;
  sectorFocus: string;
  linkedinUrl: string;
  portfolioLink: string;
}

const ticketSizeOptions = [
  "<$25k", "$25k-$100k", "$100k-$500k", "$500k-$1M", 
  "$1M-$5M", "$5M-$10M", "$10M+"
];

const sectorOptions = [
  "Fintech", "Healthtech", "E-commerce", "SaaS", "AI/ML", 
  "Edtech", "Cleantech", "Consumer", "Enterprise", "Other"
];

const InvestorOnboardingStep2 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = 
    useForm<InvestorStep2FormData>({ mode: "onChange" });
  
  const currentValues = watch();
  
  const onSubmit = async (data: InvestorStep2FormData) => {
    setIsLoading(true);
    
    try {
      console.log("Step 2 data:", data);
      
      // Get step 1 data from localStorage
      const step1Data = JSON.parse(localStorage.getItem("investorStep1") || "{}");
      
      // Combine data from both steps
      const completeData = { ...step1Data, ...data };
      console.log("Complete investor data:", completeData);
      
      // Store complete data
      localStorage.setItem("investorProfile", JSON.stringify(completeData));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Profile Complete!",
        description: "Your investor profile has been created successfully.",
      });
      
      // Navigate to dashboard
      navigate("/investor-dashboard");
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
    navigate("/onboarding/investor/step1");
  };

  // Check if all fields have values
  const areAllFieldsFilled = Boolean(
    currentValues.ticketSize && 
    currentValues.sectorFocus && 
    currentValues.linkedinUrl && 
    currentValues.portfolioLink
  );

  return (
    <div>
      <ProgressIndicator currentStep={2} totalSteps={2} />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ticketSize">Ticket Size</Label>
            <Select
              onValueChange={(value) => setValue("ticketSize", value)}
              {...register("ticketSize", { required: true })}
            >
              <SelectTrigger id="ticketSize">
                <SelectValue placeholder="Select your typical investment size" />
              </SelectTrigger>
              <SelectContent>
                {ticketSizeOptions.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.ticketSize && (
              <p className="text-sm text-destructive">Ticket size is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sectorFocus">Sector Focus</Label>
            <Select
              onValueChange={(value) => setValue("sectorFocus", value)}
              {...register("sectorFocus", { required: true })}
            >
              <SelectTrigger id="sectorFocus">
                <SelectValue placeholder="Select your sector focus" />
              </SelectTrigger>
              <SelectContent>
                {sectorOptions.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.sectorFocus && (
              <p className="text-sm text-destructive">Sector focus is required</p>
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
            <Label htmlFor="portfolioLink">Portfolio Link</Label>
            <Input
              id="portfolioLink"
              placeholder="Enter URL to your portfolio or website"
              {...register("portfolioLink", { 
                required: true,
                pattern: {
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: "Please enter a valid URL"
                }
              })}
            />
            {errors.portfolioLink && (
              <p className="text-sm text-destructive">
                {errors.portfolioLink.message || "Portfolio link is required"}
              </p>
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

export default InvestorOnboardingStep2;
