import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, ExternalLink, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CourseScrapingService } from "@/services/courseScrapingService";
import { LiveCourseCard } from "@/components/LiveCourseCard";

const courses = [
  {
    id: "digital-marketing",
    title: "Digital Marketing Fundamentals",
    provider: "NSDC Certified",
    duration: "6 weeks",
    students: "12,567",
    rating: 4.8,
    description: "Learn social media marketing, SEO, and digital advertising from industry experts.",
    category: "Business",
    level: "Beginner",
    language: "Hindi & English"
  },
  {
    id: "computer-skills",
    title: "Basic Computer Skills",
    provider: "NPTEL",
    duration: "4 weeks",
    students: "8,921",
    rating: 4.6,
    description: "Master essential computer skills including MS Office, internet usage, and digital literacy.",
    category: "Technology",
    level: "Beginner",
    language: "Hindi"
  },
  {
    id: "organic-farming",
    title: "Organic Farming Techniques",
    provider: "MANAGE",
    duration: "8 weeks",
    students: "5,432",
    rating: 4.9,
    description: "Sustainable farming practices, crop management, and organic certification process.",
    category: "Agriculture",
    level: "Intermediate",
    language: "Hindi"
  },
  {
    id: "financial-literacy",
    title: "Financial Literacy",
    provider: "PMKVY",
    duration: "3 weeks",
    students: "15,678",
    rating: 4.7,
    description: "Banking, loans, insurance, and personal finance management for rural communities.",
    category: "Finance",
    level: "Beginner",
    language: "Hindi & Regional"
  }
];

const CourseDiscovery = () => {
  const { t } = useLanguage();
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedCourses();
  }, []);

  const loadFeaturedCourses = async () => {
    setIsLoading(true);
    try {
      const allCourses = await CourseScrapingService.getAllCourses();
      // Show only first 4 courses as featured
      setCourses(allCourses.slice(0, 4));
    } catch (error) {
      console.error('Error loading courses:', error);
      // Fallback to static courses
      setCourses(courses.slice(0, 4));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-3xl font-bold text-foreground mr-4">
              Live Course Feed
            </h2>
            <button
              onClick={loadFeaturedCourses}
              disabled={isLoading}
              className="p-2 rounded-full hover:bg-muted/20 transition-colors"
              title="Refresh courses"
            >
              <RefreshCw className={`w-5 h-5 text-muted-foreground ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time courses from government and educational platforms
          </p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading live courses...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <LiveCourseCard key={course.id || index} course={course} onUpdate={loadFeaturedCourses} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link to="/courses">
            <Button variant="outline" size="lg">
              {t('viewAllCourses')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourseDiscovery;