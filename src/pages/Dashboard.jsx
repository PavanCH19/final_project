import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProfileSummary } from "@/components/dashboard/ProfileSummary";
import { ReadinessScore } from "@/components/dashboard/ReadinessScore";
import { ActionCards } from "@/components/dashboard/ActionCards";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="flex-1 p-6 space-y-6">
        <DashboardHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileSummary />
            <ActionCards />
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Code className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Coding Environment</CardTitle>
                      <CardDescription>
                        Practice coding challenges with real-time execution and testing
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sharpen your coding skills with our interactive editor, complete with
                    syntax highlighting, console output, and comprehensive test cases.
                  </p>
                  <Link to="/dashboard/coding-environment">
                    <Button className="w-full group-hover:scale-105 transition-transform">
                      Start Coding Practice
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Resume Builder</CardTitle>
                      <CardDescription>
                        Create and optimize your resume with AI-powered suggestions
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Build professional resumes with step-by-step guidance, real-time scoring,
                    and keyword optimization for better job application success.
                  </p>
                  <Link to="/dashboard/resume-builder">
                    <Button className="w-full group-hover:scale-105 transition-transform">
                      Build Resume
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="space-y-6">
            <ReadinessScore />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;