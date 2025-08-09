import React, { createContext, useContext, useState } from 'react';

export type Language = 'hindi' | 'kannada' | 'english';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  hindi: {
    appName: 'RuralEdu Connect',
    tagline: 'शिक्षा से सशक्तिकरण',
    voice: 'आवाज़',
    speak: 'बोलें',
    heroTitle: 'ग्रामीण शिक्षा से सशक्तिकरण',
    heroSubtitle: 'व्यावहारिक कौशल, व्यावसायिक मार्गदर्शन, और आपकी स्थानीय भाषा में डिजिटल साक्षरता',
    startLearning: 'सीखना शुरू करें',
    exploreCourses: 'कोर्स खोजें',
    courseDiscoveryTitle: 'कौशल आधारित कोर्स खोजें',
    courseDiscoverySubtitle: 'व्यावहारिक कौशल सीखें जो तुरंत आय बढ़ा सकें',
    careerGuidanceTitle: 'व्यावसायिक मार्गदर्शन',
    careerGuidanceSubtitle: 'अपने कौशल के आधार पर सही करियर पथ खोजें',
    register: 'पंजीकरण करें',
    viewAllCourses: 'सभी कोर्स देखें',
    commonQuestions: 'सामान्य प्रश्न:',
    askQuestion: 'अपना प्रश्न यहाँ लिखें...',
    home: 'होम',
    courses: 'कोर्स',
    guidance: 'मार्गदर्शन',
    contact: 'संपर्क',
    aboutUs: 'हमारे बारे में',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा की शर्तें'
  },
  kannada: {
    appName: 'RuralEdu Connect',
    tagline: 'ಶಿಕ್ಷಣದಿಂದ ಸಬಲೀಕರಣ',
    voice: 'ಧ್ವನಿ',
    speak: 'ಮಾತನಾಡಿ',
    heroTitle: 'ಗ್ರಾಮೀಣ ಶಿಕ್ಷಣದಿಂದ ಸಬಲೀಕರಣ',
    heroSubtitle: 'ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯಗಳು, ವೃತ್ತಿಪರ ಮಾರ್ಗದರ್ಶನ, ಮತ್ತು ನಿಮ್ಮ ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆ',
    startLearning: 'ಕಲಿಕೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ',
    exploreCourses: 'ಕೋರ್ಸ್‌ಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    courseDiscoveryTitle: 'ಕೌಶಲ್ಯ ಆಧಾರಿತ ಕೋರ್ಸ್‌ಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ',
    courseDiscoverySubtitle: 'ತಕ್ಷಣ ಆದಾಯ ಹೆಚ್ಚಿಸಬಹುದಾದ ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯಗಳನ್ನು ಕಲಿಯಿರಿ',
    careerGuidanceTitle: 'ವೃತ್ತಿಪರ ಮಾರ್ಗದರ್ಶನ',
    careerGuidanceSubtitle: 'ನಿಮ್ಮ ಕೌಶಲ್ಯಗಳ ಆಧಾರದ ಮೇಲೆ ಸರಿಯಾದ ವೃತ್ತಿ ಮಾರ್ಗವನ್ನು ಕಂಡುಕೊಳ್ಳಿ',
    register: 'ನೋಂದಣಿ ಮಾಡಿ',
    viewAllCourses: 'ಎಲ್ಲಾ ಕೋರ್ಸ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    commonQuestions: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು:',
    askQuestion: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...',
    home: 'ಮನೆ',
    courses: 'ಕೋರ್ಸ್‌ಗಳು',
    guidance: 'ಮಾರ್ಗದರ್ಶನ',
    contact: 'ಸಂಪರ್ಕ',
    aboutUs: 'ನಮ್ಮ ಬಗ್ಗೆ',
    privacyPolicy: 'ಗೌಪ್ಯತೆ ನೀತಿ',
    termsOfService: 'ಸೇವಾ ನಿಯಮಗಳು'
  },
  english: {
    appName: 'RuralEdu Connect',
    tagline: 'Empowerment through Education',
    voice: 'Voice',
    speak: 'Speak',
    heroTitle: 'Rural Empowerment Through Education',
    heroSubtitle: 'Practical skills, career guidance, and digital literacy in your local language',
    startLearning: 'Start Learning',
    exploreCourses: 'Explore Courses',
    courseDiscoveryTitle: 'Discover Skill-Based Courses',
    courseDiscoverySubtitle: 'Learn practical skills that can immediately boost your income',
    careerGuidanceTitle: 'Career Guidance',
    careerGuidanceSubtitle: 'Find the right career path based on your skills and interests',
    register: 'Register',
    viewAllCourses: 'View All Courses',
    commonQuestions: 'Common Questions:',
    askQuestion: 'Type your question here...',
    home: 'Home',
    courses: 'Courses',
    guidance: 'Guidance',
    contact: 'Contact',
    aboutUs: 'About Us',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('kannada');

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations[typeof currentLanguage]] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};