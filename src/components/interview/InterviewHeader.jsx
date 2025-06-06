import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export function InterviewHeader({ domain, company }) {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mock Interview Session</h1>
          <p className="text-gray-600">Practice makes perfect - stay focused and confident</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Interview Type</p>
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <span>{domain}</span>
              <span className="text-gray-400">–</span>
              <span className="text-blue-600">{company}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 