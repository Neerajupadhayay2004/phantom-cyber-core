import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  X, 
  AlertTriangle, 
  Shield, 
  Eye, 
  CheckCircle,
  Clock,
  Trash2
} from "lucide-react";

interface Notification {
  id: string;
  type: "critical" | "warning" | "info" | "success";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "critical",
    title: "Critical Security Breach",
    message: "Unauthorized access detected on server DB-001. Immediate action required.",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    read: false,
    actionRequired: true
  },
  {
    id: "2", 
    type: "warning",
    title: "Elevated Threat Level",
    message: "Multiple failed login attempts detected from IP 192.168.1.45",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    read: false,
    actionRequired: true
  },
  {
    id: "3",
    type: "info",
    title: "System Update Available",
    message: "Security patch update available for firewall firmware v2.1.3",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: true,
    actionRequired: false
  },
  {
    id: "4",
    type: "success",
    title: "Threat Mitigated",
    message: "DDoS attack successfully blocked and traffic normalized",
    timestamp: new Date(Date.now() - 32 * 60 * 1000),
    read: true,
    actionRequired: false
  },
  {
    id: "5",
    type: "warning",
    title: "Resource Usage Alert",
    message: "CPU usage on SIEM server exceeds 85% threshold",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    read: false,
    actionRequired: true
  }
];

export function NotificationCenter({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "critical">("all");

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: Math.random() > 0.7 ? "critical" : Math.random() > 0.4 ? "warning" : "info",
        title: "New Security Event",
        message: `Automated security scan detected ${Math.floor(Math.random() * 10)} potential threats`,
        timestamp: new Date(),
        read: false,
        actionRequired: Math.random() > 0.5
      };
      
      setNotifications(prev => [newNotification, ...prev].slice(0, 20));
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-cyber-critical" />;
      case "warning":
        return <Eye className="w-4 h-4 text-cyber-warning" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-cyber-success" />;
      default:
        return <Shield className="w-4 h-4 text-primary" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case "critical":
        return "border-cyber-critical/40 bg-cyber-critical/10";
      case "warning":
        return "border-cyber-warning/40 bg-cyber-warning/10";
      case "success":
        return "border-cyber-success/40 bg-cyber-success/10";
      default:
        return "border-primary/40 bg-primary/10";
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    switch(filter) {
      case "unread":
        return !notif.read;
      case "critical":
        return notif.type === "critical";
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-end p-4">
      <Card className="w-full max-w-md h-[80vh] cyber-card animate-fade-in">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <Badge className="bg-cyber-critical text-cyber-critical-foreground">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-2 mt-3">
            <Button 
              variant={filter === "all" ? "cyber" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={filter === "unread" ? "cyber" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
            >
              Unread ({unreadCount})
            </Button>
            <Button 
              variant={filter === "critical" ? "cyber" : "outline"}
              size="sm"
              onClick={() => setFilter("critical")}
            >
              Critical
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-3 rounded-lg border transition-colors hover:border-primary/30 ${
                  getTypeColor(notification.type)
                } ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getTypeIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-foreground text-sm">
                        {notification.title}
                      </h4>
                      {notification.actionRequired && (
                        <Badge variant="outline" className="text-xs ml-2">
                          Action Required
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatTime(notification.timestamp)}
                      </div>
                      
                      <div className="flex gap-1">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark Read
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-6 w-6 p-0 hover:text-destructive"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-border">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
          >
            Mark All as Read
          </Button>
        </div>
      </Card>
    </div>
  );
}