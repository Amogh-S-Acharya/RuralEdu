import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Users, Star, ExternalLink, Search, Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CourseScrapingService } from "@/services/courseScrapingService";
import { LiveCourseCard } from "@/components/LiveCourseCard";
import { CourseUpdateIndicator } from "@/components/CourseUpdateIndicator";
import { useToast } from "@/components/ui/use-toast";

// Sample course data for fallback
const sampleCourses = [
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
    language: "Hindi & English",
    price: "Free"
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
    language: "Hindi",
    price: "Free"
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
    language: "Hindi",
    price: "₹299"
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
    language: "Hindi & Regional",
    price: "Free"
  },
  {
    id: "mobile-repair",
    title: "Mobile Phone Repair",
    provider: "Skill India",
    duration: "5 weeks",
    students: "3,245",
    rating: 4.5,
    description: "Learn mobile phone hardware and software repair techniques.",
    category: "Technology",
    level: "Intermediate",
    language: "Hindi",
    price: "₹499"
  },
  {
    id: "tailoring",
    title: "Professional Tailoring",
    provider: "NIFT",
    duration: "12 weeks",
    students: "8,756",
    rating: 4.8,
    description: "Complete tailoring course from basics to advanced techniques.",
    category: "Crafts",
    level: "Beginner",
    language: "Hindi & Regional",
    price: "₹799"
  }
];

const AllCourses = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setIsLoading(true);
    try {
      const scrapedCourses = await CourseScrapingService.getAllCourses();
      setCourses(scrapedCourses);
    } catch (error) {
      console.error('Failed to load courses:', error);
      toast({
        title: "Error loading courses",
        description: "Could not fetch latest course data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    await loadCourses();
    setIsUpdating(false);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const categories = [...new Set(courses.map(course => course.category))];
  const levels = [...new Set(courses.map(course => course.level))];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Live Course Directory
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time course data from government and educational platforms
            </p>
          </div>

          <div className="mb-8">
            <CourseUpdateIndicator onUpdate={handleUpdate} isUpdating={isUpdating} />
          </div>

          <Card className="p-6 mb-8 bg-card-gradient border-0 shadow-card">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading live course data...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <LiveCourseCard key={course.id} course={course} onUpdate={handleUpdate} />
              ))}
            </div>
          )}

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllCourses;