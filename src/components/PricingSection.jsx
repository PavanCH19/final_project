import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "3 practice sessions per month",
        "Basic AI feedback",
        "Common interview questions",
        "Progress tracking",
        "Email support"
      ],
      popular: false,
      cta: "Start Free"
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Everything you need to ace interviews",
      features: [
        "Unlimited practice sessions",
        "Advanced AI feedback & analytics",
        "Company-specific scenarios",
        "Speech evaluation & coaching",
        "Resume optimization tips",
        "Priority support",
        "Achievement badges",
        "Interview scheduling assistant"
      ],
      popular: true,
      cta: "Start Pro Trial"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-['Poppins']">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-['Inter']">
            Start for free, upgrade when you're ready to accelerate your interview success
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-8 relative transition-all duration-300 transform hover:-translate-y-2 border-0 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl scale-105' 
                  : 'bg-white shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 font-['Poppins']">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-600 ml-1">/{plan.period}</span>
                </div>
                <p className="text-gray-600 font-['Inter']">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-['Inter']">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-3 text-lg font-semibold rounded-full transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-900 text-white'
                }`}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 font-['Inter']">
            ✓ No credit card required for free plan  ✓ Cancel anytime  ✓ 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 