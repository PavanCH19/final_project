import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

export const ProjectsForm = ({ resumeData, onUpdateResume }) => {
  const [newTech, setNewTech] = useState({});

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
    };

    onUpdateResume({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    });
  };

  const updateProject = (id, field, value) => {
    const updatedProjects = resumeData.projects.map(project =>
      project.id === id ? { ...project, [field]: value } : project
    );

    onUpdateResume({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const removeProject = (id) => {
    const filteredProjects = resumeData.projects.filter(project => project.id !== id);
    onUpdateResume({
      ...resumeData,
      projects: filteredProjects,
    });
  };

  const addTechnology = (projectId) => {
    const tech = newTech[projectId]?.trim();
    if (tech) {
      const project = resumeData.projects.find(p => p.id === projectId);
      if (project && !project.technologies.includes(tech)) {
        updateProject(projectId, 'technologies', [...project.technologies, tech]);
        setNewTech({ ...newTech, [projectId]: '' });
      }
    }
  };

  const removeTechnology = (projectId, tech) => {
    const project = resumeData.projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'technologies', project.technologies.filter(t => t !== tech));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Projects</h3>
        <Button onClick={addProject} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="space-y-4">
        {resumeData.projects.map((project, index) => (
          <Card key={project.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Project {index + 1}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  placeholder="E-commerce Platform"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Project Link (Optional)</Label>
                <Input
                  value={project.link || ''}
                  onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                placeholder="Built a full-stack e-commerce platform with user authentication, payment processing, and inventory management..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Technologies</Label>
              <div className="flex space-x-2 mb-2">
                <Input
                  value={newTech[project.id] || ''}
                  onChange={(e) => setNewTech({ ...newTech, [project.id]: e.target.value })}
                  placeholder="Add technology"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechnology(project.id);
                    }
                  }}
                />
                <Button onClick={() => addTechnology(project.id)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="secondary" className="flex items-center space-x-1">
                    <span>{tech}</span>
                    <button
                      onClick={() => removeTechnology(project.id, tech)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}

        {resumeData.projects.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No projects added yet.</p>
            <p className="text-sm">Click "Add Project" to showcase your work.</p>
          </div>
        )}
      </div>
    </div>
  );
}; 