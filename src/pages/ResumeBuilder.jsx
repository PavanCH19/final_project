import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResumeWizard } from '@/components/ResumeBuilder/ResumeWizard';
import { ResumePreview } from '@/components/ResumeBuilder/ResumePreview';
import { ResumeScoring } from '@/components/ResumeBuilder/ResumeScoring';
import { ExportOptions } from '@/components/ResumeBuilder/ExportOptions';
import { FileText, Download, Target } from 'lucide-react';
import { SidebarPageWrapper, SidebarTrigger } from "@/components/ui/sidebar";

const ResumeBuilder = () => {
    const [resumeData, setResumeData] = useState({
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            linkedin: '',
            website: '',
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
    });

    const [showExportOptions, setShowExportOptions] = useState(false);
    const [showScoring, setShowScoring] = useState(false);

    return (
        <SidebarPageWrapper noMargin>
            <div className="min-h-screen bg-background p-4">
                <div className="max-w-7xl mx-auto space-y-6">
                    <SidebarTrigger />
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-primary" />
                            <h1 className="text-3xl font-bold">Resume Builder</h1>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setShowScoring(true)}
                            >
                                <Target className="h-4 w-4 mr-2" />
                                Score Resume
                            </Button>

                            <Button onClick={() => setShowExportOptions(true)}>
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Left Panel - Wizard */}
                        <Card className="p-6">
                            <ResumeWizard
                                resumeData={resumeData}
                                onUpdateResume={setResumeData}
                            />
                        </Card>

                        {/* Right Panel - Preview */}
                        <Card className="p-6">
                            <ResumePreview resumeData={resumeData} />
                        </Card>
                    </div>

                    {/* Modals */}
                    {showScoring && (
                        <ResumeScoring
                            isOpen={showScoring}
                            onClose={() => setShowScoring(false)}
                            resumeData={resumeData}
                        />
                    )}

                    {showExportOptions && (
                        <ExportOptions
                            isOpen={showExportOptions}
                            onClose={() => setShowExportOptions(false)}
                            resumeData={resumeData}
                        />
                    )}
                </div>
            </div>
        </SidebarPageWrapper>
    );
};

export default ResumeBuilder; 