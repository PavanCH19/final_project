import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lightbulb, RefreshCw } from 'lucide-react';

export const SummaryForm = ({ resumeData, onUpdateResume }) => {
  const [suggestions] = useState([
    "Results-driven software engineer with 5+ years of experience developing scalable web applications using React, Node.js, and cloud technologies.",
    "Passionate full-stack developer with expertise in modern JavaScript frameworks and a track record of delivering high-quality solutions in agile environments.",
    "Experienced frontend developer specializing in creating intuitive user interfaces and optimizing web performance for enhanced user experience.",
  ]);

  const updateSummary = (value) => {
    onUpdateResume({
      ...resumeData,
      summary: value,
    });
  };

  const applySuggestion = (suggestion) => {
    updateSummary(suggestion);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Write a compelling summary that highlights your key skills, experience, and career objectives..."
          className="min-h-[120px]"
        />
        <p className="text-sm text-muted-foreground">
          2-3 sentences that capture your professional identity and value proposition.
        </p>
      </div>

      <Card className="p-4 bg-muted/50">
        <div className="flex items-center space-x-2 mb-3">
          <Lightbulb className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">AI Suggestions</span>
        </div>

        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="p-3 bg-background rounded border text-sm">
              <p className="mb-2">{suggestion}</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => applySuggestion(suggestion)}
              >
                Use This
              </Button>
            </div>
          ))}
        </div>

        <Button variant="ghost" size="sm" className="mt-3">
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate New Suggestions
        </Button>
      </Card>
    </div>
  );
}; 