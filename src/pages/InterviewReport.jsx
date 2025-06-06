import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Play, Pause, Volume2, TrendingUp, MessageSquare, Lightbulb, BarChart as BarChartIcon } from 'lucide-react';

const InterviewReport = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Mock data for the feedback screen
  const overallScore = 78;
  const categories = [
    { name: 'Confidence', score: 82, color: 'bg-blue-500' },
    { name: 'Clarity', score: 75, color: 'bg-green-500' },
    { name: 'Content Quality', score: 77, color: 'bg-purple-500' }
  ];

  const radarData = [
    { subject: 'Confidence', A: 82, fullMark: 100 },
    { subject: 'Clarity', A: 75, fullMark: 100 },
    { subject: 'Content', A: 77, fullMark: 100 },
    { subject: 'Structure', A: 70, fullMark: 100 },
    { subject: 'Engagement', A: 85, fullMark: 100 },
    { subject: 'Technical Skills', A: 72, fullMark: 100 }
  ];

  const improvementData = [
    { area: 'Filler Words', current: 12, target: 5 },
    { area: 'Pause Duration', current: 3.2, target: 2.0 },
    { area: 'Speech Rate', current: 140, target: 160 },
    { area: 'Eye Contact', current: 65, target: 80 }
  ];

  const fillerWords = [
    { word: 'um', count: 8, timestamp: '0:23' },
    { word: 'uh', count: 4, timestamp: '1:45' },
    { word: 'like', count: 3, timestamp: '2:10' },
    { word: 'you know', count: 2, timestamp: '3:22' }
  ];

  const aiTips = [
    {
      category: 'Grammar',
      tip: 'Consider using more active voice constructions to make your responses more engaging.',
      severity: 'medium'
    },
    {
      category: 'Relevance',
      tip: 'Your STAR method application was excellent. Keep structuring technical answers this way.',
      severity: 'positive'
    },
    {
      category: 'Delivery',
      tip: 'Try to reduce filler words by pausing briefly before answering to collect your thoughts.',
      severity: 'high'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interview Performance Report</h1>
          <p className="text-lg text-gray-600">AI-Powered Insights for Your Technical Interview</p>
        </div>
        <Button variant="outline" className="hover:bg-blue-50">
          <BarChartIcon className="w-4 h-4 mr-2" />
          View All Progress
        </Button>
      </div>

      {/* Overall Score Section */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl text-gray-800">Overall Performance Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center relative overflow-hidden">
                <div 
                  className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-transparent animate-pulse"
                  style={{ 
                    background: `conic-gradient(from 0deg, #3b82f6 ${overallScore * 3.6}deg, transparent ${overallScore * 3.6}deg)`,
                    clipPath: 'circle(50%)'
                  }}
                ></div>
                <span className="text-3xl font-bold text-gray-800 z-10">{overallScore}%</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm font-semibold text-gray-600">{category.score}%</span>
                  </div>
                  <Progress value={category.score} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="speech" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm shadow-md">
          <TabsTrigger value="speech" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            <Volume2 className="w-4 h-4 mr-2" />
            Speech Feedback
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            Content Feedback
          </TabsTrigger>
          <TabsTrigger value="improvement" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <Lightbulb className="w-4 h-4 mr-2" />
            Improvement Suggestions
          </TabsTrigger>
        </TabsList>

        {/* Speech Feedback Tab */}
        <TabsContent value="speech" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Audio Playback */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Volume2 className="w-5 h-5 mr-2 text-blue-500" />
                  Audio Playback & Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:bg-blue-50"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <span className="text-sm text-gray-600">3:45 / 5:23</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">AI Highlights</h4>
                  {fillerWords.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded-md">
                      <span className="text-sm">
                        <Badge variant="secondary" className="mr-2">{item.word}</Badge>
                        {item.count} times
                      </span>
                      <span className="text-xs text-gray-500">{item.timestamp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Speech Analytics */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  Speech Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={improvementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="area" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="#ef4444" name="Current" />
                    <Bar dataKey="target" fill="#22c55e" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Feedback Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Performance Radar</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Performance"
                      dataKey="A"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* AI Tips */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>AI-Generated Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiTips.map((tip, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      tip.severity === 'positive'
                        ? 'bg-green-50 border-green-500'
                        : tip.severity === 'high'
                        ? 'bg-red-50 border-red-500'
                        : 'bg-yellow-50 border-yellow-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{tip.category}</h4>
                      <Badge
                        variant={tip.severity === 'positive' ? 'default' : 'secondary'}
                        className={
                          tip.severity === 'positive'
                            ? 'bg-green-500'
                            : tip.severity === 'high'
                            ? 'bg-red-500'
                            : 'bg-yellow-500'
                        }
                      >
                        {tip.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{tip.tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Improvement Suggestions Tab */}
        <TabsContent value="improvement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add improvement suggestions content here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InterviewReport; 