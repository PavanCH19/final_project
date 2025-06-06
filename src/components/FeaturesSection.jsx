import { Card } from "@/components/ui/card";
import { FileText, Users, Star, Check, Calendar, Info } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      title: "Resume-Based Profiling",
      description: "AI analyzes your resume to create personalized interview scenarios matching your experience and target roles."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Domain-Specific Mock Interviews",
      description: "Practice interviews tailored to your field - tech, finance, marketing, healthcare, and 50+ other domains."
    },
    {
      icon: <Info className="w-8 h-8 text-green-500" />,
      title: "Spoken Response Evaluation",
      description: "Advanced speech analysis provides feedback on clarity, pace, confidence, and professional communication."
    },
    {
      icon: <Calendar className="w-8 h-8 text-orange-500" />,
      title: "Progress Dashboard",
      description: "Track your improvement with detailed analytics, performance metrics, and personalized learning paths."
    },
    {
      icon: <Star className="w-8 h-8 text-pink-500" />,
      title: "Gamified Achievements",
      description: "Earn badges, unlock new levels, and stay motivated with our engaging achievement system."
    },
    {
      icon: <Check className="w-8 h-8 text-indigo-500" />,
      title: "Real-Time Feedback",
      description: "Get instant, actionable feedback after each practice session to continuously improve your performance."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-['Poppins']">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Interview Success
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Inter']">
            Everything you need to ace your interviews, from AI-powered mock sessions to detailed performance analytics.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in border-0">
              <div className="mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg w-fit">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-['Poppins']">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-['Inter']">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 