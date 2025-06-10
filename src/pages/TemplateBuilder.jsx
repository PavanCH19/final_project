import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Save, Eye, Plus, Trash2 } from "lucide-react";
import TemplatePreview from './TemplatePreview';
import { SidebarPageWrapper } from "@/components/ui/sidebar";

const TemplateBuilder = ({ template, onBack, onSave }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [showPreview, setShowPreview] = useState(false);
    const [formData, setFormData] = useState({
        name: template?.name || '',
        domain: template?.domain || '',
        company: template?.company || '',
        role: template?.role || '',
        difficulty: template?.difficulty || '',
        description: template?.description || '',
        questions: template?.questions || []
    });


    const domains = ['Technology', 'Business', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Design'];
    const companies = ['Google', 'Meta', 'Microsoft', 'Amazon', 'Apple', 'Netflix', 'Tesla', 'Spotify', 'Uber'];
    const roles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'Designer', 'Marketing Manager', 'Sales Representative'];
    const difficulties = ['Entry-level', 'Mid-level', 'Senior', 'Executive'];
    const questionTypes = ['Technical', 'Behavioral', 'System Design', 'Coding', 'Case Study', 'Culture Fit'];
    const questionCategories = ['Problem Solving', 'Leadership', 'Communication', 'Technical Skills', 'Experience'];

    const steps = [
        { number: 1, title: 'Basic Info', description: 'Template details and metadata' },
        { number: 2, title: 'Question Types', description: 'Select question categories and types' },
        { number: 3, title: 'Questions', description: 'Add and configure questions' },
        { number: 4, title: 'Review', description: 'Review and save template' }
    ];

    const addQuestion = () => {
        const newQuestion = {
            id: Date.now().toString(),
            type: 'Technical',
            category: 'Problem Solving',
            difficulty: formData.difficulty,
            question: '',
            timeLimit: 5
        };
        setFormData(prev => ({
            ...prev,
            questions: [...prev.questions, newQuestion]
        }));
    };

    const updateQuestion = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === id ? { ...q, [field]: value } : q
            )
        }));
    };

    const removeQuestion = (id) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.filter(q => q.id !== id)
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    if (showPreview) {
        return (
            <TemplatePreview
                template={formData}
                onBack={() => setShowPreview(false)}
                onEdit={() => setShowPreview(false)}
            />
        );
    }

    return (
        <SidebarPageWrapper noMargin>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="container mx-auto px-4 py-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" onClick={onBack} className="p-2">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {template ? 'Edit Template' : 'Create New Template'}
                                </h1>
                                <p className="text-gray-600">Step {currentStep} of 4</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setShowPreview(true)}
                                className="flex items-center gap-2"
                            >
                                <Eye className="h-4 w-4" />
                                Preview
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                            >
                                <Save className="h-4 w-4" />
                                Save Template
                            </Button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            {steps.map((step, index) => (
                                <div key={step.number} className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step.number
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                        }`}>
                                        {step.number}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`w-16 h-1 mx-2 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold text-gray-900">{steps[currentStep - 1].title}</h3>
                            <p className="text-sm text-gray-600">{steps[currentStep - 1].description}</p>
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card className="bg-white shadow-sm border-0">
                                <CardHeader>
                                    <CardTitle>Template Configuration</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {currentStep === 1 && (
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="name">Template Name</Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                    placeholder="e.g., Frontend Developer Interview"
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label>Domain</Label>
                                                    <Select value={formData.domain} onValueChange={(value) => setFormData(prev => ({ ...prev, domain: value }))}>
                                                        <SelectTrigger className="mt-1">
                                                            <SelectValue placeholder="Select domain" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {domains.map(domain => (
                                                                <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div>
                                                    <Label>Company</Label>
                                                    <Select value={formData.company} onValueChange={(value) => setFormData(prev => ({ ...prev, company: value }))}>
                                                        <SelectTrigger className="mt-1">
                                                            <SelectValue placeholder="Select company" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {companies.map(company => (
                                                                <SelectItem key={company} value={company}>{company}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label>Role</Label>
                                                    <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                                                        <SelectTrigger className="mt-1">
                                                            <SelectValue placeholder="Select role" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {roles.map(role => (
                                                                <SelectItem key={role} value={role}>{role}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div>
                                                    <Label>Difficulty Level</Label>
                                                    <Select value={formData.difficulty} onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}>
                                                        <SelectTrigger className="mt-1">
                                                            <SelectValue placeholder="Select difficulty" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {difficulties.map(difficulty => (
                                                                <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    value={formData.description}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                                    placeholder="Describe the purpose and scope of this interview template..."
                                                    className="mt-1"
                                                    rows={3}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 2 && (
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="font-semibold mb-3">Question Types</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                    {questionTypes.map(type => (
                                                        <div key={type} className="flex items-center space-x-2">
                                                            <Checkbox id={type} />
                                                            <Label htmlFor={type} className="text-sm">{type}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="font-semibold mb-3">Question Categories</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                    {questionCategories.map(category => (
                                                        <div key={category} className="flex items-center space-x-2">
                                                            <Checkbox id={category} />
                                                            <Label htmlFor={category} className="text-sm">{category}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 3 && (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold">Questions ({formData.questions.length})</h3>
                                                <Button onClick={addQuestion} size="sm" className="flex items-center gap-2">
                                                    <Plus className="h-4 w-4" />
                                                    Add Question
                                                </Button>
                                            </div>

                                            <div className="space-y-4">
                                                {formData.questions.map((question, index) => (
                                                    <Card key={question.id} className="border border-gray-200">
                                                        <CardContent className="p-4">
                                                            <div className="space-y-3">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="font-medium text-sm">Question {index + 1}</span>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => removeQuestion(question.id)}
                                                                        className="text-red-600 hover:text-red-700"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>

                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                    <Select
                                                                        value={question.type}
                                                                        onValueChange={(value) => updateQuestion(question.id, 'type', value)}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {questionTypes.map(type => (
                                                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>

                                                                    <Select
                                                                        value={question.category}
                                                                        onValueChange={(value) => updateQuestion(question.id, 'category', value)}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {questionCategories.map(category => (
                                                                                <SelectItem key={category} value={category}>{category}</SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>

                                                                    <Input
                                                                        type="number"
                                                                        value={question.timeLimit}
                                                                        onChange={(e) => updateQuestion(question.id, 'timeLimit', parseInt(e.target.value))}
                                                                        placeholder="Time (min)"
                                                                    />
                                                                </div>

                                                                <Textarea
                                                                    value={question.question}
                                                                    onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                                                                    placeholder="Enter your question here..."
                                                                    rows={2}
                                                                />
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 4 && (
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="font-semibold mb-4">Template Summary</h3>
                                                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                                    <p><span className="font-medium">Name:</span> {formData.name}</p>
                                                    <p><span className="font-medium">Domain:</span> {formData.domain}</p>
                                                    <p><span className="font-medium">Company:</span> {formData.company}</p>
                                                    <p><span className="font-medium">Role:</span> {formData.role}</p>
                                                    <p><span className="font-medium">Difficulty:</span> {formData.difficulty}</p>
                                                    <p><span className="font-medium">Questions:</span> {formData.questions.length}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-medium mb-2">Description</h4>
                                                <p className="text-gray-600">{formData.description || 'No description provided'}</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-4">
                            <Card className="bg-white shadow-sm border-0">
                                <CardHeader>
                                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Questions</span>
                                            <Badge variant="secondary">{formData.questions.length}</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Est. Duration</span>
                                            <Badge variant="secondary">
                                                {formData.questions.reduce((acc, q) => acc + (q.timeLimit || 0), 0)} min
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Difficulty</span>
                                            <Badge variant="outline">{formData.difficulty || 'Not set'}</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white shadow-sm border-0">
                                <CardHeader>
                                    <CardTitle className="text-lg">Tips</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        {currentStep === 1 && (
                                            <>
                                                <p>• Choose a descriptive name for easy identification</p>
                                                <p>• Select the most relevant company and role</p>
                                                <p>• Match difficulty to your target level</p>
                                            </>
                                        )}
                                        {currentStep === 2 && (
                                            <>
                                                <p>• Mix different question types for variety</p>
                                                <p>• Include behavioral questions for culture fit</p>
                                                <p>• Technical questions test specific skills</p>
                                            </>
                                        )}
                                        {currentStep === 3 && (
                                            <>
                                                <p>• Be specific and clear in your questions</p>
                                                <p>• Set realistic time limits</p>
                                                <p>• Include follow-up questions when needed</p>
                                            </>
                                        )}
                                        {currentStep === 4 && (
                                            <>
                                                <p>• Review all details before saving</p>
                                                <p>• You can edit the template anytime</p>
                                                <p>• Share with colleagues for feedback</p>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between mt-8">
                        <Button
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <Button
                            onClick={nextStep}
                            disabled={currentStep === 4}
                            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                        >
                            Next
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </SidebarPageWrapper>
    );
};

export default TemplateBuilder; 