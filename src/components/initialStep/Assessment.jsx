import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Brain, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Assessment = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds

    const questions = [
        {
            id: 0,
            category: "Technical Knowledge",
            question: "What is the time complexity of searching in a balanced binary search tree?",
            options: [
                "O(1)",
                "O(log n)",
                "O(n)",
                "O(n log n)"
            ]
        },
        {
            id: 1,
            category: "Problem Solving",
            question: "Which data structure would be most efficient for implementing an undo feature in a text editor?",
            options: [
                "Queue",
                "Stack",
                "Heap",
                "Hash Table"
            ]
        },
        {
            id: 2,
            category: "System Design",
            question: "What is the primary benefit of using a Content Delivery Network (CDN)?",
            options: [
                "Increased security",
                "Reduced latency",
                "Better SEO rankings",
                "Lower storage costs"
            ]
        },
        {
            id: 3,
            category: "Technical Knowledge",
            question: "In React, what is the purpose of the useEffect hook?",
            options: [
                "To manage component state",
                "To handle side effects",
                "To optimize rendering performance",
                "To create reusable components"
            ]
        },
        {
            id: 4,
            category: "Problem Solving",
            question: "Which algorithm would be most suitable for finding the shortest path in a weighted graph?",
            options: [
                "Breadth-First Search",
                "Depth-First Search",
                "Dijkstra's Algorithm",
                "Binary Search"
            ]
        }
    ];

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleAnswerChange = (value) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion]: value
        }));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleFinish = () => {
        navigate('/dashboard/career-match');
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const isLastQuestion = currentQuestion === questions.length - 1;
    const currentAnswer = answers[currentQuestion];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    navigate('/career-match');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                        <Brain className="h-8 w-8 text-indigo-600" />
                        <span className="text-2xl font-bold text-gray-900">InterviewAce</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span className="font-mono">{formatTime(timeLeft)}</span>
                        </div>
                        <div className="text-sm text-gray-600">Step 3 of 5</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <Progress value={60} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Resume Upload</span>
                        <span>Domain Selection</span>
                        <span className="font-medium text-indigo-600">Assessment</span>
                        <span>Career Match</span>
                        <span>Dashboard</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Assessment */}
                    <div className="lg:col-span-2">
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-2xl font-bold text-gray-900">
                                            Skills Assessment
                                        </CardTitle>
                                        <p className="text-gray-600 mt-2">
                                            Question {currentQuestion + 1} of {questions.length}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 mb-1">Category</div>
                                        <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                            {questions[currentQuestion].category}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Question Progress */}
                                <div className="mb-6">
                                    <Progress value={progress} className="h-2" />
                                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                                        <span>Progress</span>
                                        <span>{Math.round(progress)}% Complete</span>
                                    </div>
                                </div>

                                {/* Question */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                        {questions[currentQuestion].question}
                                    </h3>

                                    <RadioGroup
                                        value={currentAnswer || ""}
                                        onValueChange={handleAnswerChange}
                                        className="space-y-3"
                                    >
                                        {questions[currentQuestion].options.map((option, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                                <RadioGroupItem value={option} id={`option-${index}`} />
                                                <Label
                                                    htmlFor={`option-${index}`}
                                                    className="flex-1 cursor-pointer text-gray-700"
                                                >
                                                    {option}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                {/* Navigation */}
                                <div className="flex justify-between pt-6">
                                    <Button
                                        variant="outline"
                                        onClick={handlePrevious}
                                        disabled={currentQuestion === 0}
                                        className="flex items-center space-x-2"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        <span>Previous</span>
                                    </Button>

                                    {isLastQuestion ? (
                                        <Button
                                            onClick={handleFinish}
                                            disabled={!currentAnswer}
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex items-center space-x-2"
                                        >
                                            <span>Finish Assessment</span>
                                            <CheckCircle className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleNext}
                                            disabled={!currentAnswer}
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex items-center space-x-2"
                                        >
                                            <span>Next Question</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Side Panel */}
                    <div className="space-y-6">
                        {/* Assessment Overview */}
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold text-gray-900">Assessment Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2 text-gray-700">
                                        <Clock className="h-4 w-4" />
                                        <span>25 minutes total</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-700">
                                        <CheckCircle className="h-4 w-4" />
                                        <span>5 questions</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-700">
                                        <Brain className="h-4 w-4" />
                                        <span>Multiple categories</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Question Navigator */}
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold text-gray-900">Question Navigator</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-5 gap-2">
                                    {questions.map((_, index) => (
                                        <Button
                                            key={index}
                                            variant={currentQuestion === index ? "default" : answers[index] ? "outline" : "ghost"}
                                            className={`h-10 w-10 p-0 ${currentQuestion === index
                                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                                : answers[index]
                                                    ? "border-indigo-600 text-indigo-600"
                                                    : "text-gray-500"
                                                }`}
                                            onClick={() => setCurrentQuestion(index)}
                                        >
                                            {index + 1}
                                        </Button>
                                    ))}
                                </div>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <div className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                                        <span>Current Question</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <div className="h-3 w-3 rounded-full border border-indigo-600"></div>
                                        <span>Answered</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <div className="h-3 w-3 rounded-full border border-gray-300"></div>
                                        <span>Not Answered</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tips */}
                        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-xl">
                            <CardContent className="pt-6">
                                <h3 className="font-semibold mb-4">Quick Tips</h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start space-x-2">
                                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <span>Read each question carefully before answering</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <span>You can review and change answers before finishing</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <span>Focus on demonstrating your problem-solving approach</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assessment; 