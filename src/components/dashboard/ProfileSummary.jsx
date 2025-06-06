import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProfileSummary() {
  const skills = ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"];
  const experience = "3+ years in Full Stack Development";
  const education = "B.S. Computer Science, Stanford University";
  const preferredRoles = ["Frontend Developer", "Full Stack Engineer", "Software Engineer"];

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          📋 Profile Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="bg-blue-100 text-blue-800 hover:bg-blue-200"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Experience</h3>
          <p className="text-gray-700">{experience}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Education</h3>
          <p className="text-gray-700">{education}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Preferred Roles</h3>
          <div className="flex flex-wrap gap-2">
            {preferredRoles.map((role) => (
              <Badge 
                key={role} 
                variant="outline" 
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                {role}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 