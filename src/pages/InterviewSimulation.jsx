import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Video, Share, Save, Eye, Mic, Camera } from 'lucide-react';
import { Square } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoRecorder from '@/components/interview/VideoRecorder';
import PlaybackPanel from '@/components/interview/PlaybackPanel';
import InterviewTips from '@/components/interview/InterviewTips';

const InterviewSimulation = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);

    const currentQuestion = "Explain the difference between state and props in React and provide examples of when you would use each.";

    const handleStartRecording = () => {
        setIsRecording(true);
        setIsPaused(false);
    };

    const handlePauseRecording = () => {
        setIsPaused(!isPaused);
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        setIsPaused(false);
        // Simulate recorded video URL
        setRecordedVideo("blob:simulation-video");
    };

    const handleSaveVideo = () => {
        console.log("Saving video...");
        // Implementation would save to backend
    };

    const handleShareVideo = () => {
        console.log("Sharing video...");
        // Implementation would create share link
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Interview Simulation</h1>
                        <p className="text-muted-foreground">Practice and perfect your interview responses</p>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/')}>
                        Back to Dashboard
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Video Recording Area */}
                    <div className="lg:col-span-3">
                        {/* Current Question */}
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Current Question</CardTitle>
                                    <Badge variant="secondary">Frontend Development</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg">{currentQuestion}</p>
                            </CardContent>
                        </Card>

                        {/* Video Recorder */}
                        <VideoRecorder
                            isRecording={isRecording}
                            isPaused={isPaused}
                            recordingTime={recordingTime}
                            onStartRecording={handleStartRecording}
                            onPauseRecording={handlePauseRecording}
                            onStopRecording={handleStopRecording}
                            setRecordingTime={setRecordingTime}
                        />

                        {/* Playback Panel */}
                        {recordedVideo && (
                            <div className="mt-6">
                                <PlaybackPanel
                                    videoUrl={recordedVideo}
                                    onSave={handleSaveVideo}
                                    onShare={handleShareVideo}
                                />
                            </div>
                        )}
                    </div>

                    {/* Tips Sidebar */}
                    <div className="lg:col-span-1">
                        <InterviewTips />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewSimulation; 