import { Card } from "@/components/ui/card";
import { Upload, Users, FileText } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Upload className="w-12 h-12 text-blue-500" />,
      title: "Upload Resume",
      description: "Upload your resume and let our AI analyze your skills, experience, and target roles to create a personalized profile."
    },
    {
      icon: <Users className="w-12 h-12 text-purple-500" />,
      title: "AI Assessment", 
      description: "Our intelligent system evaluates your background and recommends the most relevant interview questions and practice scenarios."
    },
    {
      icon: <FileText className="w-12 h-12 text-green-500" />,
      title: "Personalized Mock Interviews",
      description: "Practice with AI-driven mock interviews tailored to your domain, with real-time feedback and improvement suggestions."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-['Poppins']">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-['Inter']">
            Get interview-ready in just 3 simple steps. Our AI-powered platform adapts to your unique profile and goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="p-8 text-center bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up border-0">
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
                  {step.icon}
                </div>
              </div>
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold mb-4">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 font-['Poppins']">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-['Inter']">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 