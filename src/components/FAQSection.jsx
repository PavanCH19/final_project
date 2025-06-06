import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does the AI interview assessment work?",
      answer: "Our AI analyzes your resume, identifies key skills and experience, then generates personalized interview questions based on your target roles. It evaluates your responses for content, clarity, and confidence, providing detailed feedback for improvement."
    },
    {
      question: "What types of interviews can I practice?",
      answer: "You can practice technical interviews (coding, system design), behavioral interviews, case studies, industry-specific questions, and more. We support 50+ domains including tech, finance, healthcare, marketing, and consulting."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, absolutely. We use enterprise-grade encryption to protect your data. Your resume and practice sessions are stored securely and never shared with third parties. You can delete your data at any time."
    },
    {
      question: "How accurate is the speech evaluation?",
      answer: "Our speech analysis uses advanced AI to evaluate pace, clarity, filler words, and confidence levels with 95%+ accuracy. It provides specific recommendations to improve your verbal communication skills."
    },
    {
      question: "Can I practice for specific companies?",
      answer: "Yes! Our database includes interview formats and question styles from 500+ companies. You can practice company-specific scenarios for Google, Amazon, Microsoft, and many others."
    },
    {
      question: "What's included in the free plan?",
      answer: "The free plan includes 3 practice sessions per month, basic feedback, and access to common interview questions. Upgrade to Pro for unlimited sessions, advanced analytics, and personalized coaching."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-['Poppins']">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-['Inter']">
            Everything you need to know about InterviewAce
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-md border-0 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-800 hover:no-underline hover:bg-gray-50 font-['Poppins']">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed font-['Inter']">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 