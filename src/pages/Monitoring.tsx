import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, MonitorSpeaker, Cpu, HardDrive, Network, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SatelliteMonitor } from '@/components/monitoring/SatelliteMonitor';

const systemMetrics = [
  {
    name: "Main Firewall - FW001",
    type: "Security Appliance",
    status: "online",
    cpu: 67,
    memory: 78,
    network: 45,
    threats: 23,
    location: "Data Center A"
  },
  {
    name: "IDS Sensor - IDS003", 
    type: "Intrusion Detection",
    status: "online",
    cpu: 45,
    memory: 56,
    network: 89,
    threats: 12,
    location: "Network Edge"
  },
  {
    name: "SIEM Server - LOG001",
    type: "Log Management", 
    status: "warning",
    cpu: 89,
    memory: 92,
    network: 67,
    threats: 0,
    location: "Data Center B"
  },
  {
    name: "Endpoint Agent Hub",
    type: "Endpoint Security",
    status: "online", 
    cpu: 34,
    memory: 45,
    network: 78,
    threats: 8,
    location: "Cloud Infrastructure"
  }
];

const liveEvents = [
  {
    time: "14:32:15",
    severity: "high",
    source: "FW001",
    event: "Port scan detected from 192.168.1.45",
    action: "Blocked"
  },
  {
    time: "14:31:42",
    severity: "medium", 
    source: "IDS003",
    event: "Suspicious user agent string detected",
    action: "Investigating"
  },
  {
    time: "14:30:18",
    severity: "low",
    source: "LOG001", 
    event: "Log rotation completed successfully",
    action: "Completed"
  },
  {
    time: "14:29:55",
    severity: "high",
    source: "FW001",
    event: "Multiple failed login attempts detected",
    action: "User locked"
  }
];

export default function Monitoring() {
  const getStatusColor = (status: string) => {
    switch(status) {
      case "online":
        return "bg-cyber-success/20 text-cyber-success border-cyber-success/40";
      case "warning":
        return "bg-cyber-warning/20 text-cyber-warning border-cyber-warning/40";
      case "critical":
        return "bg-cyber-critical/20 text-cyber-critical border-cyber-critical/40";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "high":
        return "bg-cyber-critical/20 text-cyber-critical border-cyber-critical/40";
      case "medium":
        return "bg-cyber-warning/20 text-cyber-warning border-cyber-warning/40";
      case "low":
        return "bg-cyber-success/20 text-cyber-success border-cyber-success/40";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary font-mono">Real-time Monitoring</h1>
          <p className="text-muted-foreground mt-1">
            Live system monitoring and security event tracking
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full pulse-cyber" />
            <span className="text-sm font-mono text-primary">MONITORING</span>
          </div>
          <Button variant="cyber" size="sm">
            <MonitorSpeaker className="w-4 h-4 mr-2" />
            Configure Alerts
          </Button>
        </div>
      </div>

      {/* Enhanced Satellite Monitoring Section */}
      <SatelliteMonitor />

      {/* System Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {systemMetrics.map((system, index) => (
          <Card key={index} className="cyber-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-foreground">{system.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{system.type} • {system.location}</p>
                </div>
                <Badge className={getStatusColor(system.status)}>
                  {system.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* CPU Usage */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">CPU Usage</span>
                    </div>
                    <span className="text-sm font-mono text-foreground">{system.cpu}%</span>
                  </div>
                  <Progress value={system.cpu} className="h-2" />
                </div>

                {/* Memory Usage */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-secondary" />
                      <span className="text-sm text-muted-foreground">Memory Usage</span>
                    </div>
                    <span className="text-sm font-mono text-foreground">{system.memory}%</span>
                  </div>
                  <Progress value={system.memory} className="h-2" />
                </div>

                {/* Network Activity */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4 text-accent" />
                      <span className="text-sm text-muted-foreground">Network Activity</span>
                    </div>
                    <span className="text-sm font-mono text-foreground">{system.network}%</span>
                  </div>
                  <Progress value={system.network} className="h-2" />
                </div>

                {/* Active Threats */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-cyber-warning" />
                    <span className="text-sm text-muted-foreground">Active Threats</span>
                  </div>
                  <span className="text-lg font-mono font-bold text-cyber-warning">
                    {system.threats}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Events Stream */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Activity className="w-5 h-5" />
            Live Security Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {liveEvents.map((event, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg bg-background/50 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="font-mono text-sm text-muted-foreground min-w-[80px]">
                  {event.time}
                </div>
                
                <Badge className={getSeverityColor(event.severity)}>
                  {event.severity.toUpperCase()}
                </Badge>
                
                <div className="font-mono text-sm text-accent min-w-[80px]">
                  {event.source}
                </div>
                
                <div className="flex-1 text-sm text-foreground">
                  {event.event}
                </div>
                
                <Badge variant="outline" className="text-xs">
                  {event.action}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}