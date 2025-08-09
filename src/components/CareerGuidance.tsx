import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, Mic } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const getWelcomeMessage = (t: (key: string) => string) => {
  const currentLang = t('home'); // This will help us identify the current language
  
  if (currentLang === 'होम') { // Hindi
    return "नमस्कार! मैं आपका करियर सलाहकार हूं। आप मुझसे शिक्षा, रुचियों या करियर के बारे में कोई भी प्रश्न पूछ सकते हैं। मैं आपकी कैसे मदद कर सकता हूं?";
  } else if (currentLang === 'ಮನೆ') { // Kannada
    return "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ವೃತ್ತಿ ಸಲಾಹಗಾರ. ನಿಮ್ಮ ಶಿಕ್ಷಣ, ಆಸಕ್ತಿಗಳು ಅಥವಾ ವೃತ್ತಿಯ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಬಹುದು. ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?";
  } else { // English
    return "Hello! I'm your career counselor. You can ask me any question about education, interests, or career. How can I help you?";
  }
};

const getCommonQuestions = (t: (key: string) => string) => {
  const currentLang = t('home');
  
  if (currentLang === 'होम') { // Hindi
    return [
      "12वीं के बाद क्या करना चाहिए?",
      "कम फीस में अच्छे कोर्स",
      "घर से काम करने के अवसर",
      "कौशल विकास कोर्स",
      "सरकारी नौकरी की तैयारी"
    ];
  } else if (currentLang === 'ಮನೆ') { // Kannada
    return [
      "12ನೇ ತರಗತಿಯ ನಂತರ ಏನು ಮಾಡಬೇಕು?",
      "ಕಡಿಮೆ ಶುಲ್ಕದಲ್ಲಿ ಉತ್ತಮ ಕೋರ್ಸ್‌ಗಳು",
      "ಮನೆಯಿಂದ ಕೆಲಸ ಮಾಡುವ ಅವಕಾಶಗಳು",
      "ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ ಕೋರ್ಸ್‌ಗಳು",
      "ಸರ್ಕಾರಿ ಉದ್ಯೋಗ ಸಿದ್ಧತೆ"
    ];
  } else { // English
    return [
      "What to do after 12th grade?",
      "Good courses with low fees",
      "Work from home opportunities",
      "Skill development courses",
      "Government job preparation"
    ];
  }
};

const generateBotResponse = (userInput: string, t: (key: string) => string): string => {
  const currentLang = t('home');
  
  if (currentLang === 'होम') { // Hindi
    return "यह एक बेहतरीन प्रश्न है! आपकी रुचियों और परिस्थितियों के आधार पर, मैं पहले आपके स्थानीय क्षेत्र में उपलब्ध अवसरों को देखने की सलाह देता हूं। क्या आप अपनी शैक्षणिक पृष्ठभूमि के बारे में बता सकते हैं?";
  } else if (currentLang === 'ಮನೆ') { // Kannada
    return "ಇದು ಅತ್ಯುತ್ತಮ ಪ್ರಶ್ನೆ! ನಿಮ್ಮ ಆಸಕ್ತಿಗಳು ಮತ್ತು ಸನ್ನಿವೇಶಗಳ ಆಧಾರದ ಮೇಲೆ, ಮೊದಲು ನಿಮ್ಮ ಸ್ಥಳೀಯ ಪ್ರದೇಶದಲ್ಲಿ ಲಭ್ಯವಿರುವ ಅವಕಾಶಗಳನ್ನು ನೋಡಲು ಸಲಹೆ ನೀಡುತ್ತೇನೆ. ನಿಮ್ಮ ಶೈಕ್ಷಣಿಕ ಹಿನ್ನೆಲೆಯ ಬಗ್ಗೆ ಹೇಳಬಹುದೇ?";
  } else { // English
    return "That's an excellent question! Based on your interests and circumstances, I suggest first looking at opportunities available in your local area. Can you tell me about your educational background?";
  }
};

const CareerGuidance = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: getWelcomeMessage(t),
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const commonQuestions = getCommonQuestions(t);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        type: "bot",
        content: generateBotResponse(inputMessage, t),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('careerGuidanceTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('careerGuidanceSubtitle')}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card-gradient border-0 shadow-card">
            {/* Chat Interface */}
            <div className="p-6">
              <div className="h-96 overflow-y-auto mb-6 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-primary' : 'bg-accent'
                      }`}>
                        {message.type === 'user' ? 
                          <User className="w-4 h-4 text-white" /> : 
                          <Bot className="w-4 h-4 text-white" />
                        }
                      </div>
                      <div className={`p-4 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-foreground'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick Questions */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3">{t('commonQuestions')}</p>
                <div className="flex flex-wrap gap-2">
                  {commonQuestions.map((question, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Input Area */}
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Textarea 
                    placeholder={t('askQuestion')}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="min-h-[60px] pr-12"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-2 top-2"
                    onClick={handleSendMessage}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="outline" size="lg">
                  <Mic className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CareerGuidance;