import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

export function ProgressTracker({ currentQuestion, totalQuestions }) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Interview Progress</h3>
          <span className="text-sm font-medium text-gray-600">
            {currentQuestion} of {totalQuestions}
          </span>
        </div>
        
        <Progress 
          value={progressPercentage} 
          className="w-full h-2"
        />
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>Started</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
          <span>Finish</span>
        </div>
      </div>
    </Card>
  );
} 