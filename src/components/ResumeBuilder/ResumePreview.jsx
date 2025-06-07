import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

export const ResumePreview = ({ resumeData }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    return (
        <div className="bg-white text-black p-8 shadow-lg min-h-[600px] font-sans">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">
                    {resumeData.personalInfo.fullName || 'Your Name'}
                </h1>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {resumeData.personalInfo.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {resumeData.personalInfo.email}
                        </div>
                    )}
                    {resumeData.personalInfo.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {resumeData.personalInfo.phone}
                        </div>
                    )}
                    {resumeData.personalInfo.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {resumeData.personalInfo.location}
                        </div>
                    )}
                    {resumeData.personalInfo.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="h-4 w-4" />
                            {resumeData.personalInfo.linkedin}
                        </div>
                    )}
                    {resumeData.personalInfo.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            {resumeData.personalInfo.website}
                        </div>
                    )}
                </div>
            </div>

            {/* Professional Summary */}
            {resumeData.summary && (
                <>
                    <Separator className="my-4" />
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2 text-gray-800">PROFESSIONAL SUMMARY</h2>
                        <p className="text-sm leading-relaxed">{resumeData.summary}</p>
                    </div>
                </>
            )}

            {/* Experience */}
            {resumeData.experience.length > 0 && (
                <>
                    <Separator className="my-4" />
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-3 text-gray-800">EXPERIENCE</h2>
                        <div className="space-y-4">
                            {resumeData.experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h3 className="font-semibold">{exp.title}</h3>
                                            <p className="text-gray-600">{exp.company} • {exp.location}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                        </p>
                                    </div>
                                    {exp.description && (
                                        <div className="text-sm mt-2 whitespace-pre-line">
                                            {exp.description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
                <>
                    <Separator className="my-4" />
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-3 text-gray-800">EDUCATION</h2>
                        <div className="space-y-3">
                            {resumeData.education.map((edu) => (
                                <div key={edu.id} className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold">{edu.degree}</h3>
                                        <p className="text-gray-600">{edu.school} • {edu.location}</p>
                                        {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {formatDate(edu.graduationDate)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Skills */}
            {resumeData.skills.length > 0 && (
                <>
                    <Separator className="my-4" />
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-3 text-gray-800">SKILLS</h2>
                        <div className="flex flex-wrap gap-2">
                            {resumeData.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Projects */}
            {resumeData.projects.length > 0 && (
                <>
                    <Separator className="my-4" />
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-3 text-gray-800">PROJECTS</h2>
                        <div className="space-y-4">
                            {resumeData.projects.map((project) => (
                                <div key={project.id}>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-semibold">{project.name}</h3>
                                        {project.link && (
                                            <a href={project.link} className="text-xs text-blue-600 hover:underline">
                                                View Project
                                            </a>
                                        )}
                                    </div>
                                    {project.description && (
                                        <p className="text-sm mb-2">{project.description}</p>
                                    )}
                                    {project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies.map((tech, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}; 