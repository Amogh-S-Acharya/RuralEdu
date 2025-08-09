import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, Mic, Smartphone, Home } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { icon: Home, label: "ಮನೆ", id: "home" },
    { icon: BookOpen, label: "ಕೋರ್ಸ್", id: "courses" },
    { icon: MessageCircle, label: "ಸಲಹೆ", id: "guidance" },
    { icon: Mic, label: "ಧ್ವನಿ", id: "voice" },
    { icon: Smartphone, label: "ಆಫ್‌ಲೈನ್", id: "offline" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border/50 z-50 md:hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="flex flex-col items-center py-3 px-2 h-auto min-w-[60px]"
              onClick={() => scrollToSection(item.id)}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;