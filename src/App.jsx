import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import MockInterview from "./pages/MockInterview";
import InterviewReport from "./pages/InterviewReport";
import Admin from "./pages/Admin";
import Progress from "./pages/Progress";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";
import InterviewSimulation from "./pages/InterviewSimulation";
import LearningDashboard from "./pages/LearningDashboard";
import CodingEnvironment from "./pages/CodingEnvironment";
import ResumeBuilder from "./pages/ResumeBuilder";
import TemplateBuilder from "./pages/TemplateBuilder";
import ResumeUpload from "./pages/ResumeUpload";
import OfflineSettings from "./pages/OfflineSettings";
import DomainSelection from "./components/initialStep/DomainSelection";
import Assessment from "./components/initialStep/Assessment";
import CareerMatch from "./components/initialStep/CarrerMatch";

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

          {/* Dashboard Layout wraps all dashboard-related routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/mock-interview" element={<MockInterview />} />
            <Route path="/dashboard/template-builder" element={<TemplateBuilder />} />
            <Route path="/dashboard/feedback" element={<InterviewReport />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/domain-selection" element={<DomainSelection />} />
            <Route path='/dashboard/init-assignments' element={<Assessment />} />
            <Route path="/dashboard/career-match" element={<CareerMatch />} />

            {/* Additional Routes */}
            <Route path="/dashboard/admin" element={<Admin />} />
            <Route path="/dashboard/interview-report" element={<InterviewReport />} />
            <Route path="/dashboard/progress" element={<Progress />} />
            <Route path="/dashboard/schedule" element={<Schedule />} />
            <Route path="/dashboard/interview-simulation" element={<InterviewSimulation />} />
            <Route path="/dashboard/learning-dashboard" element={<LearningDashboard />} />
            <Route path="/dashboard/coding-environment" element={<CodingEnvironment />} />
            <Route path="/dashboard/resume-builder" element={<ResumeBuilder />} />
            <Route path='/dashboard/resume-uploader' element={<ResumeUpload />} />
            <Route path='/dashboard/offline-settings' element={<OfflineSettings />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App; 