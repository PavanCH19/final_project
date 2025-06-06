import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ReadinessScore() {
  const readinessScore = 78;
  
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };
  
  const getProgressColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold">Interview Readiness</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(readinessScore)}`}>
            {readinessScore}%
          </div>
          <p className="text-gray-600 mt-2">Overall Score</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Technical Skills</span>
              <span>85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Communication</span>
              <span>70%</span>
            </div>
            <Progress value={70} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Problem Solving</span>
              <span>80%</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-800">
            Complete 2 more mock interviews to reach 85% readiness!
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 