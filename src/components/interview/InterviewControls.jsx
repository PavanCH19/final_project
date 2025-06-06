import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function InterviewControls({ 
  onNextQuestion, 
  onSkipQuestion, 
  onHint, 
  isLastQuestion,
  canProceed 
}) {
  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onHint}
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            💡 Hint
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onSkipQuestion}
            disabled={isLastQuestion}
            className="border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            Skip Question
          </Button>
        </div>
        
        <Button 
          onClick={onNextQuestion}
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          {isLastQuestion ? 'Finish Interview' : 'Next Question'} →
        </Button>
      </div>
      
      {!canProceed && (
        <p className="text-sm text-amber-600 mt-3 text-center">
          ⏳ Please stop recording before proceeding to the next question
        </p>
      )}
    </Card>
  );
} 