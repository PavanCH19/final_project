import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, XCircle, Lightbulb } from 'lucide-react';

export const ResumeScoring = ({ isOpen, onClose, resumeData }) => {
    // Calculate score based on resume completeness and quality
    const calculateScore = () => {
        let score = 0;
        let maxScore = 100;

        // Personal Info (20 points)
        if (resumeData.personalInfo.fullName) score += 5;
        if (resumeData.personalInfo.email) score += 5;
        if (resumeData.personalInfo.phone) score += 3;
        if (resumeData.personalInfo.location) score += 3;
        if (resumeData.personalInfo.linkedin) score += 2;
        if (resumeData.personalInfo.website) score += 2;

        // Summary (15 points)
        if (resumeData.summary) {
            if (resumeData.summary.length > 50) score += 15;
            else if (resumeData.summary.length > 20) score += 10;
            else score += 5;
        }

        // Experience (30 points)
        if (resumeData.experience.length > 0) {
            score += Math.min(resumeData.experience.length * 10, 20);
            // Bonus for detailed descriptions
            const hasDetailedExp = resumeData.experience.some(exp => exp.description.length > 100);
            if (hasDetailedExp) score += 10;
        }

        // Education (15 points)
        if (resumeData.education.length > 0) score += 15;

        // Skills (10 points)
        if (resumeData.skills.length >= 5) score += 10;
        else if (resumeData.skills.length > 0) score += 5;

        // Projects (10 points)
        if (resumeData.projects.length > 0) score += 10;

        return Math.min(score, maxScore);
    };

    const score = calculateScore();

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreIcon = (score) => {
        if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
        if (score >= 60) return <AlertCircle className="h-5 w-5 text-yellow-600" />;
        return <XCircle className="h-5 w-5 text-red-600" />;
    };

    const improvements = [
        {
            condition: !resumeData.personalInfo.linkedin,
            text: "Add your LinkedIn profile to increase visibility",
            priority: "medium"
        },
        {
            condition: resumeData.summary.length < 50,
            text: "Expand your professional summary (aim for 2-3 sentences)",
            priority: "high"
        },
        {
            condition: resumeData.experience.length === 0,
            text: "Add at least one work experience entry",
            priority: "high"
        },
        {
            condition: resumeData.skills.length < 5,
            text: "Add more relevant skills (aim for 8-12 skills)",
            priority: "medium"
        },
        {
            condition: resumeData.projects.length === 0,
            text: "Include 2-3 projects to showcase your abilities",
            priority: "medium"
        },
        {
            condition: resumeData.experience.some(exp => exp.description.length < 50),
            text: "Add more detailed descriptions to your work experience",
            priority: "high"
        }
    ].filter(improvement => improvement.condition);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        {getScoreIcon(score)}
                        <span>Resume Analysis</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Overall Score */}
                    <Card className="p-6">
                        <div className="text-center space-y-4">
                            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                                {score}/100
                            </div>
                            <Progress value={score} className="w-full" />
                            <p className="text-muted-foreground">
                                {score >= 80 ? "Excellent! Your resume is well-optimized." :
                                    score >= 60 ? "Good progress! A few improvements will make it great." :
                                        "Needs work. Focus on the key improvements below."}
                            </p>
                        </div>
                    </Card>

                    {/* Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4">
                            <h3 className="font-semibold mb-2">Sections Completed</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Personal Info</span>
                                    <Badge variant={resumeData.personalInfo.fullName ? "default" : "secondary"}>
                                        {resumeData.personalInfo.fullName ? "✓" : "✗"}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Summary</span>
                                    <Badge variant={resumeData.summary ? "default" : "secondary"}>
                                        {resumeData.summary ? "✓" : "✗"}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Experience</span>
                                    <Badge variant={resumeData.experience.length > 0 ? "default" : "secondary"}>
                                        {resumeData.experience.length > 0 ? "✓" : "✗"}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Education</span>
                                    <Badge variant={resumeData.education.length > 0 ? "default" : "secondary"}>
                                        {resumeData.education.length > 0 ? "✓" : "✗"}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Skills</span>
                                    <Badge variant={resumeData.skills.length > 0 ? "default" : "secondary"}>
                                        {resumeData.skills.length > 0 ? "✓" : "✗"}
                                    </Badge>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-4">
                            <h3 className="font-semibold mb-2">Key Metrics</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Word Count</span>
                                    <span>{resumeData.summary.length + resumeData.experience.reduce((acc, exp) => acc + exp.description.length, 0)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Skills Listed</span>
                                    <span>{resumeData.skills.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Work Experience</span>
                                    <span>{resumeData.experience.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Projects</span>
                                    <span>{resumeData.projects.length}</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Improvements */}
                    {improvements.length > 0 && (
                        <Card className="p-4">
                            <div className="flex items-center space-x-2 mb-3">
                                <Lightbulb className="h-4 w-4 text-primary" />
                                <h3 className="font-semibold">Recommended Improvements</h3>
                            </div>
                            <div className="space-y-2">
                                {improvements.map((improvement, index) => (
                                    <div key={index} className="flex items-start space-x-2">
                                        <Badge
                                            variant={improvement.priority === 'high' ? 'destructive' : 'secondary'}
                                            className="text-xs mt-0.5"
                                        >
                                            {improvement.priority}
                                        </Badge>
                                        <p className="text-sm">{improvement.text}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    <div className="flex justify-end">
                        <Button onClick={onClose}>Close</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}; 