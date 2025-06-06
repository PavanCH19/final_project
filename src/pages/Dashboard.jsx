import React from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { MessageSquare, FileText, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const userProfile = {
    name: "John",
    technicalSkills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"],
    experience: "3+ years in Full Stack Development",
    education: "B.S. Computer Science, Stanford University",
    preferredRoles: ["Frontend Developer", "Full Stack Engineer", "Software Engineer"],
    readinessScores: {
      overall: 78,
      technical: 85,
      communication: 70,
      problemSolving: 80
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Welcome back, {userProfile.name}! 👋</h1>
          <p className="text-gray-600 mt-1">Ready to ace your next interview?</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500">Today</p>
          <p className="text-lg font-medium">6/6/2025</p>
        </div>
      </div>

      {/* Profile Summary */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">📋 Profile Summary</h2>
        
        {/* Technical Skills */}
        <div className="space-y-4 mb-6">
          <h3 className="font-medium">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {userProfile.technicalSkills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-4 mb-6">
          <h3 className="font-medium">Experience</h3>
          <p className="text-gray-600">{userProfile.experience}</p>
        </div>

        {/* Education */}
        <div className="space-y-4 mb-6">
          <h3 className="font-medium">Education</h3>
          <p className="text-gray-600">{userProfile.education}</p>
        </div>

        {/* Preferred Roles */}
        <div className="space-y-4">
          <h3 className="font-medium">Preferred Roles</h3>
          <div className="flex flex-wrap gap-2">
            {userProfile.preferredRoles.map((role) => (
              <Badge
                key={role}
                variant="secondary"
                className="px-3 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100"
              >
                {role}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mock Interview Card */}
        <Card className="p-6">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Take Mock Interview</h3>
          <p className="text-gray-600 mb-4">Practice with AI-powered interviews tailored to your profile</p>
          <Button className="w-full" asChild>
            <Link to="/dashboard/mock-interview">Start Interview</Link>
          </Button>
        </Card>

        {/* View Feedback Card */}
        <Card className="p-6">
          <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">View Feedback</h3>
          <p className="text-gray-600 mb-4">Review detailed feedback from your previous sessions</p>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/dashboard/interview-report">View Reports</Link>
          </Button>
        </Card>

        {/* Career Recommendations Card */}
        <Card className="p-6">
          <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <Star className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Career Recommendations</h3>
          <p className="text-gray-600 mb-4">Get personalized career advice and job suggestions</p>
          <Button variant="outline" className="w-full">
            Explore
          </Button>
        </Card>
      </div>

      {/* Interview Readiness */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Interview Readiness</h2>
        
        {/* Overall Score */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-orange-500">{userProfile.readinessScores.overall}%</div>
          <p className="text-gray-600">Overall Score</p>
        </div>

        {/* Progress Bars */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Technical Skills</span>
              <span>{userProfile.readinessScores.technical}%</span>
            </div>
            <Progress value={userProfile.readinessScores.technical} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Communication</span>
              <span>{userProfile.readinessScores.communication}%</span>
            </div>
            <Progress value={userProfile.readinessScores.communication} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Problem Solving</span>
              <span>{userProfile.readinessScores.problemSolving}%</span>
            </div>
            <Progress value={userProfile.readinessScores.problemSolving} className="h-2" />
          </div>
        </div>

        <p className="text-center text-blue-600 mt-6">
          Complete 2 more mock interviews to reach 85% readiness!
        </p>
      </Card>
    </div>
  );
};

export default Dashboard; 