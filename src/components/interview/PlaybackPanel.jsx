import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Save, Share } from 'lucide-react';

const PlaybackPanel = ({
  videoUrl,
  onSave,
  onShare
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Review Your Response</span>
          <div className="flex space-x-2">
            <Button onClick={onSave} variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button onClick={onShare} variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-black aspect-video rounded-lg overflow-hidden">
          {/* Placeholder for recorded video */}
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="text-center text-white">
              <Play className="w-16 h-16 mx-auto mb-4 opacity-60" />
              <p className="text-lg">Recorded Response</p>
              <p className="text-sm opacity-75">Click play to review</p>
            </div>
          </div>
          
          {/* Play/Pause Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={handlePlayPause}
              className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4"
              size="lg"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Review your response and make notes for improvement
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaybackPanel; 