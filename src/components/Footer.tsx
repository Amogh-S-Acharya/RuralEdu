import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-hero-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">RE</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">RuralEdu Connect</h3>
                <p className="text-sm opacity-80">ಶಿಕ್ಷಣದಿಂದ ಸಬಲೀಕರಣ</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4">
              ಪ್ರವೇಶಿಸಬಹುದಾದ ಶಿಕ್ಷಣ ಮತ್ತು ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಕ್ರಮಗಳ ಮೂಲಕ ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#courses" className="opacity-80 hover:opacity-100 transition-opacity">Free Courses</a></li>
              <li><a href="#guidance" className="opacity-80 hover:opacity-100 transition-opacity">Career Guidance</a></li>
              <li><a href="#voice" className="opacity-80 hover:opacity-100 transition-opacity">Voice Support</a></li>
              <li><a href="#offline" className="opacity-80 hover:opacity-100 transition-opacity">Offline Access</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Government Programs</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://nsdcindia.org" target="_blank" rel="noopener noreferrer" 
                   className="opacity-80 hover:opacity-100 transition-opacity flex items-center">
                  NSDC <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="https://nptel.ac.in" target="_blank" rel="noopener noreferrer"
                   className="opacity-80 hover:opacity-100 transition-opacity flex items-center">
                  NPTEL <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="https://pmkvyofficial.org" target="_blank" rel="noopener noreferrer"
                   className="opacity-80 hover:opacity-100 transition-opacity flex items-center">
                  PMKVY <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="https://swayam.gov.in" target="_blank" rel="noopener noreferrer"
                   className="opacity-80 hover:opacity-100 transition-opacity flex items-center">
                  SWAYAM <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">ಸಂಪರ್ಕ</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center opacity-80">
                <Phone className="w-4 h-4 mr-2" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </div>
              <div className="flex items-center opacity-80">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@ruraledu.gov.in</span>
              </div>
              <div className="flex items-center opacity-80">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Available across India</span>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" size="sm" className="text-foreground border-background/20 hover:bg-background/10">
                SMS Support: 56677
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-background/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <p>© 2024 RuralEdu Connect. A Digital India Initiative.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;