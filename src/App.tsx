
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import FounderDashboard from "./pages/FounderDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";
import NotFound from "./pages/NotFound";
import OnboardingLayout from "./pages/onboarding/OnboardingLayout";
import FounderOnboardingStep1 from "./pages/onboarding/founder/Step1";
import FounderOnboardingStep2 from "./pages/onboarding/founder/Step2";
import InvestorOnboardingStep1 from "./pages/onboarding/investor/Step1";
import InvestorOnboardingStep2 from "./pages/onboarding/investor/Step2";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/founder-dashboard" element={<FounderDashboard />} />
          <Route path="/investor-dashboard" element={<InvestorDashboard />} />
          <Route path="/onboarding" element={<OnboardingLayout />}>
            <Route path="founder">
              <Route path="step1" element={<FounderOnboardingStep1 />} />
              <Route path="step2" element={<FounderOnboardingStep2 />} />
            </Route>
            <Route path="investor">
              <Route path="step1" element={<InvestorOnboardingStep1 />} />
              <Route path="step2" element={<InvestorOnboardingStep2 />} />
            </Route>
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
