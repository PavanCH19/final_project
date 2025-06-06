import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic } from "lucide-react";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function VoiceRecorder({ isRecording, recordingTime, onToggleRecording }) {
  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Voice Response</h3>
        
        <div className="flex flex-col items-center space-y-4">
          <Button
            onClick={onToggleRecording}
            size="lg"
            className={`w-20 h-20 rounded-full transition-all duration-200 ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            <Mic className="h-8 w-8" />
          </Button>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {isRecording ? 'Recording your response...' : 'Click to start recording'}
            </p>
            
            {isRecording && (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-lg font-mono font-semibold text-gray-900">
                  {formatTime(recordingTime)}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {!isRecording && recordingTime === 0 && (
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Record your answer clearly and at a comfortable pace. You can re-record if needed.
          </p>
        )}
      </div>
    </Card>
  );
} 