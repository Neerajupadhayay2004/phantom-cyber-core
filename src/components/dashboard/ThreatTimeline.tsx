import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Shield, Eye, Clock, MapPin } from "lucide-react";

const threats = [
  {
    id: 1,
    type: "Malware Detection",
    severity: "critical",
    source: "192.168.1.45",
    location: "Server Room A",
    time: "2 minutes ago",
    status: "investigating"
  },
  {
    id: 2,
    type: "Unauthorized Access",
    severity: "high",
    source: "203.45.67.89",
    location: "Web Server",
    time: "8 minutes ago", 
    status: "contained"
  },
  {
    id: 3,
    type: "DDoS Attack",
    severity: "medium",
    source: "Multiple IPs",
    location: "DMZ Network",
    time: "15 minutes ago",
    status: "mitigated"
  },
  {
    id: 4,
    type: "Phishing Attempt",
    severity: "low",
    source: "email.suspicious.com",
    location: "Email Gateway",
    time: "23 minutes ago",
    status: "blocked"
  },
  {
    id: 5,
    type: "Port Scan",
    severity: "medium",
    source: "157.230.45.12",
    location: "Firewall",
    time: "31 minutes ago",
    status: "monitoring"
  }
];

export function ThreatTimeline() {
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "critical":
        return "bg-cyber-critical/20 text-cyber-critical border-cyber-critical/40";
      case "high":
        return "bg-destructive/20 text-destructive border-destructive/40";
      case "medium":
        return "bg-cyber-warning/20 text-cyber-warning border-cyber-warning/40";
      case "low":
        return "bg-cyber-success/20 text-cyber-success border-cyber-success/40";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "investigating":
        return "bg-cyber-warning/20 text-cyber-warning";
      case "contained":
        return "bg-secondary/20 text-secondary";
      case "mitigated":
        return "bg-cyber-success/20 text-cyber-success";
      case "blocked":
        return "bg-cyber-success/20 text-cyber-success";
      case "monitoring":
        return "bg-primary/20 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.includes("Malware")) return AlertTriangle;
    if (type.includes("Access")) return Shield;
    if (type.includes("DDoS")) return Eye;
    return AlertTriangle;
  };

  return (
    <Card className="cyber-card h-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Clock className="w-5 h-5" />
          Real-time Threat Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {threats.map((threat, index) => {
              const TypeIcon = getTypeIcon(threat.type);
              return (
                <div 
                  key={threat.id} 
                  className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border hover:border-primary/30 transition-colors group"
                >
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-lg ${getSeverityColor(threat.severity)}`}>
                      <TypeIcon className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {threat.type}
                      </h4>
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{threat.location}</span>
                      </div>
                      <div className="font-mono text-xs">
                        {threat.source}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {threat.time}
                      </span>
                      <Badge variant="outline" className={getStatusColor(threat.status)}>
                        {threat.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}