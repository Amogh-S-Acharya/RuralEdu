# RuralEdu Connect

A multilingual rural education platform designed to provide practical skills, career guidance, and digital literacy in local languages.

## 🌟 Features

- 🌍 **Multilingual Support**: Available in Hindi, Kannada, and English
- 🎓 **Course Discovery**: Skill-based courses from NSDC, NPTEL, and government programs
- 💼 **Career Guidance**: AI-powered career advice based on skills and interests
- 🗣️ **Voice Interface**: Voice-powered learning for users with low literacy
- 📱 **Mobile-First**: Responsive design optimized for mobile devices
- 🎨 **Modern UI**: Beautiful, accessible interface with smooth animations
- 🔄 **Live Course Updates**: Real-time course data from government platforms
- 📊 **Course Analytics**: Track progress and completion rates
- 🎯 **Personalized Recommendations**: AI-driven course suggestions

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Context API
- **Routing**: React Router DOM
- **UI Components**: shadcn/ui
- **Language Support**: Custom i18n implementation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Amogh-S-Acharya/RuralEdu.git
   cd RuralEdu
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (shadcn/ui)
│   ├── Header.tsx    # Main navigation header
│   ├── Footer.tsx    # Footer component
│   ├── Navigation.tsx # Mobile navigation
│   ├── HeroSection.tsx # Landing section
│   ├── CourseDiscovery.tsx # Course browsing
│   ├── CareerGuidance.tsx # Career advice interface
│   ├── LiveCourseCard.tsx # Course card component
│   └── CourseUpdateIndicator.tsx # Live update indicator
├── contexts/
│   └── LanguageContext.tsx # Multilingual support
├── pages/
│   ├── Index.tsx     # Home page
│   ├── AllCourses.tsx # Course directory
│   └── CourseDetail.tsx # Individual course page
├── services/
│   └── courseScrapingService.ts # Course data service
├── lib/
│   └── utils.ts      # Utility functions
├── assets/           # Static assets
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## 🌐 Language Support

The application supports three languages:

- **Hindi** (हिंदी) - For Hindi-speaking regions
- **Kannada** (ಕನ್ನಡ) - For Karnataka and surrounding areas
- **English** - For broader accessibility

Language switching is handled through the `LanguageContext` and all text content is internationalized.

## 🎨 Design System

### Colors and Theming

The application uses CSS custom properties for theming. Key design tokens:

```css
:root {
  --primary: 210 100% 45%;        /* Trust-building blue */
  --secondary: 25 95% 53%;        /* Warm approachable orange */
  --accent: 142 70% 45%;          /* Growth-focused green */
  --background: 210 20% 98%;      /* Soft background */
  --foreground: 215 25% 27%;      /* Text color */
}
```

### Components

- **Button**: Multiple variants (default, hero, outline, etc.)
- **Card**: Flexible card component with gradients
- **Badge**: Status indicators and tags
- **Input**: Form inputs with validation
- **Progress**: Progress indicators
- **Toast**: Notification system

## 🔄 Live Course Integration

The platform integrates with multiple government and educational platforms:

- **SWAYAM**: Government's online learning platform
- **NPTEL**: Technical education courses
- **NSDC**: Skill development programs
- **PMKVY**: Pradhan Mantri Kaushal Vikas Yojana
- **Skill India**: National skill development initiative

## 🎯 Key Features Explained

### Course Discovery
- Real-time course data from government platforms
- Advanced filtering by category, level, and language
- Course recommendations based on user preferences

### Career Guidance
- AI-powered career advice system
- Interactive chat interface
- Personalized recommendations based on skills and interests

### Voice Interface
- Voice-powered learning for low-literacy users
- Support for local languages
- Natural language processing for course queries

### Mobile-First Design
- Responsive design optimized for mobile devices
- Touch-friendly interface
- Offline capability with SMS backup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Open an issue on [GitHub](https://github.com/Amogh-S-Acharya/RuralEdu/issues)
- Contact the development team
- Check the [documentation](https://github.com/Amogh-S-Acharya/RuralEdu/wiki)

## 🙏 Acknowledgments

- Built with ❤️ for rural education empowerment
- Inspired by the Digital India initiative
- Designed for accessibility and inclusivity
- Powered by modern web technologies

---

**Empowering rural communities through accessible education and digital literacy**
