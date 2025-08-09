import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Users, Star, Play, Book, Award, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Sample course data - in real app this would come from API
const getCourseById = (id: string) => {
  const courses = {
    "digital-marketing": {
      title: "Digital Marketing Fundamentals",
      provider: "NSDC Certified",
      duration: "6 weeks",
      students: "12,567",
      rating: 4.8,
      description: "Learn social media marketing, SEO, and digital advertising from industry experts.",
      category: "Business",
      level: "Beginner",
      language: "Hindi & English",
      lessons: 24,
      projects: 3,
      certificate: true,
      modules: [
        { title: "Introduction to Digital Marketing", duration: "2 hours", completed: false },
        { title: "Social Media Marketing", duration: "3 hours", completed: false },
        { title: "Search Engine Optimization", duration: "4 hours", completed: false },
        { title: "Content Marketing", duration: "3 hours", completed: false },
        { title: "Email Marketing", duration: "2 hours", completed: false },
        { title: "Analytics and Reporting", duration: "3 hours", completed: false }
      ]
    },
    "computer-skills": {
      title: "Basic Computer Skills",
      provider: "NPTEL",
      duration: "4 weeks",
      students: "8,921",
      rating: 4.6,
      description: "Master essential computer skills including MS Office, internet usage, and digital literacy.",
      category: "Technology",
      level: "Beginner",
      language: "Hindi",
      lessons: 16,
      projects: 2,
      certificate: true,
      modules: [
        { title: "Computer Basics", duration: "2 hours", completed: false },
        { title: "Microsoft Word", duration: "3 hours", completed: false },
        { title: "Microsoft Excel", duration: "4 hours", completed: false },
        { title: "Internet and Email", duration: "2 hours", completed: false }
      ]
    }
  };
  
  return courses[id as keyof typeof courses];
};

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const course = getCourseById(id || "");

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link to="/">
            <Button>Go back to home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = 0; // Would be calculated based on completed modules

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to courses
            </Link>
          </div>

          {/* Course Header */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Badge variant="secondary" className="mb-4">
                {course.category}
              </Badge>
              
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {course.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{course.students} students</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-2" />
                  <span className="text-sm">{course.rating}</span>
                </div>
                <div className="flex items-center">
                  <Book className="w-4 h-4 mr-2" />
                  <span className="text-sm">{course.lessons} lessons</span>
                </div>
                {course.certificate && (
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    <span className="text-sm">Certificate included</span>
                  </div>
                )}
              </div>
              
              <Badge variant="outline">{course.level}</Badge>
            </div>
            
            {/* Course Info Card */}
            <Card className="p-6 bg-card-gradient border-0 shadow-card h-fit">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Start Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Begin your journey with {course.title}
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              </div>
              
              <Button className="w-full mb-4">
                {progress > 0 ? "Continue Learning" : "Start Course"}
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  By {course.provider}
                </p>
              </div>
            </Card>
          </div>

          {/* Course Modules */}
          <Card className="p-6 bg-card-gradient border-0 shadow-card">
            <h2 className="text-xl font-bold mb-6">Course Content</h2>
            
            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      module.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {module.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-sm">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">{module.duration}</p>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;