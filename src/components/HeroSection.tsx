import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, MessageCircle, Mic, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Rural students learning" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('heroTitle')}
            <span className="block text-primary text-3xl md:text-4xl mt-2">{t('tagline')}</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              <BookOpen className="w-5 h-5 mr-3" />
              {t('startLearning')}
            </Button>
            <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
              <MessageCircle className="w-5 h-5 mr-3" />
              {t('exploreCourses')}
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <Card className="p-6 bg-card-gradient border-0 shadow-card hover:shadow-hero transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">ಉಚಿತ ಕೋರ್ಸ್‌ಗಳು</h3>
              <p className="text-sm text-muted-foreground">NSDC, NPTEL ಮತ್ತು ಸರ್ಕಾರಿ ಕಾರ್ಯಕ್ರಮಗಳು</p>
            </Card>
            
            <Card className="p-6 bg-card-gradient border-0 shadow-card hover:shadow-hero transition-all duration-300">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">AI ಮಾರ್ಗದರ್ಶನ</h3>
              <p className="text-sm text-muted-foreground">ವೃತ್ತಿ ಸಲಹೆ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ</p>
            </Card>
            
            <Card className="p-6 bg-card-gradient border-0 shadow-card hover:shadow-hero transition-all duration-300">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Mic className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">ಧ್ವನಿ ಬೆಂಬಲ</h3>
              <p className="text-sm text-muted-foreground">ಸ್ಥಳೀಯ ಭಾಷೆಯ ಸಂವಾದ</p>
            </Card>
            
            <Card className="p-6 bg-card-gradient border-0 shadow-card hover:shadow-hero transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">ಆಫ್‌ಲೈನ್ ಸಿದ್ಧ</h3>
              <p className="text-sm text-muted-foreground">SMS ಬ್ಯಾಕಪ್ ಮತ್ತು ಆಫ್‌ಲೈನ್ ಪ್ರವೇಶ</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;