import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Video, Camera, Mic } from 'lucide-react';
import { Square } from 'lucide-react';

const VideoRecorder = ({
  isRecording,
  isPaused,
  recordingTime,
  onStartRecording,
  onPauseRecording,
  onStopRecording,
  setRecordingTime
}) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(recordingTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, isPaused, recordingTime, setRecordingTime]);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    initCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Video Display */}
        <div className="relative bg-black aspect-video">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Recording Indicator */}
          {isRecording && !isPaused && (
            <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-medium">REC</span>
            </div>
          )}

          {/* Recording Time */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded">
            {formatTime(recordingTime)}
          </div>

          {/* Camera/Mic Status */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            <div className="bg-green-600 text-white p-2 rounded-full">
              <Camera className="w-4 h-4" />
            </div>
            <div className="bg-green-600 text-white p-2 rounded-full">
              <Mic className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 bg-card">
          <div className="flex justify-center space-x-4">
            {!isRecording ? (
              <Button
                onClick={onStartRecording}
                className="bg-red-600 hover:bg-red-700 text-white px-8"
                size="lg"
              >
                <Video className="w-5 h-5 mr-2" />
                Start Recording
              </Button>
            ) : (
              <>
                <Button
                  onClick={onPauseRecording}
                  variant="outline"
                  size="lg"
                >
                  {isPaused ? (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  )}
                </Button>
                <Button
                  onClick={onStopRecording}
                  variant="destructive"
                  size="lg"
                >
                  <Square className="w-5 h-5 mr-2" />
                  Stop
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoRecorder; 