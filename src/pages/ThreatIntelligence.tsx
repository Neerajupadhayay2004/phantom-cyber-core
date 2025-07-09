import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Globe, Search, Filter, Download, AlertTriangle } from "lucide-react";

const threatFeeds = [
  {
    name: "MISP Threat Feed",
    status: "active",
    lastUpdate: "2 min ago",
    indicators: 1247,
    confidence: "high"
  },
  {
    name: "Virus Total Intelligence",
    status: "active", 
    lastUpdate: "5 min ago",
    indicators: 834,
    confidence: "high"
  },
  {
    name: "OSINT Collection",
    status: "active",
    lastUpdate: "12 min ago", 
    indicators: 456,
    confidence: "medium"
  },
  {
    name: "Commercial Feed Alpha",
    status: "warning",
    lastUpdate: "1 hour ago",
    indicators: 723,
    confidence: "high"
  }
];

const threats = [
  {
    id: "IOC-2024-001",
    type: "IP Address",
    value: "185.220.101.45",
    threat: "APT29 C2 Server",
    confidence: 95,
    firstSeen: "2024-01-15",
    lastSeen: "2024-01-20",
    tags: ["apt29", "c2", "government"]
  },
  {
    id: "IOC-2024-002", 
    type: "Domain",
    value: "malicious-update.com",
    threat: "Malware Distribution",
    confidence: 87,
    firstSeen: "2024-01-18",
    lastSeen: "2024-01-20",
    tags: ["malware", "phishing", "finance"]
  },
  {
    id: "IOC-2024-003",
    type: "File Hash",
    value: "d41d8cd98f00b204e9800998ecf8427e",
    threat: "Ransomware Payload",
    confidence: 92,
    firstSeen: "2024-01-19",
    lastSeen: "2024-01-20", 
    tags: ["ransomware", "payload", "healthcare"]
  }
];

export default function ThreatIntelligence() {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-cyber-critical";
    if (confidence >= 70) return "text-cyber-warning";
    return "text-cyber-success";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary font-mono">Threat Intelligence</h1>
          <p className="text-muted-foreground mt-1">
            Real-time threat indicators and intelligence feeds
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export IOCs
          </Button>
          <Button variant="cyber" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            New Investigation
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <Card className="cyber-card">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input 
                placeholder="Search threats, IOCs, domains, IPs..."
                className="bg-background/50"
              />
            </div>
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Threat Feeds Status */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Globe className="w-5 h-5" />
            Intelligence Feeds Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {threatFeeds.map((feed, index) => (
              <div key={index} className="p-4 rounded-lg bg-background/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{feed.name}</h4>
                  <Badge 
                    className={
                      feed.status === "active" 
                        ? "bg-cyber-success/20 text-cyber-success border-cyber-success/40"
                        : "bg-cyber-warning/20 text-cyber-warning border-cyber-warning/40"
                    }
                  >
                    {feed.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Update:</span>
                    <span className="text-foreground">{feed.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Indicators:</span>
                    <span className="font-mono text-foreground">{feed.indicators}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className={`font-medium ${
                      feed.confidence === "high" ? "text-cyber-success" : "text-cyber-warning"
                    }`}>
                      {feed.confidence}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Threats */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <AlertTriangle className="w-5 h-5" />
            Active Threat Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {threats.map((threat) => (
              <div key={threat.id} className="p-4 rounded-lg bg-background/50 border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-xs font-mono">
                        {threat.type}
                      </Badge>
                      <span className="font-mono text-sm text-foreground">
                        {threat.value}
                      </span>
                      <Badge className={`${getConfidenceColor(threat.confidence)} border-current/30`}>
                        {threat.confidence}% confidence
                      </Badge>
                    </div>
                    <h4 className="font-medium text-foreground mb-1">{threat.threat}</h4>
                    <div className="flex gap-2">
                      {threat.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right text-sm text-muted-foreground">
                    <div>First: {threat.firstSeen}</div>
                    <div>Last: {threat.lastSeen}</div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Block
                  </Button>
                  <Button variant="cyber" size="sm">
                    Investigate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}