import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, Eye, Zap, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const metrics = [
  {
    title: "Active Threats",
    value: "127",
    change: "+15%",
    trend: "up",
    icon: AlertTriangle,
    color: "critical",
    description: "High priority threats detected"
  },
  {
    title: "Security Events",
    value: "1,247",
    change: "+8%",
    trend: "up", 
    icon: Eye,
    color: "warning",
    description: "Events processed today"
  },
  {
    title: "Systems Protected",
    value: "2,847",
    change: "0%",
    trend: "stable",
    icon: Shield,
    color: "success",
    description: "Endpoints under protection"
  },
  {
    title: "Response Time",
    value: "2.3s",
    change: "-12%",
    trend: "down",
    icon: Zap,
    color: "success",
    description: "Average incident response"
  }
];

export function SecurityMetrics() {
  const getColorClasses = (color: string) => {
    switch(color) {
      case "critical":
        return "text-cyber-critical border-cyber-critical/30 bg-cyber-critical/10";
      case "warning":
        return "text-cyber-warning border-cyber-warning/30 bg-cyber-warning/10";
      case "success":
        return "text-cyber-success border-cyber-success/30 bg-cyber-success/10";
      default:
        return "text-primary border-primary/30 bg-primary/10";
    }
  };

  const getTrendIcon = (trend: string, change: string) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-cyber-critical" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-cyber-success" />;
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="cyber-card group hover:scale-105 transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${getColorClasses(metric.color)}`}>
              <metric.icon className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold font-mono tracking-tight text-foreground">
                  {metric.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.description}
                </p>
              </div>
              
              <div className="flex items-center gap-1">
                {getTrendIcon(metric.trend, metric.change)}
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    metric.trend === "up" && metric.title === "Active Threats" 
                      ? "text-cyber-critical border-cyber-critical/30" 
                      : metric.trend === "down" 
                        ? "text-cyber-success border-cyber-success/30"
                        : "text-cyber-warning border-cyber-warning/30"
                  }`}
                >
                  {metric.change}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}