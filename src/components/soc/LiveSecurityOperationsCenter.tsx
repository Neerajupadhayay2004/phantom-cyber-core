import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Play,
  Square,
  Satellite,
  Globe,
  Activity,
  AlertTriangle,
  Shield,
  Download,
  RefreshCw,
  Signal,
  MapPin,
  Clock,
  Database,
  CheckCircle,
  XCircle,
  Zap,
  Eye,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LiveThreat {
  id: string;
  timestamp: Date;
  satellite: string;
  location: string;
  threatType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  sourceIP: string;
  targetIP: string;
  description: string;
  status: 'detected' | 'analyzing' | 'mitigated' | 'blocked';
  coordinates: { lat: number; lng: number };
}

interface SatelliteStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  location: string;
  signalStrength: number;
  threatsDetected: number;
  lastUpdate: Date;
  coverage: string[];
}

interface LiveEvent {
  id: string;
  timestamp: Date;
  type: 'security' | 'system' | 'network' | 'satellite';
  source: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  satellite?: string;
}

export function LiveSecurityOperationsCenter() {
  const { toast } = useToast();
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [liveThreats, setLiveThreats] = useState<LiveThreat[]>([]);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [satellites, setSatellites] = useState<SatelliteStatus[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [threatCount, setThreatCount] = useState({ total: 0, critical: 0, mitigated: 0 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize satellites
  useEffect(() => {
    const initialSatellites: SatelliteStatus[] = [
      {
        id: 'SAT-ALPHA',
        name: 'CyberWatch Alpha',
        status: 'online',
        location: 'North America',
        signalStrength: 98,
        threatsDetected: 0,
        lastUpdate: new Date(),
        coverage: ['US', 'Canada', 'Mexico']
      },
      {
        id: 'SAT-BETA',
        name: 'Guardian Beta',
        status: 'online',
        location: 'Europe',
        signalStrength: 95,
        threatsDetected: 0,
        lastUpdate: new Date(),
        coverage: ['EU', 'UK', 'Russia']
      },
      {
        id: 'SAT-GAMMA',
        name: 'Sentinel Gamma',
        status: 'online',
        location: 'Asia Pacific',
        signalStrength: 92,
        threatsDetected: 0,
        lastUpdate: new Date(),
        coverage: ['China', 'Japan', 'Australia']
      },
      {
        id: 'SAT-DELTA',
        name: 'Phoenix Delta',
        status: 'maintenance',
        location: 'Middle East',
        signalStrength: 78,
        threatsDetected: 0,
        lastUpdate: new Date(),
        coverage: ['UAE', 'Saudi Arabia', 'India']
      }
    ];
    setSatellites(initialSatellites);
  }, []);

  // Live monitoring simulation
  useEffect(() => {
    if (isMonitoring) {
      intervalRef.current = setInterval(() => {
        generateLiveThreat();
        generateLiveEvent();
        updateSatelliteStatus();
      }, Math.random() * 3000 + 2000); // Random interval between 2-5 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMonitoring]);

  const generateLiveThreat = () => {
    const threatTypes = [
      'DDoS Attack',
      'Malware Detection',
      'SQL Injection Attempt',
      'Brute Force Attack',
      'Data Exfiltration',
      'Phishing Campaign',
      'Ransomware Activity',
      'Port Scanning',
      'Unauthorized Access',
      'Crypto Mining'
    ];

    const locations = [
      { name: 'New York, USA', lat: 40.7128, lng: -74.0060 },
      { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
      { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
      { name: 'Moscow, Russia', lat: 55.7558, lng: 37.6173 },
      { name: 'Beijing, China', lat: 39.9042, lng: 116.4074 },
      { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708 }
    ];

    const activeSatellites = satellites.filter(sat => sat.status === 'online');
    if (activeSatellites.length === 0) return;

    const selectedSatellite = activeSatellites[Math.floor(Math.random() * activeSatellites.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)];
    const severity = ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any;

    const newThreat: LiveThreat = {
      id: `THREAT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      satellite: selectedSatellite.name,
      location: location.name,
      threatType,
      severity,
      sourceIP: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      targetIP: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      description: `${threatType} detected from ${location.name} targeting internal systems`,
      status: ['detected', 'analyzing'][Math.floor(Math.random() * 2)] as any,
      coordinates: location
    };

    setLiveThreats(prev => [newThreat, ...prev].slice(0, 100)); // Keep last 100 threats

    // Update satellite threat count
    setSatellites(prev => prev.map(sat => 
      sat.name === selectedSatellite.name 
        ? { ...sat, threatsDetected: sat.threatsDetected + 1, lastUpdate: new Date() }
        : sat
    ));

    // Update threat counts
    setThreatCount(prev => ({
      total: prev.total + 1,
      critical: severity === 'critical' ? prev.critical + 1 : prev.critical,
      mitigated: prev.mitigated + (Math.random() > 0.7 ? 1 : 0)
    }));

    // Auto-mitigate some threats
    setTimeout(() => {
      if (Math.random() > 0.3) {
        setLiveThreats(prev => prev.map(threat => 
          threat.id === newThreat.id 
            ? { ...threat, status: Math.random() > 0.5 ? 'mitigated' : 'blocked' }
            : threat
        ));
      }
    }, Math.random() * 10000 + 5000);
  };

  const generateLiveEvent = () => {
    const eventTypes = [
      { type: 'security' as const, messages: ['Firewall rule updated', 'IDS signature refreshed', 'Access control modified'] },
      { type: 'system' as const, messages: ['System health check completed', 'Log rotation executed', 'Backup verification successful'] },
      { type: 'network' as const, messages: ['Bandwidth spike detected', 'Connection timeout resolved', 'VPN tunnel established'] },
      { type: 'satellite' as const, messages: ['Satellite telemetry received', 'Coverage area updated', 'Signal strength optimized'] }
    ];

    const selectedType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const message = selectedType.messages[Math.floor(Math.random() * selectedType.messages.length)];
    const severity = ['info', 'warning', 'critical'][Math.floor(Math.random() * 3)] as any;

    const newEvent: LiveEvent = {
      id: `EVENT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      type: selectedType.type,
      source: selectedType.type === 'satellite' 
        ? satellites[Math.floor(Math.random() * satellites.length)]?.name || 'Unknown'
        : `${selectedType.type.toUpperCase()}-${Math.floor(Math.random() * 100).toString().padStart(3, '0')}`,
      message,
      severity,
      satellite: selectedType.type === 'satellite' ? satellites[Math.floor(Math.random() * satellites.length)]?.name : undefined
    };

    setLiveEvents(prev => [newEvent, ...prev].slice(0, 50)); // Keep last 50 events
  };

  const updateSatelliteStatus = () => {
    setSatellites(prev => prev.map(sat => ({
      ...sat,
      signalStrength: Math.max(75, Math.min(100, sat.signalStrength + (Math.random() - 0.5) * 5)),
      lastUpdate: new Date()
    })));
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
    setSessionStartTime(new Date());
    setThreatCount({ total: 0, critical: 0, mitigated: 0 });
    
    toast({
      title: "Live SOC Activated",
      description: "Real-time satellite threat monitoring initiated",
    });
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    
    toast({
      title: "Live SOC Deactivated",
      description: "Real-time monitoring has been stopped",
    });
  };

  const generateReport = () => {
    const reportData = {
      session: {
        startTime: sessionStartTime?.toISOString(),
        endTime: new Date().toISOString(),
        duration: sessionStartTime ? Math.floor((Date.now() - sessionStartTime.getTime()) / 1000) : 0,
        monitoringStatus: isMonitoring ? 'active' : 'stopped'
      },
      threats: {
        total: threatCount.total,
        critical: threatCount.critical,
        mitigated: threatCount.mitigated,
        active: liveThreats.filter(t => t.status === 'detected' || t.status === 'analyzing').length,
        details: liveThreats.map(threat => ({
          id: threat.id,
          timestamp: threat.timestamp.toISOString(),
          type: threat.threatType,
          severity: threat.severity,
          location: threat.location,
          satellite: threat.satellite,
          status: threat.status,
          sourceIP: threat.sourceIP,
          targetIP: threat.targetIP
        }))
      },
      satellites: satellites.map(sat => ({
        id: sat.id,
        name: sat.name,
        status: sat.status,
        location: sat.location,
        signalStrength: sat.signalStrength,
        threatsDetected: sat.threatsDetected,
        coverage: sat.coverage,
        lastUpdate: sat.lastUpdate.toISOString()
      })),
      events: liveEvents.map(event => ({
        id: event.id,
        timestamp: event.timestamp.toISOString(),
        type: event.type,
        source: event.source,
        message: event.message,
        severity: event.severity,
        satellite: event.satellite
      })),
      summary: {
        totalSatellites: satellites.length,
        onlineSatellites: satellites.filter(s => s.status === 'online').length,
        averageSignalStrength: Math.round(satellites.reduce((acc, sat) => acc + sat.signalStrength, 0) / satellites.length),
        threatsByType: liveThreats.reduce((acc, threat) => {
          acc[threat.threatType] = (acc[threat.threatType] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        threatsBySeverity: liveThreats.reduce((acc, threat) => {
          acc[threat.severity] = (acc[threat.severity] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `soc-live-report-${new Date().toISOString().split('T')[0]}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Live SOC Report Generated",
      description: "Comprehensive real-time report has been downloaded",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'info': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'offline': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'detected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'analyzing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'mitigated': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'blocked': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Header */}
      <Card className="cyber-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Live Security Operations Center
                {isMonitoring && <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">LIVE</Badge>}
              </CardTitle>
              <CardDescription>
                Real-time satellite-connected threat monitoring and analysis
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                onClick={generateReport}
                variant="outline"
                className="cyber-glow"
                disabled={!sessionStartTime}
              >
                <Download className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button
                onClick={isMonitoring ? stopMonitoring : startMonitoring}
                variant={isMonitoring ? "destructive" : "default"}
                className="cyber-glow"
              >
                {isMonitoring ? (
                  <>
                    <Square className="mr-2 h-4 w-4" />
                    Stop Monitoring
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Live SOC
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        {sessionStartTime && (
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{threatCount.total}</div>
                <div className="text-xs text-muted-foreground">Total Threats</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{threatCount.critical}</div>
                <div className="text-xs text-muted-foreground">Critical</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{threatCount.mitigated}</div>
                <div className="text-xs text-muted-foreground">Mitigated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {satellites.filter(s => s.status === 'online').length}
                </div>
                <div className="text-xs text-muted-foreground">Satellites Online</div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Satellite Status */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Satellite className="h-5 w-5" />
              Satellite Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {satellites.map((satellite) => (
                  <div key={satellite.id} className="border border-border/50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Satellite className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">{satellite.name}</span>
                      </div>
                      <Badge className={getStatusColor(satellite.status)}>
                        {satellite.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Signal</span>
                        <span>{satellite.signalStrength}%</span>
                      </div>
                      <Progress value={satellite.signalStrength} className="h-1" />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Threats</span>
                      <span className="text-red-400">{satellite.threatsDetected}</span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {satellite.location}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {satellite.lastUpdate.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Live Threats */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Live Threats
              {isMonitoring && <RefreshCw className="h-4 w-4 animate-spin text-primary" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {liveThreats.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No threats detected</p>
                    <p className="text-xs">Start monitoring to see live threats</p>
                  </div>
                ) : (
                  liveThreats.map((threat) => (
                    <div key={threat.id} className="border border-border/50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {threat.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{threat.threatType}</div>
                        <div className="text-xs text-muted-foreground">
                          From: {threat.sourceIP} → {threat.targetIP}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Location: {threat.location}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Satellite: {threat.satellite}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(threat.status)}>
                          {threat.status}
                        </Badge>
                        {threat.status === 'mitigated' && (
                          <CheckCircle className="h-3 w-3 text-green-400" />
                        )}
                        {threat.status === 'blocked' && (
                          <XCircle className="h-3 w-3 text-blue-400" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Live Events */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Live Events
              {isMonitoring && <Zap className="h-4 w-4 animate-pulse text-yellow-400" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {liveEvents.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No events logged</p>
                    <p className="text-xs">Start monitoring to see live events</p>
                  </div>
                ) : (
                  liveEvents.map((event) => (
                    <div key={event.id} className="border border-border/50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={`text-xs ${
                          event.type === 'security' ? 'border-red-500/30 text-red-400' :
                          event.type === 'satellite' ? 'border-blue-500/30 text-blue-400' :
                          event.type === 'network' ? 'border-green-500/30 text-green-400' :
                          'border-yellow-500/30 text-yellow-400'
                        }`}>
                          {event.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {event.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">
                          Source: {event.source}
                        </div>
                        <div className="text-sm">{event.message}</div>
                        {event.satellite && (
                          <div className="text-xs text-muted-foreground">
                            Via: {event.satellite}
                          </div>
                        )}
                      </div>
                      
                      <Badge className={getSeverityColor(event.severity)}>
                        {event.severity}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}