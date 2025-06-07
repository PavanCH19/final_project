import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PersonalInfoForm } from '@/components/ResumeBuilder/PersonalInfoForm';
import { SummaryForm } from '@/components/ResumeBuilder/SummaryForm';
import { ExperienceForm } from '@/components/ResumeBuilder/ExperienceForm';
import { EducationForm } from '@/components/ResumeBuilder/EducationForm';
import { SkillsForm } from '@/components/ResumeBuilder/SkillsForm';
import { ProjectsForm } from '@/components/ResumeBuilder/ProjectsForm';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
    { id: 'personal', title: 'Personal Information', component: PersonalInfoForm },
    { id: 'summary', title: 'Professional Summary', component: SummaryForm },
    { id: 'experience', title: 'Work Experience', component: ExperienceForm },
    { id: 'education', title: 'Education', component: EducationForm },
    { id: 'skills', title: 'Skills', component: SkillsForm },
    { id: 'projects', title: 'Projects', component: ProjectsForm },
];

export const ResumeWizard = ({ resumeData, onUpdateResume }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const progress = ((currentStep + 1) / steps.length) * 100;
    const CurrentStepComponent = steps[currentStep].component;

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="space-y-6">
            {/* Progress Header */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
                    <span className="text-sm text-muted-foreground">
                        Step {currentStep + 1} of {steps.length}
                    </span>
                </div>
                <Progress value={progress} className="w-full" />
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
                <CurrentStepComponent
                    resumeData={resumeData}
                    onUpdateResume={onUpdateResume}
                />
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4 border-t">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                </Button>

                <Button
                    onClick={handleNext}
                    disabled={currentStep === steps.length - 1}
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}; 