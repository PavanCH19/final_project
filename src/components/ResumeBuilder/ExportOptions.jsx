import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';

export const ExportOptions = ({ isOpen, onClose, resumeData }) => {
    const generatePDF = () => {
        // In a real implementation, you would use a library like jsPDF or puppeteer
        alert('PDF export would be implemented here. This would generate a formatted PDF version of the resume.');
    };

    const generateDOCX = () => {
        // In a real implementation, you would use a library like docx
        alert('DOCX export would be implemented here. This would generate a Word document version of the resume.');
    };

    const copyAsText = () => {
        const textContent = `
${resumeData.personalInfo.fullName}
${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}
${resumeData.personalInfo.location}

PROFESSIONAL SUMMARY
${resumeData.summary}

EXPERIENCE
${resumeData.experience.map(exp => `
${exp.title} - ${exp.company}
${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
${exp.description}
`).join('\n')}

EDUCATION
${resumeData.education.map(edu => `
${edu.degree} - ${edu.school}
${edu.graduationDate}
`).join('\n')}

SKILLS
${resumeData.skills.join(', ')}

PROJECTS
${resumeData.projects.map(project => `
${project.name}
${project.description}
Technologies: ${project.technologies.join(', ')}
`).join('\n')}
    `.trim();

        navigator.clipboard.writeText(textContent);
        alert('Resume copied to clipboard as text!');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        <Download className="h-5 w-5" />
                        <span>Export Resume</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={generatePDF}>
                        <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-red-600" />
                            <div>
                                <h3 className="font-semibold">Export as PDF</h3>
                                <p className="text-sm text-muted-foreground">
                                    Professional format, perfect for applications
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={generateDOCX}>
                        <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-blue-600" />
                            <div>
                                <h3 className="font-semibold">Export as DOCX</h3>
                                <p className="text-sm text-muted-foreground">
                                    Editable Word document format
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={copyAsText}>
                        <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-green-600" />
                            <div>
                                <h3 className="font-semibold">Copy as Text</h3>
                                <p className="text-sm text-muted-foreground">
                                    Plain text format for easy pasting
                                </p>
                            </div>
                        </div>
                    </Card>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}; 