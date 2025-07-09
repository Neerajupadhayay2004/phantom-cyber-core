import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wifi, Server, Database, Globe, Shield } from "lucide-react";

const networkNodes = [
  {
    name: "Main Firewall",
    type: "firewall",
    status: "online",
    load: 67,
    connections: 2847,
    icon: Shield
  },
  {
    name: "Web Server Cluster", 
    type: "server",
    status: "online",
    load: 84,
    connections: 1593,
    icon: Server
  },
  {
    name: "Database Primary",
    type: "database", 
    status: "online",
    load: 42,
    connections: 634,
    icon: Database
  },
  {
    name: "External Gateway",
    type: "gateway",
    status: "warning",
    load: 91,
    connections: 3248,
    icon: Globe
  },
  {
    name: "Internal Network",
    type: "network",
    status: "online", 
    load: 56,
    connections: 4721,
    icon: Wifi
  }
];

export function NetworkStatus() {
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

  const getLoadColor = (load: number) => {
    if (load >= 90) return "bg-cyber-critical";
    if (load >= 70) return "bg-cyber-warning";
    return "bg-cyber-success";
  };

  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Wifi className="w-5 h-5" />
          Network Infrastructure Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {networkNodes.map((node, index) => (
            <div key={index} className="p-4 rounded-lg bg-background/50 border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <node.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{node.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">{node.type}</p>
                  </div>
                </div>
                
                <Badge className={getStatusColor(node.status)}>
                  {node.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">CPU Load</span>
                    <span className="text-xs font-mono text-foreground">{node.load}%</span>
                  </div>
                  <Progress 
                    value={node.load} 
                    className="h-2"
                    style={{
                      background: "hsl(var(--muted))"
                    }}
                  />
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Active Connections</div>
                  <div className="text-lg font-mono font-bold text-foreground">
                    {node.connections.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-primary">Network Health Score</h4>
              <p className="text-sm text-muted-foreground">Overall infrastructure status</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold font-mono text-primary">87%</div>
              <div className="text-xs text-muted-foreground">Excellent</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}