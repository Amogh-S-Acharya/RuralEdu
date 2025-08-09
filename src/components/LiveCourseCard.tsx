import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, ExternalLink, Calendar, RefreshCw, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LiveCourseCardProps {
  course: {
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
  };
  onUpdate?: () => void;
}

export const LiveCourseCard = ({ course, onUpdate }: LiveCourseCardProps) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleExternalLink = () => {
    window.open(course.link, '_blank', 'noopener,noreferrer');
    
    console.log(`Course link clicked: ${course.title} -> ${course.link}`);
    
    toast({
      title: "Opening course page",
      description: `Redirecting to ${course.provider}`,
    });
  };

  const handleRefresh = async () => {
    setIsUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdate?.();
      toast({
        title: "Course updated",
        description: "Latest information has been fetched",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Could not fetch latest course information",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString || dateString === "Self-paced" || dateString === "Rolling admissions") {
      return dateString || "Flexible";
    }
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const getStatusColor = () => {
    if (!course.isActive) return "bg-gray-500";
    
    const now = new Date();
    const startDate = course.startDate ? new Date(course.startDate) : null;
    const endDate = course.endDate ? new Date(course.endDate) : null;
    
    if (startDate && now < startDate) return "bg-blue-500";
    if (endDate && now > endDate) return "bg-gray-500";
    return "bg-green-500";
  };

  const getStatusText = () => {
    if (!course.isActive) return "Inactive";
    
    const now = new Date();
    const startDate = course.startDate ? new Date(course.startDate) : null;
    const endDate = course.endDate ? new Date(course.endDate) : null;
    
    if (startDate && now < startDate) return "Upcoming";
    if (endDate && now > endDate) return "Ended";
    return "Active";
  };

  return (
    <Card className="p-6 bg-card-gradient border-0 shadow-card hover:shadow-hero transition-all duration-300 group relative">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()} animate-pulse`}></div>
        <span className="text-xs text-muted-foreground">{getStatusText()}</span>
      </div>

      <button
        onClick={handleRefresh}
        disabled={isUpdating}
        className="absolute top-4 left-4 p-1 rounded-full hover:bg-muted/20 transition-colors"
        title="Refresh course data"
      >
        <RefreshCw className={`w-3 h-3 text-muted-foreground ${isUpdating ? 'animate-spin' : ''}`} />
      </button>

      <div className="mt-6">
        <div className="flex items-start justify-between mb-4">
          <Badge variant="secondary" className="text-xs">
            {course.category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
            {course.rating}
          </div>
        </div>
        
        <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2 pr-8">
          {course.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3 h-3 mr-2" />
            {course.duration}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="w-3 h-3 mr-2" />
            {course.students} students
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-2" />
            {formatDate(course.startDate)} - {formatDate(course.endDate)}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Globe className="w-3 h-3 mr-2" />
            {course.language}
          </div>
          <div className="text-xs text-primary font-medium">
            {course.provider}
          </div>
          <div className="text-xs font-semibold text-green-600">
            {course.price}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {course.level}
          </Badge>
          <Button 
            size="sm" 
            onClick={handleExternalLink}
            className="group-hover:scale-105 transition-transform"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Enroll Now
          </Button>
        </div>

        <div className="mt-3 pt-3 border-t border-muted/20">
          <p className="text-xs text-muted-foreground">
            Updated: {new Date(course.lastUpdated).toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </Card>
  );
};