import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, X, Lightbulb } from 'lucide-react';

export const SkillsForm = ({ resumeData, onUpdateResume }) => {
  const [newSkill, setNewSkill] = useState('');
  
  const suggestedSkills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java',
    'AWS', 'Docker', 'Git', 'SQL', 'MongoDB', 'Express.js',
    'HTML/CSS', 'REST APIs', 'GraphQL', 'Agile', 'Scrum', 'Jest'
  ];

  const addSkill = (skill) => {
    if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
      onUpdateResume({
        ...resumeData,
        skills: [...resumeData.skills, skill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    onUpdateResume({
      ...resumeData,
      skills: resumeData.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(newSkill);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Add Skills</Label>
        <div className="flex space-x-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a skill and press Enter"
          />
          <Button onClick={() => addSkill(newSkill)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Current Skills */}
      <div className="space-y-2">
        <Label>Your Skills</Label>
        <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border rounded-md bg-muted/20">
          {resumeData.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="flex items-center space-x-1">
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {resumeData.skills.length === 0 && (
            <p className="text-muted-foreground text-sm">No skills added yet</p>
          )}
        </div>
      </div>

      {/* Suggested Skills */}
      <Card className="p-4 bg-muted/50">
        <div className="flex items-center space-x-2 mb-3">
          <Lightbulb className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">Popular Skills</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {suggestedSkills
            .filter(skill => !resumeData.skills.includes(skill))
            .map((skill, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => addSkill(skill)}
                className="text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                {skill}
              </Button>
            ))}
        </div>
      </Card>
    </div>
  );
}; 