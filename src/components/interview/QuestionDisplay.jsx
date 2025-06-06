import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  Hard: "bg-red-100 text-red-800 border-red-200"
};

export function QuestionDisplay({ question, questionNumber, difficulty }) {
  return (
    <Card className="p-8 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">
            Question {questionNumber}
          </h2>
          <Badge className={`${difficultyColors[difficulty]} font-medium`}>
            {difficulty}
          </Badge>
        </div>
        
        <div className="border-l-4 border-blue-500 pl-6 py-4">
          <p className="text-xl leading-relaxed text-gray-900 font-medium">
            {question}
          </p>
        </div>
        
        <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
          💡 Take your time to think through your answer before responding. You can start recording when ready.
        </div>
      </div>
    </Card>
  );
} 