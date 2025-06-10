import { useState, useEffect } from "react";
import { InterviewHeader } from "@/components/interview/InterviewHeader";
import { QuestionDisplay } from "@/components/interview/QuestionDisplay";
import { VoiceRecorder } from "@/components/interview/VoiceRecorder";
import { ProgressTracker } from "@/components/interview/ProgressTracker";
import { InterviewControls } from "@/components/interview/InterviewControls";

const mockQuestions = [
  {
    id: 1,
    text: "Tell me about yourself and your background in software engineering.",
    difficulty: "Easy",
    type: "behavioral"
  },
  {
    id: 2,
    text: "How would you design a URL shortening service like bit.ly?",
    difficulty: "Medium",
    type: "system-design"
  },
  {
    id: 3,
    text: "Implement a function to reverse a linked list iteratively and recursively.",
    difficulty: "Medium",
    type: "coding"
  },
  {
    id: 4,
    text: "Describe a time when you had to work with a difficult team member.",
    difficulty: "Easy",
    type: "behavioral"
  },
  {
    id: 5,
    text: "How would you handle a situation where your code is causing performance issues in production?",
    difficulty: "Hard",
    type: "behavioral"
  },
  {
    id: 6,
    text: "Design a chat application that can handle millions of users.",
    difficulty: "Hard",
    type: "system-design"
  },
  {
    id: 7,
    text: "Write a function to find the longest palindromic substring in a given string.",
    difficulty: "Medium",
    type: "coding"
  },
  {
    id: 8,
    text: "What are your salary expectations and career goals?",
    difficulty: "Easy",
    type: "behavioral"
  },
  {
    id: 9,
    text: "How would you optimize a database query that's running slowly?",
    difficulty: "Hard",
    type: "technical"
  },
  {
    id: 10,
    text: "Do you have any questions for me about the role or company?",
    difficulty: "Easy",
    type: "behavioral"
  }
];

const MockInterview = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [sessionData] = useState({
    domain: "Software Engineer",
    company: "Google",
    totalQuestions: mockQuestions.length
  });

  const currentQuestion = mockQuestions[currentQuestionIndex];

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsRecording(false);
      setRecordingTime(0);
    }
  };

  const handleSkipQuestion = () => {
    handleNextQuestion();
  };

  const handleToggleRecording = () => {
    setIsRecording(prev => !prev);
  };

  const handleHint = () => {
    // TODO: Implement hint functionality
    console.log("Hint requested for question:", currentQuestion.id);
  };

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="w-full lg:w-[calc(100%-2rem)] max-w-[1000px] mx-auto space-y-4 md:space-y-6">
          <InterviewHeader 
            domain={sessionData.domain}
            company={sessionData.company}
          />
          
          <ProgressTracker 
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={sessionData.totalQuestions}
            difficulty={currentQuestion.difficulty}
          />

          <QuestionDisplay 
            question={currentQuestion.text}
            questionNumber={currentQuestionIndex + 1}
            difficulty={currentQuestion.difficulty}
          />

          <VoiceRecorder 
            isRecording={isRecording}
            recordingTime={recordingTime}
            onToggleRecording={handleToggleRecording}
          />

          <InterviewControls 
            onNextQuestion={handleNextQuestion}
            onSkipQuestion={handleSkipQuestion}
            onHint={handleHint}
            isLastQuestion={currentQuestionIndex === mockQuestions.length - 1}
            canProceed={!isRecording}
          />
        </div>
      </main>
    </div>
  );
};

export default MockInterview; 