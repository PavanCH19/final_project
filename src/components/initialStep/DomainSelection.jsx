import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Brain, Building2, Code, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DomainSelection = () => {
    const navigate = useNavigate();
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');

    const domains = [
        'Software Engineering',
        'Data Science',
        'Product Management',
        'UI/UX Design',
        'DevOps Engineering',
        'Machine Learning',
        'Cybersecurity',
        'Cloud Architecture',
        'Mobile Development',
        'Full Stack Development'
    ];

    const companies = [
        'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Spotify',
        'Tesla', 'Uber', 'Airbnb', 'Stripe', 'Salesforce', 'Adobe', 'Oracle',
        'IBM', 'Intel', 'NVIDIA', 'Twitter', 'LinkedIn', 'Dropbox'
    ];

    const handleContinue = () => {
        if (selectedDomain && selectedCompany) {
            navigate('/dashboard/init-assignments');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                        <Brain className="h-8 w-8 text-indigo-600" />
                        <span className="text-2xl font-bold text-gray-900">InterviewAce</span>
                    </div>
                    <div className="text-sm text-gray-600">Step 2 of 5</div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <Progress value={40} className="h-2" />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>Resume Upload</span>
                        <span className="font-medium text-indigo-600">Domain Selection</span>
                        <span>Assessment</span>
                        <span>Career Match</span>
                        <span>Dashboard</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Selection Form */}
                    <div className="space-y-6">
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-gray-900">Choose Your Target</CardTitle>
                                <p className="text-gray-600">
                                    Select the domain and company you're preparing for. This helps us customize interview questions for your specific goals.
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Domain Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        <Code className="inline h-4 w-4 mr-2" />
                                        Target Domain
                                    </label>
                                    <Select onValueChange={setSelectedDomain}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select your target domain" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {domains.map((domain) => (
                                                <SelectItem key={domain} value={domain}>
                                                    {domain}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Company Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        <Building2 className="inline h-4 w-4 mr-2" />
                                        Target Company
                                    </label>
                                    <Select onValueChange={setSelectedCompany}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select your target company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {companies.map((company) => (
                                                <SelectItem key={company} value={company}>
                                                    {company}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    onClick={handleContinue}
                                    disabled={!selectedDomain || !selectedCompany}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
                                >
                                    Continue to Assessment
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Preview Section */}
                    <div className="space-y-6">
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-gray-900">What's Next?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Initial Assessment</h3>
                                        <p className="text-sm text-gray-600">Take a quick assessment to evaluate your current skill level.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Career Fit Analysis</h3>
                                        <p className="text-sm text-gray-600">See how well your profile matches your target role.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Personalized Dashboard</h3>
                                        <p className="text-sm text-gray-600">Access your customized interview preparation dashboard.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {selectedDomain && selectedCompany && (
                            <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-xl">
                                <CardContent className="pt-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <Briefcase className="h-6 w-6" />
                                        <h3 className="font-semibold">Your Selection</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <p><span className="opacity-80">Domain:</span> <span className="font-semibold">{selectedDomain}</span></p>
                                        <p><span className="opacity-80">Company:</span> <span className="font-semibold">{selectedCompany}</span></p>
                                    </div>
                                    <div className="mt-4 p-3 bg-white/20 rounded-lg">
                                        <p className="text-sm">
                                            <span className="font-semibold">Pro Tip:</span> Based on your selection, we'll focus on {selectedCompany}'s interview style and {selectedDomain} specific questions.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DomainSelection; 