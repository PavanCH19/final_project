import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Camera, Mic } from 'lucide-react';

const InterviewTips = () => {
  const tips = [
    {
      icon: Eye,
      title: "Eye Contact",
      description: "Look directly at the camera, not the screen. This creates the impression of eye contact with the interviewer."
    },
    {
      icon: Camera,
      title: "Body Language",
      description: "Sit up straight, keep your shoulders back, and use natural hand gestures to emphasize your points."
    },
    {
      icon: Mic,
      title: "Voice & Clarity",
      description: "Speak clearly and at a moderate pace. Pause between thoughts and avoid filler words like 'um' and 'uh'."
    }
  ];

  const presentationTips = [
    "Frame yourself from chest up",
    "Ensure good lighting on your face",
    "Minimize background distractions",
    "Test audio quality beforehand",
    "Practice your key talking points",
    "Keep water nearby but off-camera"
  ];

  return (
    <div className="space-y-6">
      {/* Main Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {tips.map((tip, index) => {
            const IconComponent = tip.icon;
            return (
              <div key={index} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{tip.title}</h3>
                  <p className="text-xs text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Presentation Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Presentation Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {presentationTips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recording Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Session Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Questions Practiced</span>
            <span className="font-medium">0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Recording Time</span>
            <span className="font-medium">00:00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Videos Saved</span>
            <span className="font-medium">0</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewTips; 