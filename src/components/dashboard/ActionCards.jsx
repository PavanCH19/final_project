import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Star } from "lucide-react";

export function ActionCards() {
  const actions = [
    {
      title: "Take Mock Interview",
      description: "Practice with AI-powered interviews tailored to your profile",
      icon: MessageSquare,
      color: "from-blue-500 to-purple-600",
      action: "Start Interview",
    },
    {
      title: "View Feedback",
      description: "Review detailed feedback from your previous sessions",
      icon: FileText,
      color: "from-green-500 to-teal-600",
      action: "View Reports",
    },
    {
      title: "Career Recommendations",
      description: "Get personalized career advice and job suggestions",
      icon: Star,
      color: "from-orange-500 to-red-600",
      action: "Explore",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">{action.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">
                {action.description}
              </p>
              <Button className="w-full" variant="outline">
                {action.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
} 