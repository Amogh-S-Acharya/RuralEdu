interface ScrapedCourse {
  id: string;
  title: string;
  provider: string;
  duration: string;
  students: string;
  rating: number;
  description: string;
  category: string;
  level: string;
  language: string;
  price: string;
  link: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  lastUpdated: string;
  isActive: boolean;
}

interface ScrapingSource {
  name: string;
  baseUrl: string;
  selectors: {
    courseCard: string;
    title: string;
    provider: string;
    duration: string;
    price: string;
    description: string;
    link: string;
    rating?: string;
    students?: string;
    category?: string;
    level?: string;
    image?: string;
  };
}

const SCRAPING_SOURCES: ScrapingSource[] = [
  {
    name: "SWAYAM",
    baseUrl: "https://swayam.gov.in",
    selectors: {
      courseCard: ".course-card",
      title: ".course-title, h3",
      provider: ".institute-name",
      duration: ".duration",
      price: ".price, .fee",
      description: ".course-description, .summary",
      link: "a",
      rating: ".rating",
      students: ".enrollment-count",
      category: ".category",
      level: ".difficulty, .level",
      image: "img"
    }
  },
  {
    name: "NPTEL",
    baseUrl: "https://nptel.ac.in",
    selectors: {
      courseCard: ".course-item",
      title: ".course-name",
      provider: ".instructor",
      duration: ".weeks",
      price: ".free",
      description: ".course-desc",
      link: "a",
      category: ".subject",
      level: ".level"
    }
  },
  {
    name: "Skill India",
    baseUrl: "https://www.skillindia.gov.in",
    selectors: {
      courseCard: ".course-box",
      title: ".course-title",
      provider: ".provider-name",
      duration: ".duration",
      price: ".cost",
      description: ".description",
      link: "a"
    }
  }
];

export class CourseScrapingService {
  private static courses: ScrapedCourse[] = [];
  private static lastUpdate: Date | null = null;
  private static UPDATE_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours

  static async scrapeCoursesFromMultipleSources(): Promise<ScrapedCourse[]> {
    const allCourses: ScrapedCourse[] = [];
    
    try {
      const mockCourses = await this.getMockLiveCoursesData();
      allCourses.push(...mockCourses);
      
      this.courses = allCourses;
      this.lastUpdate = new Date();
      
      return allCourses;
    } catch (error) {
      console.error('Error scraping courses:', error);
      return this.getBackupCourses();
    }
  }

  static async getMockLiveCoursesData(): Promise<ScrapedCourse[]> {
    return [
      {
        id: "swayam-dm-2024",
        title: "Digital Marketing and Social Media Analytics",
        provider: "IIT Kharagpur via SWAYAM",
        duration: "8 weeks",
        students: "15,234",
        rating: 4.7,
        description: "Comprehensive course on digital marketing strategies, social media analytics, and ROI measurement. Learn from industry experts.",
        category: "Business",
        level: "Intermediate",
        language: "English with Hindi subtitles",
        price: "Free",
        link: "https://swayam.gov.in/nd1_noc20_mg18",
        imageUrl: "/api/placeholder/300/200",
        startDate: "2024-09-01",
        endDate: "2024-10-26",
        lastUpdated: new Date().toISOString(),
        isActive: true
      },
      {
        id: "nptel-python-2024",
        title: "Programming, Data Structures and Algorithms using Python",
        provider: "IIT Madras via NPTEL",
        duration: "12 weeks",
        students: "28,567",
        rating: 4.9,
        description: "Learn Python programming from scratch with data structures and algorithms. Perfect for beginners.",
        category: "Technology",
        level: "Beginner",
        language: "English",
        price: "Free (Certificate: ₹1000)",
        link: "https://nptel.ac.in/courses/106106145",
        startDate: "2024-08-26",
        endDate: "2024-11-15",
        lastUpdated: new Date().toISOString(),
        isActive: true
      },
      {
        id: "skill-india-tailoring",
        title: "Apparel Made-ups & Home Furnishing",
        provider: "Skill India - NSDC",
        duration: "6 months",
        students: "3,456",
        rating: 4.5,
        description: "Complete certification program in tailoring and apparel making. Government recognized qualification.",
        category: "Crafts",
        level: "Beginner",
        language: "Hindi & Regional",
        price: "Free + Stipend",
        link: "https://www.skillindia.gov.in/content/apparel-made-ups-home-furnishing",
        startDate: "Rolling admissions",
        endDate: "Continuous",
        lastUpdated: new Date().toISOString(),
        isActive: true
      },
      {
        id: "pmkvy-beauty-wellness",
        title: "Beauty & Wellness Sector Skill Council",
        provider: "PMKVY 4.0",
        duration: "3 months",
        students: "8,921",
        rating: 4.6,
        description: "Professional beauty and wellness training with job placement assistance. Industry-recognized certification.",
        category: "Health & Beauty",
        level: "Beginner",
        language: "Hindi & English",
        price: "Free + Monetary Reward",
        link: "https://www.pmkvyofficial.org/beauty-wellness",
        startDate: "2024-09-15",
        endDate: "2024-12-15",
        lastUpdated: new Date().toISOString(),
        isActive: true
      },
      {
        id: "manage-organic-farming",
        title: "Organic Farming and Sustainable Agriculture",
        provider: "MANAGE Hyderabad",
        duration: "10 weeks",
        students: "12,345",
        rating: 4.8,
        description: "Learn sustainable farming practices, organic certification, and modern agricultural techniques.",
        category: "Agriculture",
        level: "Intermediate",
        language: "Hindi & Telugu",
        price: "₹500",
        link: "https://manage.gov.in/organic-farming-course",
        startDate: "2024-10-01",
        endDate: "2024-12-10",
        lastUpdated: new Date().toISOString(),
        isActive: true
      },
      {
        id: "udemy-mobile-repair",
        title: "Complete Mobile Phone Repair Course",
        provider: "TechSkills Academy",
        duration: "4 weeks",
        students: "5,678",
        rating: 4.4,
        description: "Hardware and software mobile repair techniques. Hands-on training with real devices.",
        category: "Technology",
        level: "Intermediate",
        language: "Hindi",
        price: "₹999 (50% off)",
        link: "https://www.udemy.com/mobile-repair-hindi",
        startDate: "Self-paced",
        endDate: "Lifetime access",
        lastUpdated: new Date().toISOString(),
        isActive: true
      }
    ];
  }

  static getBackupCourses(): ScrapedCourse[] {
    return [
      {
        id: "backup-digital-marketing",
        title: "Digital Marketing Fundamentals",
        provider: "NSDC Certified",
        duration: "6 weeks",
        students: "12,567",
        rating: 4.8,
        description: "Learn social media marketing, SEO, and digital advertising from industry experts.",
        category: "Business",
        level: "Beginner",
        language: "Hindi & English",
        price: "Free",
        link: "https://example.com/digital-marketing",
        lastUpdated: new Date().toISOString(),
        isActive: true
      }
    ];
  }

  static async getAllCourses(): Promise<ScrapedCourse[]> {
    if (!this.lastUpdate || Date.now() - this.lastUpdate.getTime() > this.UPDATE_INTERVAL) {
      return await this.scrapeCoursesFromMultipleSources();
    }
    return this.courses;
  }

  static async getCourseById(id: string): Promise<ScrapedCourse | null> {
    const courses = await this.getAllCourses();
    return courses.find(course => course.id === id) || null;
  }

  static async getCoursesByCategory(category: string): Promise<ScrapedCourse[]> {
    const courses = await this.getAllCourses();
    return courses.filter(course => course.category.toLowerCase() === category.toLowerCase());
  }

  static async searchCourses(query: string): Promise<ScrapedCourse[]> {
    const courses = await this.getAllCourses();
    const searchTerm = query.toLowerCase();
    return courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.provider.toLowerCase().includes(searchTerm) ||
      course.category.toLowerCase().includes(searchTerm)
    );
  }

  static getLastUpdateTime(): Date | null {
    return this.lastUpdate;
  }

  static async forceUpdate(): Promise<ScrapedCourse[]> {
    this.lastUpdate = null;
    return await this.getAllCourses();
  }
}