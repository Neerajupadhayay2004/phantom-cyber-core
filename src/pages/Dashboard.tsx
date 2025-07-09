import { SecurityMetrics } from "@/components/dashboard/SecurityMetrics";
import { ThreatTimeline } from "@/components/dashboard/ThreatTimeline";
import { SecurityChart } from "@/components/dashboard/SecurityChart";
import { NetworkStatus } from "@/components/dashboard/NetworkStatus";
import { RealTimeMonitor } from "@/components/dashboard/RealTimeMonitor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Download, 
  Settings, 
  AlertTriangle,
  Shield,
  Eye,
  Globe,
  Activity
} from "lucide-react";

const quickActions = [
  { 
    title: "Generate Security Report",
    description: "Create comprehensive security analysis",
    icon: Download,
    variant: "cyber" as const,
    action: "report"
  },
  {
    title: "Emergency Lockdown", 
    description: "Activate security protocols",
    icon: Shield,
    variant: "critical" as const,
    action: "lockdown"
  },
  {
    title: "Scan All Systems",
    description: "Full infrastructure scan",
    icon: Eye, 
    variant: "warning" as const,
    action: "scan"
  },
  {
    title: "Update Threat Intel",
    description: "Refresh threat databases",
    icon: RefreshCw,
    variant: "success" as const,
    action: "update"
  }
];

const recentAlerts = [
  {
    id: 1,
    title: "Suspicious Login Activity",
    time: "5 min ago",
    severity: "high",
    source: "192.168.1.45"
  },
  {
    id: 2, 
    title: "Malware Signature Updated",
    time: "12 min ago",
    severity: "info",
    source: "Threat Intel Feed"
  },
  {
    id: 3,
    title: "Firewall Rule Triggered",
    time: "18 min ago", 
    severity: "medium",
    source: "Main Firewall"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary font-mono">Security Operations Center</h1>
          <p className="text-muted-foreground mt-1">
            Real-time cybersecurity monitoring and threat management
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            <Activity className="w-3 h-3 mr-1" />
            Live Monitoring
          </Badge>
          <Button variant="outline" size="sm" className="hover:bg-primary/10">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Security Metrics */}
      <SecurityMetrics />

      {/* Real-time Monitoring */}
      <RealTimeMonitor />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          <SecurityChart />
          
          {/* Quick Actions */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-primary">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Button 
                    key={index}
                    variant={action.variant}
                    className="h-auto p-4 flex-col items-start gap-2 hover:scale-105 transition-transform"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <action.icon className="w-5 h-5" />
                      <span className="font-medium">{action.title}</span>
                    </div>
                    <span className="text-xs opacity-80 text-left">
                      {action.description}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Status & Alerts */}
        <div className="space-y-6">
          <NetworkStatus />
          
          {/* Recent Alerts */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <AlertTriangle className="w-5 h-5" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className="p-3 rounded-lg bg-background/50 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground">
                          {alert.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {alert.source}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant="outline" 
                          className={
                            alert.severity === "high" 
                              ? "text-cyber-critical border-cyber-critical/30"
                              : alert.severity === "medium"
                                ? "text-cyber-warning border-cyber-warning/30"
                                : "text-primary border-primary/30"
                          }
                        >
                          {alert.severity}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Timeline */}
      <ThreatTimeline />
    </div>
  );
}