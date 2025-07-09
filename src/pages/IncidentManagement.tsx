import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Clock, User, Search, Plus, Filter } from "lucide-react";

const incidents = [
  {
    id: "INC-2024-001",
    title: "Advanced Persistent Threat Detected",
    severity: "critical",
    status: "investigating",
    assignee: "Alex Chen",
    created: "2024-01-20 14:30",
    updated: "2024-01-20 15:45",
    description: "Suspicious lateral movement detected across multiple endpoints",
    affectedSystems: 12,
    timeline: [
      { time: "14:30", action: "Incident created", user: "System" },
      { time: "14:35", action: "Assigned to Alex Chen", user: "SOC Manager" },
      { time: "15:20", action: "Containment initiated", user: "Alex Chen" },
      { time: "15:45", action: "Additional systems isolated", user: "Alex Chen" }
    ]
  },
  {
    id: "INC-2024-002", 
    title: "Phishing Campaign Targeting Executives",
    severity: "high",
    status: "contained",
    assignee: "Sarah Kumar",
    created: "2024-01-20 09:15",
    updated: "2024-01-20 12:30",
    description: "Targeted phishing emails sent to C-level executives",
    affectedSystems: 5,
    timeline: [
      { time: "09:15", action: "Incident created", user: "Email Security" },
      { time: "09:20", action: "Assigned to Sarah Kumar", user: "SOC Manager" },
      { time: "10:45", action: "Emails quarantined", user: "Sarah Kumar" },
      { time: "12:30", action: "Incident contained", user: "Sarah Kumar" }
    ]
  },
  {
    id: "INC-2024-003",
    title: "Suspicious Network Traffic Spike", 
    severity: "medium",
    status: "resolved",
    assignee: "Mike Rodriguez",
    created: "2024-01-19 16:20",
    updated: "2024-01-20 08:15",
    description: "Unusual traffic patterns detected on internal network",
    affectedSystems: 3,
    timeline: [
      { time: "16:20", action: "Incident created", user: "Network Monitoring" },
      { time: "16:25", action: "Assigned to Mike Rodriguez", user: "SOC Manager" },
      { time: "18:40", action: "Root cause identified", user: "Mike Rodriguez" },
      { time: "08:15", action: "Incident resolved", user: "Mike Rodriguez" }
    ]
  }
];

export default function IncidentManagement() {
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
        return "bg-cyber-warning/20 text-cyber-warning border-cyber-warning/40";
      case "contained":
        return "bg-secondary/20 text-secondary border-secondary/40";
      case "resolved":
        return "bg-cyber-success/20 text-cyber-success border-cyber-success/40";
      case "closed":
        return "bg-muted/20 text-muted-foreground border-muted/40";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary font-mono">Incident Management</h1>
          <p className="text-muted-foreground mt-1">
            Security incident tracking and response coordination
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="cyber" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Incident
          </Button>
        </div>
      </div>

      {/* Search and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="cyber-card">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input 
                    placeholder="Search incidents by ID, title, assignee..."
                    className="bg-background/50"
                  />
                </div>
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="cyber-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-cyber-critical">3</div>
              <div className="text-sm text-muted-foreground">Active Incidents</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Incidents List */}
      <div className="space-y-6">
        {incidents.map((incident) => (
          <Card key={incident.id} className="cyber-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {incident.id}
                    </Badge>
                    <Badge className={getSeverityColor(incident.severity)}>
                      {incident.severity.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(incident.status)}>
                      {incident.status.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground mb-2">
                    {incident.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {incident.description}
                  </p>
                </div>
                
                <div className="text-right text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <User className="w-3 h-3" />
                    <span>{incident.assignee}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created: {incident.created}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated: {incident.updated}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Incident Details */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Incident Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Affected Systems:</span>
                      <span className="font-mono text-foreground">{incident.affectedSystems}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Severity:</span>
                      <Badge className={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Timeline */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    {incident.timeline.slice(-3).map((entry, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground min-w-[50px]">
                          <Clock className="w-3 h-3" />
                          <span className="font-mono text-xs">{entry.time}</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-foreground">{entry.action}</span>
                          <span className="text-muted-foreground"> by {entry.user}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="cyber" size="sm">
                  Update Status
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}