import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CourseDiscovery from "@/components/CourseDiscovery";
import CareerGuidance from "@/components/CareerGuidance";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        <section id="courses">
          <CourseDiscovery />
        </section>
        
        <section id="guidance">
          <CareerGuidance />
        </section>
        
        
        <section id="offline" className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Offline Support
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              No internet? No problem! Access courses offline and get support via SMS.
            </p>
            <div className="max-w-md mx-auto space-y-4">
              <div className="p-4 bg-card-gradient rounded-lg shadow-card">
                <h3 className="font-semibold mb-2">SMS Support</h3>
                <p className="text-sm text-muted-foreground">
                  Send SMS to <strong>56677</strong> with keywords like "COURSE", "CAREER", or "HELP"
                </p>
              </div>
              <div className="p-4 bg-card-gradient rounded-lg shadow-card">
                <h3 className="font-semibold mb-2">Offline Content</h3>
                <p className="text-sm text-muted-foreground">
                  Download courses for offline viewing when internet is available
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default Index;
