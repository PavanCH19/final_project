import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Trophy, Target, Calendar, TrendingUp, Award, Star, ArrowRight, Settings, BarChart3, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SidebarPageWrapper, SidebarTrigger } from "@/components/ui/sidebar";

const ProgressPage = () => {
    const [currentStreak, setCurrentStreak] = useState(7);
    const [longestStreak, setLongestStreak] = useState(14);
    const [completedSessions, setCompletedSessions] = useState(28);
    const [totalQuestions, setTotalQuestions] = useState(156);

    // Mock data for charts
    const performanceData = [
        { day: 'Mon', score: 65 },
        { day: 'Tue', score: 72 },
        { day: 'Wed', score: 68 },
        { day: 'Thu', score: 75 },
        { day: 'Fri', score: 82 },
        { day: 'Sat', score: 85 },
        { day: 'Sun', score: 88 },
    ];

    const achievements = [
        { id: 1, name: 'First Interview', description: 'Complete your first mock interview', completed: true, icon: Trophy },
        { id: 2, name: 'Perfect Score', description: 'Score 100% on any interview', completed: true, icon: Star },
        { id: 3, name: '7-Day Streak', description: 'Practice for 7 consecutive days', completed: true, icon: Calendar },
        { id: 4, name: 'Domain Master', description: 'Complete all questions in a domain', completed: false, icon: Award },
        { id: 5, name: 'Interview Ace', description: 'Pass 10 interviews with 90%+ score', completed: false, icon: Target },
    ];

    const nextSteps = [
        { id: 1, title: 'System Design Interview', description: 'Practice designing scalable systems', difficulty: 'Hard' },
        { id: 2, title: 'Frontend Concepts', description: 'Review React hooks and state management', difficulty: 'Medium' },
        { id: 3, title: 'Data Structures', description: 'Practice tree and graph algorithms', difficulty: 'Medium' },
    ];

    return (
        <SidebarPageWrapper noMargin>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <SidebarTrigger className="mr-4" />
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Your Progress Journey
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    Interview Report
                                </Link>
                                <Link to="/settings" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    <Settings className="h-5 w-5" />
                                </Link>
                                <Link to="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    <Shield className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Motivational Banner */}
                    <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">You're making great progress!</h2>
                                    <p className="text-blue-100">Keep up the momentum. You're in the top 15% of active users this week.</p>
                                </div>
                                <Button className="mt-4 md:mt-0 bg-white text-blue-600 hover:bg-blue-50">
                                    Start Today's Practice
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Streak and Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center">
                                    <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                                    Current Streak
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-bold">{currentStreak} days</span>
                                    <span className="ml-2 text-sm text-gray-500">Longest: {longestStreak} days</span>
                                </div>
                                <div className="mt-4 flex space-x-1">
                                    {[...Array(7)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-2 flex-1 rounded-full ${i < currentStreak % 7 ? 'bg-blue-500' : 'bg-gray-200'}`}
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center">
                                    <Target className="mr-2 h-5 w-5 text-green-500" />
                                    Completed Sessions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-bold">{completedSessions}</span>
                                    <span className="ml-2 text-sm text-gray-500">Total sessions</span>
                                </div>
                                <Progress className="mt-4" value={75} />
                                <p className="text-xs text-gray-500 mt-2">75% towards your monthly goal</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center">
                                    <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
                                    Questions Mastered
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-bold">{totalQuestions}</span>
                                    <span className="ml-2 text-sm text-gray-500">Total questions</span>
                                </div>
                                <div className="mt-4 grid grid-cols-3 gap-2">
                                    <div className="text-center">
                                        <div className="text-sm font-medium">Easy</div>
                                        <div className="text-green-500 font-bold">92%</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-medium">Medium</div>
                                        <div className="text-yellow-500 font-bold">68%</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-medium">Hard</div>
                                        <div className="text-red-500 font-bold">45%</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Performance Chart */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BarChart3 className="mr-2 h-5 w-5 text-blue-500" />
                                Performance Trend
                            </CardTitle>
                            <CardDescription>Your interview scores over the past week</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="w-full h-[300px] sm:h-[250px] md:h-[200px]">
                                <ChartContainer
                                    config={{
                                        score: { label: "Score", color: "#8b5cf6" }
                                    }}
                                >
                                    <LineChart data={performanceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="day" />
                                        <YAxis domain={[0, 100]} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line
                                            type="monotone"
                                            dataKey="score"
                                            stroke="#8b5cf6"
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ChartContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Achievements */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                                Achievements
                            </CardTitle>
                            <CardDescription>Track your milestones and accomplishments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {achievements.map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className={`p-4 rounded-lg border ${achievement.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                                    >
                                        <div className="flex items-center">
                                            <div className={`p-2 rounded-full ${achievement.completed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                                                <achievement.icon className="h-5 w-5" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="font-medium">{achievement.name}</h3>
                                                <p className="text-xs text-gray-500">{achievement.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <ArrowRight className="mr-2 h-5 w-5 text-blue-500" />
                                Recommended Next Steps
                            </CardTitle>
                            <CardDescription>Personalized recommendations to improve your skills</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {nextSteps.map((step) => (
                                    <div key={step.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                                        <div>
                                            <h3 className="font-medium">{step.title}</h3>
                                            <p className="text-sm text-gray-500">{step.description}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <Badge className={
                                                step.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                                    step.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                            }>
                                                {step.difficulty}
                                            </Badge>
                                            <Button variant="ghost" size="sm" className="ml-2">
                                                Start
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SidebarPageWrapper>
    );
};

export default ProgressPage;