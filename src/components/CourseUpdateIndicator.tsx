import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CourseScrapingService } from "@/services/courseScrapingService";

interface CourseUpdateIndicatorProps {
  onUpdate: () => void;
  isUpdating: boolean;
}

export const CourseUpdateIndicator = ({ onUpdate, isUpdating }: CourseUpdateIndicatorProps) => {
  const { toast } = useToast();
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const updateLastUpdate = () => {
      setLastUpdate(CourseScrapingService.getLastUpdateTime());
    };
    
    updateLastUpdate();
    const interval = setInterval(updateLastUpdate, 60000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (lastUpdate) {
      const updateTimeLeft = () => {
        const nextUpdate = new Date(lastUpdate.getTime() + 6 * 60 * 60 * 1000);
        const now = new Date();
        const diff = Math.max(0, nextUpdate.getTime() - now.getTime());
        setTimeLeft(Math.floor(diff / 1000));
      };

      updateTimeLeft();
      const interval = setInterval(updateTimeLeft, 1000);
      
      return () => clearInterval(interval);
    }
  }, [lastUpdate]);

  const handleForceUpdate = async () => {
    if (!isOnline) {
      toast({
        title: "No internet connection",
        description: "Please check your internet connection and try again",
        variant: "destructive",
      });
      return;
    }

    try {
      await CourseScrapingService.forceUpdate();
      onUpdate();
      toast({
        title: "Courses updated successfully",
        description: "Latest course information has been fetched",
      });
      setLastUpdate(new Date());
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Could not fetch latest course information",
        variant: "destructive",
      });
    }
  };

  const formatTimeLeft = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getTimeSinceUpdate = () => {
    if (!lastUpdate) return "Never";
    
    const now = new Date();
    const diff = now.getTime() - lastUpdate.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Last updated: {getTimeSinceUpdate()}</span>
        </div>
        
        {timeLeft > 0 && (
          <div className="text-xs text-muted-foreground">
            Next auto-update in: {formatTimeLeft(timeLeft)}
          </div>
        )}
      </div>
      
      <Button
        onClick={handleForceUpdate}
        disabled={isUpdating || !isOnline}
        variant="outline"
        size="sm"
        className="ml-4"
      >
        <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
        {isUpdating ? "Updating..." : "Update Now"}
      </Button>
    </div>
  );
};