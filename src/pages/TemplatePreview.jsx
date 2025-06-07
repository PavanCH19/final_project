import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Clock, FileText, Users } from "lucide-react";

const TemplatePreview = ({ template, onBack, onEdit }) => {
    const totalDuration = template.questions.reduce((acc, q) => acc + (q.timeLimit || 0), 0);
    const questionTypes = [...new Set(template.questions.map(q => q.type))];
    const questionCategories = [...new Set(template.questions.map(q => q.category))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" onClick={onBack} className="p-2">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Template Preview</h1>
                            <p className="text-gray-600">Review your interview template</p>
                        </div>
                    </div>
                    <Button
                        onClick={onEdit}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                        <Edit className="h-4 w-4" />
                        Edit Template
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Template Overview */}
                        <Card className="bg-white shadow-sm border-0">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl mb-2">{template.name}</CardTitle>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge className="bg-blue-100 text-blue-800">{template.domain}</Badge>
                                            <Badge variant="outline">{template.company}</Badge>
                                            <Badge variant="outline">{template.role}</Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span>{totalDuration} minutes</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FileText className="h-4 w-4" />
                                                <span>{template.questions.length} questions</span>
                                            </div>
                                            <Badge variant="secondary" className="text-xs">
                                                {template.difficulty}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            {template.description && (
                                <CardContent>
                                    <div>
                                        <h4 className="font-medium mb-2">Description</h4>
                                        <p className="text-gray-600">{template.description}</p>
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Questions List */}
                        <Card className="bg-white shadow-sm border-0">
                            <CardHeader>
                                <CardTitle>Questions ({template.questions.length})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {template.questions.map((question, index) => (
                                        <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-sm">Q{index + 1}</span>
                                                    <Badge variant="outline" className="text-xs">{question.type}</Badge>
                                                    <Badge variant="secondary" className="text-xs">{question.category}</Badge>
                                                </div>
                                                {question.timeLimit && (
                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                        <Clock className="h-3 w-3" />
                                                        <span>{question.timeLimit}m</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-gray-800">{question.question || 'Question content will appear here...'}</p>
                                        </div>
                                    ))}

                                    {template.questions.length === 0 && (
                                        <div className="text-center py-8 text-gray-500">
                                            <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            <p>No questions added yet</p>
                                            <p className="text-sm">Go back to step 3 to add questions</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Template Stats */}
                        <Card className="bg-white shadow-sm border-0">
                            <CardHeader>
                                <CardTitle className="text-lg">Template Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Total Questions</span>
                                    <Badge>{template.questions.length}</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Estimated Duration</span>
                                    <Badge>{totalDuration} min</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Difficulty Level</span>
                                    <Badge variant="outline">{template.difficulty}</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Domain</span>
                                    <Badge variant="secondary">{template.domain}</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Question Types */}
                        <Card className="bg-white shadow-sm border-0">
                            <CardHeader>
                                <CardTitle className="text-lg">Question Types</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {questionTypes.length > 0 ? (
                                        questionTypes.map(type => (
                                            <div key={type} className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">{type}</span>
                                                <Badge variant="outline" className="text-xs">
                                                    {template.questions.filter(q => q.type === type).length}
                                                </Badge>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No question types defined</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Question Categories */}
                        <Card className="bg-white shadow-sm border-0">
                            <CardHeader>
                                <CardTitle className="text-lg">Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {questionCategories.length > 0 ? (
                                        questionCategories.map(category => (
                                            <div key={category} className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">{category}</span>
                                                <Badge variant="outline" className="text-xs">
                                                    {template.questions.filter(q => q.category === category).length}
                                                </Badge>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No categories defined</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card className="bg-white shadow-sm border-0">
                            <CardHeader>
                                <CardTitle className="text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                    Start Interview
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Users className="h-4 w-4 mr-2" />
                                    Share Template
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Export as PDF
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplatePreview; 