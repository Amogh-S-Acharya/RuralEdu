import { Button } from "@/components/ui/button";
import { Mic, Volume2, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'hindi' as const, name: 'हिंदी', flag: '🇮🇳' },
    { code: 'kannada' as const, name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'english' as const, name: 'English', flag: '🇬🇧' }
  ];

  const currentLangData = languages.find(lang => lang.code === currentLanguage);

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-hero-gradient rounded-lg flex items-center justify-center shadow-card">
            <span className="text-white font-bold text-lg">RE</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{t('appName')}</h1>
            <p className="text-sm text-muted-foreground">{t('tagline')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative group">
            <Button variant="ghost" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              {currentLangData?.name}
            </Button>
            <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`w-full px-4 py-2 text-left hover:bg-muted transition-colors flex items-center space-x-2 ${
                    currentLanguage === lang.code ? 'bg-muted' : ''
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Volume2 className="w-4 h-4 mr-2" />
            {t('voice')}
          </Button>
          <Button variant="hero" size="sm">
            <Mic className="w-4 h-4 mr-2" />
            {t('speak')}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;