import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Cpu, HardDrive, Network, Wifi, Zap } from "lucide-react";

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  trend: "up" | "down" | "stable";
}

export function RealTimeMonitor() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { id: "cpu", name: "CPU Usage", value: 45, unit: "%", status: "normal", trend: "stable" },
    { id: "memory", name: "Memory", value: 67, unit: "%", status: "normal", trend: "up" },
    { id: "network", name: "Network I/O", value: 23, unit: "MB/s", status: "normal", trend: "down" },
    { id: "threats", name: "Active Threats", value: 12, unit: "", status: "warning", trend: "up" },
    { id: "connections", name: "Active Connections", value: 2847, unit: "", status: "normal", trend: "stable" },
    { id: "bandwidth", name: "Bandwidth", value: 78, unit: "%", status: "warning", trend: "up" }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const variation = (Math.random() - 0.5) * 10;
        let newValue = metric.value + variation;
        
        // Keep values within reasonable bounds
        if (metric.id === "cpu" || metric.id === "memory" || metric.id === "bandwidth") {
          newValue = Math.max(0, Math.min(100, newValue));
        } else if (metric.id === "network") {
          newValue = Math.max(0, Math.min(100, newValue));
        } else if (metric.id === "threats") {
          newValue = Math.max(0, Math.min(50, newValue));
        } else if (metric.id === "connections") {
          newValue = Math.max(1000, Math.min(5000, newValue));
        }

        // Determine status based on value
        let status: "normal" | "warning" | "critical" = "normal";
        if (metric.id === "threats") {
          if (newValue > 20) status = "critical";
          else if (newValue > 10) status = "warning";
        } else if (metric.id === "cpu" || metric.id === "memory" || metric.id === "bandwidth") {
          if (newValue > 85) status = "critical";
          else if (newValue > 70) status = "warning";
        }

        // Determine trend
        const trend = newValue > metric.value ? "up" : newValue < metric.value ? "down" : "stable";

        return { ...metric, value: Math.round(newValue), status, trend };
      }));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "critical":
        return "text-cyber-critical border-cyber-critical/40 bg-cyber-critical/10";
      case "warning":
        return "text-cyber-warning border-cyber-warning/40 bg-cyber-warning/10";
      default:
        return "text-cyber-success border-cyber-success/40 bg-cyber-success/10";
    }
  };

  const getIcon = (id: string) => {
    switch(id) {
      case "cpu":
        return <Cpu className="w-4 h-4" />;
      case "memory":
        return <HardDrive className="w-4 h-4" />;
      case "network":
      case "bandwidth":
        return <Network className="w-4 h-4" />;
      case "threats":
        return <Zap className="w-4 h-4" />;
      case "connections":
        return <Wifi className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <Card className="cyber-card monitor-pulse">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Activity className="w-5 h-5" />
          Live System Metrics
          <Badge variant="outline" className="ml-auto text-xs bg-primary/10 text-primary border-primary/30">
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div 
              key={metric.id}
              className="p-3 rounded-lg bg-background/50 border border-border hover:border-primary/30 transition-colors data-stream"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getIcon(metric.id)}
                  <span className="text-sm font-medium text-foreground">{metric.name}</span>
                </div>
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-lg font-mono font-bold text-foreground">
                    {metric.value.toLocaleString()}{metric.unit}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className={`inline-block w-1 h-1 rounded-full ${
                      metric.trend === "up" ? "bg-cyber-critical" :
                      metric.trend === "down" ? "bg-cyber-success" : "bg-primary"
                    }`} />
                    {metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "→"}
                  </div>
                </div>
              </div>
              
              {(metric.id === "cpu" || metric.id === "memory" || metric.id === "bandwidth") && (
                <Progress 
                  value={metric.value} 
                  className="h-1 mt-2"
                  style={{
                    background: "hsl(var(--muted))"
                  }}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full pulse-cyber" />
              <span className="text-sm font-medium text-primary">System Health</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-mono font-bold text-primary">
                {Math.round(metrics.filter(m => m.status === "normal").length / metrics.length * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Operational</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
