import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Users, FileText, MessageSquare, BarChart3, Settings, Search, Filter, Plus, Edit, Trash2, AlertCircle, TrendingUp, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    // Mock data
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', joinDate: '2024-01-15', sessionsCount: 25 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Premium', joinDate: '2024-02-20', sessionsCount: 42 },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Inactive', joinDate: '2024-01-10', sessionsCount: 8 },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Active', joinDate: '2024-03-05', sessionsCount: 18 },
    ];

    const sessions = [
        { id: 1, user: 'John Doe', domain: 'Frontend', date: '2024-06-05', duration: '45m', score: 85 },
        { id: 2, user: 'Jane Smith', domain: 'Backend', date: '2024-06-04', duration: '52m', score: 92 },
        { id: 3, user: 'Mike Johnson', domain: 'System Design', date: '2024-06-03', duration: '38m', score: 78 },
        { id: 4, user: 'Sarah Wilson', domain: 'Data Structures', date: '2024-06-02', duration: '41m', score: 88 },
    ];

    const questions = [
        { id: 1, title: 'Implement a Binary Search Tree', domain: 'Data Structures', difficulty: 'Medium', company: 'Google' },
        { id: 2, title: 'Design a URL Shortener', domain: 'System Design', difficulty: 'Hard', company: 'Meta' },
        { id: 3, title: 'React Component Lifecycle', domain: 'Frontend', difficulty: 'Easy', company: 'Netflix' },
        { id: 4, title: 'Database Indexing Strategies', domain: 'Backend', difficulty: 'Medium', company: 'Amazon' },
    ];

    const usageData = [
        { month: 'Jan', sessions: 120, users: 45 },
        { month: 'Feb', sessions: 150, users: 62 },
        { month: 'Mar', sessions: 180, users: 78 },
        { month: 'Apr', sessions: 220, users: 95 },
        { month: 'May', sessions: 260, users: 112 },
        { month: 'Jun', sessions: 300, users: 128 },
    ];

    const domainData = [
        { name: 'Frontend', value: 35, color: '#8b5cf6' },
        { name: 'Backend', value: 28, color: '#06b6d4' },
        { name: 'System Design', value: 22, color: '#10b981' },
        { name: 'Data Structures', value: 15, color: '#f59e0b' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Premium': return 'bg-purple-100 text-purple-800';
            case 'Inactive': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/progress" className="text-gray-600 hover:text-gray-900">
                                Back to Platform
                            </Link>
                            <Button variant="outline" size="sm">
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <Users className="h-8 w-8 text-blue-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                                    <p className="text-2xl font-bold text-gray-900">1,284</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <FileText className="h-8 w-8 text-green-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Sessions Today</p>
                                    <p className="text-2xl font-bold text-gray-900">42</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <MessageSquare className="h-8 w-8 text-purple-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Questions</p>
                                    <p className="text-2xl font-bold text-gray-900">2,156</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <TrendingUp className="h-8 w-8 text-orange-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Avg Score</p>
                                    <p className="text-2xl font-bold text-gray-900">84.2%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <Tabs defaultValue="users" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="users" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Users
                        </TabsTrigger>
                        <TabsTrigger value="interviews" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Interviews
                        </TabsTrigger>
                        <TabsTrigger value="questions" className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Questions
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Analytics
                        </TabsTrigger>
                        <TabsTrigger value="alerts" className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Alerts
                        </TabsTrigger>
                    </TabsList>

                    {/* Users Tab */}
                    <TabsContent value="users">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Management</CardTitle>
                                <CardDescription>Manage platform users and their activity</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                            <Input
                                                placeholder="Search users..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 w-64"
                                            />
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Filter className="h-4 w-4 mr-2" />
                                            Filter
                                        </Button>
                                    </div>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add User
                                    </Button>
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Join Date</TableHead>
                                            <TableHead>Sessions</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>
                                                    <Badge className={getStatusColor(user.status)}>
                                                        {user.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{user.joinDate}</TableCell>
                                                <TableCell>{user.sessionsCount}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Interviews Tab */}
                    <TabsContent value="interviews">
                        <Card>
                            <CardHeader>
                                <CardTitle>Interview Session Logs</CardTitle>
                                <CardDescription>Monitor and analyze interview sessions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                            <Input
                                                placeholder="Search sessions..."
                                                className="pl-10 w-64"
                                            />
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Filter className="h-4 w-4 mr-2" />
                                            Filter
                                        </Button>
                                    </div>
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Domain</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Duration</TableHead>
                                            <TableHead>Score</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sessions.map((session) => (
                                            <TableRow key={session.id}>
                                                <TableCell className="font-medium">{session.user}</TableCell>
                                                <TableCell>{session.domain}</TableCell>
                                                <TableCell>{session.date}</TableCell>
                                                <TableCell>{session.duration}</TableCell>
                                                <TableCell>
                                                    <Badge className={session.score >= 90 ? 'bg-green-100 text-green-800' :
                                                        session.score >= 75 ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'}>
                                                        {session.score}%
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Questions Tab */}
                    <TabsContent value="questions">
                        <Card>
                            <CardHeader>
                                <CardTitle>Question Bank</CardTitle>
                                <CardDescription>Manage and organize interview questions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                            <Input
                                                placeholder="Search questions..."
                                                className="pl-10 w-64"
                                            />
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Filter className="h-4 w-4 mr-2" />
                                            Filter
                                        </Button>
                                    </div>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Question
                                    </Button>
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Domain</TableHead>
                                            <TableHead>Difficulty</TableHead>
                                            <TableHead>Company</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {questions.map((question) => (
                                            <TableRow key={question.id}>
                                                <TableCell className="font-medium">{question.title}</TableCell>
                                                <TableCell>{question.domain}</TableCell>
                                                <TableCell>
                                                    <Badge className={getDifficultyColor(question.difficulty)}>
                                                        {question.difficulty}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{question.company}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Platform Usage</CardTitle>
                                    <CardDescription>Sessions and active users over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[250px] sm:h-[300px] md:h-[350px]">
                                        <ChartContainer
                                            config={{
                                                sessions: { label: "Sessions", color: "#8b5cf6" },
                                                users: { label: "Users", color: "#06b6d4" }
                                            }}
                                        >
                                            <LineChart data={usageData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Line type="monotone" dataKey="sessions" stroke="#8b5cf6" strokeWidth={2} />
                                                <Line type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2} />
                                            </LineChart>
                                        </ChartContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Domain Distribution</CardTitle>
                                    <CardDescription>Interview sessions by domain</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[250px] sm:h-[300px] md:h-[350px]">
                                        <ChartContainer
                                            config={{
                                                value: { label: "Distribution", color: "#8b5cf6" }
                                            }}
                                        >
                                            <PieChart>
                                                <Pie
                                                    data={domainData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={100}
                                                >
                                                    {domainData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                            </PieChart>
                                        </ChartContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Alerts Tab */}
                    <TabsContent value="alerts">
                        <Card>
                            <CardHeader>
                                <CardTitle>System Alerts</CardTitle>
                                <CardDescription>Monitor system health and notifications</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                                        <div className="flex items-center">
                                            <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                                            <div>
                                                <h4 className="font-medium text-yellow-800">High User Load</h4>
                                                <p className="text-sm text-yellow-700">System experiencing higher than normal user activity</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                                        <div className="flex items-center">
                                            <AlertCircle className="h-5 w-5 text-green-600 mr-3" />
                                            <div>
                                                <h4 className="font-medium text-green-800">Database Backup Complete</h4>
                                                <p className="text-sm text-green-700">Daily backup completed successfully</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Admin;

