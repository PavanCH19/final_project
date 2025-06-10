import React, { useState } from 'react';
import {
    Upload, FileText, Edit, Check, Shield, ArrowLeft, ChevronRight, Brain
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ResumeUpload = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [editingField, setEditingField] = useState(null);

    const [extractedData, setExtractedData] = useState({
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS'],
        experience: [
            {
                role: 'Senior Software Engineer',
                company: 'Tech Corp',
                duration: '2021 - Present',
                description: 'Led development of web applications using React and Node.js',
            },
            {
                role: 'Software Engineer',
                company: 'StartupXYZ',
                duration: '2019 - 2021',
                description: 'Built scalable backend services and APIs',
            },
        ],
        education: [
            {
                degree: 'Bachelor of Computer Science',
                institution: 'University of Technology',
                year: '2019',
                gpa: '3.8',
            },
        ],
    });

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setUploadedFile(file);
            setIsProcessing(true);

            setTimeout(() => {
                setIsProcessing(false);
                setCurrentStep(2);
            }, 2000);
        }
    };

    const handleConfirm = () => {
        setCurrentStep(3);
        setTimeout(() => {
            navigate('/dashboard/domain-selection');
        }, 2000);
    };

    const steps = [
        { number: 1, title: 'Upload Resume', description: 'Upload your PDF or DOCX file' },
        { number: 2, title: 'Review & Edit', description: 'Verify extracted information' },
        { number: 3, title: 'Complete', description: 'Ready for interview prep' },
    ];

    const progressPercentage = (currentStep / steps.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="hover:bg-muted">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <Brain className="h-8 w-8 text-indigo-600" />
                        <span className="text-2xl font-bold text-gray-900">InterviewAce</span>
                    </div>
                    <div className="text-sm text-gray-600">Step 2 of 5</div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <Progress value={20} className="h-2" />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span className="font-medium text-indigo-600">Resume Upload</span>
                        <span>Domain Selection</span>
                        <span>Assessment</span>
                        <span>Career Match</span>
                        <span>Dashboard</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 mb-8">

                    {/* <div>
                        <h1 className="text-3xl font-bold">Resume Upload</h1>
                        <p className="text-muted-foreground">Upload your resume to extract key information for interview preparation</p>
                    </div> */}
                </div>

                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center">
                                <div
                                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStep >= step.number
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-background border-muted-foreground/30'
                                        }`}
                                >
                                    {currentStep > step.number ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <span className="text-sm font-medium">{step.number}</span>
                                    )}
                                </div>
                                {index < steps.length - 1 && (
                                    <ChevronRight className="h-5 w-5 text-muted-foreground mx-2" />
                                )}
                            </div>
                        ))}
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="mt-2">
                        <h3 className="font-semibold">{steps[currentStep - 1]?.title}</h3>
                        <p className="text-sm text-muted-foreground">{steps[currentStep - 1]?.description}</p>
                    </div>
                </div>

                {currentStep === 1 && (
                    <div className="animate-fade-in">
                        <Card className="border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors">
                            <CardContent className="p-8">
                                <div className="text-center space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Upload className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
                                        <p className="text-muted-foreground mb-4">Supported formats: PDF, DOCX (Max 10MB)</p>
                                    </div>
                                    <div>
                                        <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="hidden" id="resume-upload" />
                                        <label htmlFor="resume-upload">
                                            <Button size="lg" className="cursor-pointer" asChild>
                                                <span>Choose File</span>
                                            </Button>
                                        </label>
                                    </div>
                                    {uploadedFile && (
                                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground animate-fade-in">
                                            <FileText className="h-4 w-4" />
                                            <span>{uploadedFile.name}</span>
                                        </div>
                                    )}
                                    {isProcessing && (
                                        <div className="animate-fade-in">
                                            <div className="flex items-center justify-center gap-2 text-primary">
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                                                <span>Processing your resume...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="mt-6 bg-muted/50">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Shield className="h-4 w-4 text-green-600" />
                                    <span className="font-medium">Secure & Private:</span>
                                    <span className="text-muted-foreground">Your data is encrypted and never shared with third parties</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Personal Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Personal Information
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setEditingField(editingField === 'personal' ? null : 'personal')}
                                    >
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {editingField === 'personal' ? (
                                    <div className="space-y-4">
                                        <Input value={extractedData.name} onChange={(e) => setExtractedData({ ...extractedData, name: e.target.value })} />
                                        <Input value={extractedData.email} onChange={(e) => setExtractedData({ ...extractedData, email: e.target.value })} />
                                        <Input value={extractedData.phone} onChange={(e) => setExtractedData({ ...extractedData, phone: e.target.value })} />
                                        <Button size="sm" onClick={() => setEditingField(null)}>
                                            <Check className="h-4 w-4 mr-1" />
                                            Save
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <p><strong>Name:</strong> {extractedData.name}</p>
                                        <p><strong>Email:</strong> {extractedData.email}</p>
                                        <p><strong>Phone:</strong> {extractedData.phone}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Skills */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Skills
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setEditingField(editingField === 'skills' ? null : 'skills')}
                                    >
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {extractedData.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="animate-scale-in">{skill}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Experience */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Work Experience
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setEditingField(editingField === 'experience' ? null : 'experience')}
                                    >
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {extractedData.experience.map((exp, index) => (
                                    <div key={index} className="border-l-2 border-primary/20 pl-4 animate-fade-in">
                                        <h4 className="font-semibold">{exp.role}</h4>
                                        <p className="text-sm text-muted-foreground">{exp.company} • {exp.duration}</p>
                                        <p className="text-sm mt-1">{exp.description}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Education */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Education
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setEditingField(editingField === 'education' ? null : 'education')}
                                    >
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {extractedData.education.map((edu, index) => (
                                    <div key={index} className="animate-fade-in">
                                        <h4 className="font-semibold">{edu.degree}</h4>
                                        <p className="text-sm text-muted-foreground">{edu.institution} • {edu.year}</p>
                                        <p className="text-sm">GPA: {edu.gpa}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button size="lg" onClick={handleConfirm}>
                                Confirm & Continue
                                <ChevronRight className="h-5 w-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="text-center py-8 animate-fade-in">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Resume Processed Successfully!</h3>
                        <p className="text-muted-foreground mb-4">
                            Your information has been extracted and is ready for interview preparation.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Redirecting to main page...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeUpload;
