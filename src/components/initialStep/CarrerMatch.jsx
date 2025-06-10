import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Target, TrendingUp, Star, Award, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CareerMatch = () => {
    const navigate = useNavigate();

    const matchScore = 87;
    const skillsData = [
        { name: "Technical Skills", score: 92, status: "strong" },
        { name: "Problem Solving", score: 85, status: "good" },
        { name: "System Design", score: 78, status: "developing" },
        { name: "Communication", score: 90, status: "strong" },
        { name: "Leadership", score: 65, status: "needs-improvement" }
    ];

    const recommendations = [
        {
            title: "Focus on System Design",
            description: "Strengthen your understanding of distributed systems and scalability patterns.",
            priority: "high",
            timeToImprove: "2-3 months"
        },
        {
            title: "Practice Coding Interviews",
            description: "Regular practice with algorithmic problems will boost your confidence.",
            priority: "medium",
            timeToImprove: "1-2 months"
        },
        {
            title: "Build Portfolio Projects",
            description: "Create projects that demonstrate your full-stack capabilities.",
            priority: "medium",
            timeToImprove: "3-4 months"
        }
    ];

    const handleContinue = () => {
        navigate('/dashboard');
    };

    const getScoreColor = (score) => {
        if (score >= 85) return "text-green-600";
        if (score >= 70) return "text-yellow-600";
        return "text-red-600";
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "strong":
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case "good":
                return <CheckCircle className="h-4 w-4 text-yellow-600" />;
            case "developing":
                return <AlertCircle className="h-4 w-4 text-yellow-600" />;
            case "needs-improvement":
                return <AlertCircle className="h-4 w-4 text-red-600" />;
            default:
                return null;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-800";
            case "medium":
                return "bg-yellow-100 text-yellow-800";
            case "low":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                        <Brain className="h-8 w-8 text-indigo-600" />
                        <span className="text-2xl font-bold text-gray-900">InterviewAce</span>
                    </div>
                    <div className="text-sm text-gray-600">Step 4 of 5</div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <Progress value={80} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Resume Upload</span>
                        <span>Domain Selection</span>
                        <span>Assessment</span>
                        <span className="font-medium text-indigo-600">Career Match</span>
                        <span>Dashboard</span>
                    </div>
                </div>

                {/* Main Results */}
                <div className="mb-8">
                    <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-xl">
                        <CardContent className="pt-8 pb-8">
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <Target className="h-12 w-12 mr-4" />
                                    <div>
                                        <h1 className="text-4xl font-bold mb-2">{matchScore}% Match</h1>
                                        <p className="text-xl text-indigo-100">Software Engineer at Google</p>
                                    </div>
                                </div>
                                <p className="text-indigo-100 max-w-2xl mx-auto">
                                    Great news! You're a strong candidate for this role. With some focused preparation,
                                    you'll be well-positioned to succeed in your interviews.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Skills Breakdown */}
                    <div className="space-y-6">
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                                    <TrendingUp className="h-5 w-5 mr-2" />
                                    Skills Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {skillsData.map((skill, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                {getStatusIcon(skill.status)}
                                                <span className="font-medium text-gray-900">{skill.name}</span>
                                            </div>
                                            <span className={`font-bold ${getScoreColor(skill.score)}`}>
                                                {skill.score}%
                                            </span>
                                        </div>
                                        <Progress value={skill.score} className="h-2" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                                    <Award className="h-5 w-5 mr-2" />
                                    Your Strengths
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span className="text-gray-700">Strong technical foundation in algorithms and data structures</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span className="text-gray-700">Excellent problem-solving approach and logical thinking</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span className="text-gray-700">Clear communication and ability to explain complex concepts</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span className="text-gray-700">Good understanding of software engineering principles</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-6">
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-gray-900">
                                    Improvement Recommendations
                                </CardTitle>
                                <p className="text-gray-600">
                                    Focus on these areas to maximize your interview success
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {recommendations.map((rec, index) => (
                                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                                            <Badge className={getPriorityColor(rec.priority)}>
                                                {rec.priority}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                                        <div className="text-xs text-gray-500">
                                            Estimated time: {rec.timeToImprove}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-gray-900">
                                    Interview Readiness Timeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-green-800">Ready Now</div>
                                            <div className="text-sm text-green-600">Behavioral interviews</div>
                                        </div>
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-yellow-800">2-4 weeks</div>
                                            <div className="text-sm text-yellow-600">Technical coding rounds</div>
                                        </div>
                                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-blue-800">1-2 months</div>
                                            <div className="text-sm text-blue-600">System design interviews</div>
                                        </div>
                                        <TrendingUp className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 text-center">
                    <Button
                        onClick={handleContinue}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                        Continue to Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CareerMatch; 