import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts";
import { TrendingUp } from "lucide-react";

const securityData = [
  { time: "00:00", threats: 45, events: 120, blocked: 38 },
  { time: "04:00", threats: 52, events: 150, blocked: 47 },
  { time: "08:00", threats: 78, events: 200, blocked: 65 },
  { time: "12:00", threats: 95, events: 280, blocked: 82 },
  { time: "16:00", threats: 87, events: 250, blocked: 71 },
  { time: "20:00", threats: 63, events: 180, blocked: 55 },
];

export function SecurityChart() {
  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <TrendingUp className="w-5 h-5" />
          24h Security Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={securityData}>
              <defs>
                <linearGradient id="threatsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--cyber-critical))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--cyber-critical))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="eventsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--cyber-success))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--cyber-success))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                fontFamily="JetBrains Mono"
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                fontFamily="JetBrains Mono"
              />
              <Area
                type="monotone"
                dataKey="threats"
                stroke="hsl(var(--cyber-critical))"
                fillOpacity={1}
                fill="url(#threatsGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="events"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#eventsGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="blocked"
                stroke="hsl(var(--cyber-success))"
                fillOpacity={1}
                fill="url(#blockedGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyber-critical rounded-full" />
            <span className="text-sm text-muted-foreground">Threats Detected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-sm text-muted-foreground">Security Events</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyber-success rounded-full" />
            <span className="text-sm text-muted-foreground">Threats Blocked</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}