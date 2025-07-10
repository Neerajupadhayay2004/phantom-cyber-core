import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Satellite, 
  Globe, 
  Signal, 
  Download, 
  RefreshCw, 
  MapPin, 
  Wifi,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SatelliteData {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  altitude: number;
  speed: number;
  status: 'operational' | 'maintenance' | 'offline';
  signalStrength: number;
  lastUpdate: string;
  dataPoints: number;
  coverage: string[];
}

interface ThreatData {
  id: string;
  timestamp: string;
  satellite: string;
  threat_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  details: string;
  status: string;
}

export function SatelliteMonitor() {
  const { toast } = useToast();
  const [satellites, setSatellites] = useState<SatelliteData[]>([]);
  const [threatData, setThreatData] = useState<ThreatData[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock satellite data
  useEffect(() => {
    const mockSatellites: SatelliteData[] = [
      {
        id: 'SAT-001',
        name: 'CyberWatch Alpha',
        location: { lat: 40.7128, lng: -74.0060 },
        altitude: 550,
        speed: 7.66,
        status: 'operational',
        signalStrength: 98,
        lastUpdate: new Date().toISOString(),
        dataPoints: 24567,
        coverage: ['North America', 'Atlantic Ocean']
      },
      {
        id: 'SAT-002',
        name: 'Guardian Beta',
        location: { lat: 35.6762, lng: 139.6503 },
        altitude: 580,
        speed: 7.58,
        status: 'operational',
        signalStrength: 95,
        lastUpdate: new Date().toISOString(),
        dataPoints: 18932,
        coverage: ['Asia Pacific', 'Pacific Ocean']
      },
      {
        id: 'SAT-003',
        name: 'Sentinel Gamma',
        location: { lat: 51.5074, lng: -0.1278 },
        altitude: 600,
        speed: 7.50,
        status: 'maintenance',
        signalStrength: 72,
        lastUpdate: new Date(Date.now() - 300000).toISOString(),
        dataPoints: 15643,
        coverage: ['Europe', 'Middle East', 'Africa']
      }
    ];

    setSatellites(mockSatellites);
    generateThreatData();
    
    const interval = setInterval(() => {
      if (isMonitoring) {
        updateSatelliteData();
        generateThreatData();
        setLastUpdate(new Date());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const updateSatelliteData = () => {
    setSatellites(prev => prev.map(sat => ({
      ...sat,
      signalStrength: Math.max(70, Math.min(100, sat.signalStrength + (Math.random() - 0.5) * 10)),
      dataPoints: sat.dataPoints + Math.floor(Math.random() * 50),
      lastUpdate: new Date().toISOString()
    })));
  };

  const generateThreatData = () => {
    const newThreats: ThreatData[] = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
      id: `THREAT-${Date.now()}-${i}`,
      timestamp: new Date().toISOString(),
      satellite: satellites[Math.floor(Math.random() * satellites.length)]?.name || 'Unknown',
      threat_type: ['DDoS Attack', 'Malware Detection', 'Unauthorized Access', 'Data Breach', 'Phishing'][Math.floor(Math.random() * 5)],
      severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
      location: ['North America', 'Europe', 'Asia Pacific', 'South America'][Math.floor(Math.random() * 4)],
      details: 'Satellite monitoring detected anomalous network activity',
      status: Math.random() > 0.5 ? 'mitigated' : 'investigating'
    }));

    setThreatData(prev => [...newThreats, ...prev].slice(0, 50));
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
    toast({
      title: isMonitoring ? "Monitoring Stopped" : "Monitoring Started",
      description: isMonitoring 
        ? "Satellite monitoring has been paused" 
        : "Real-time satellite monitoring is now active",
    });
  };

  const downloadDataset = (type: 'threats' | 'satellites' | 'full') => {
    let data: any;
    let filename: string;

    switch (type) {
      case 'threats':
        data = threatData;
        filename = `threat-data-${new Date().toISOString().split('T')[0]}.json`;
        break;
      case 'satellites':
        data = satellites;
        filename = `satellite-data-${new Date().toISOString().split('T')[0]}.json`;
        break;
      case 'full':
        data = { threats: threatData, satellites, metadata: { exportDate: new Date().toISOString(), totalRecords: threatData.length + satellites.length } };
        filename = `complete-dataset-${new Date().toISOString().split('T')[0]}.json`;
        break;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Dataset Downloaded",
      description: `${filename} has been downloaded successfully`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'offline': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Satellite className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Satellite Monitoring</h2>
          </div>
          <Badge variant={isMonitoring ? "default" : "secondary"} className="cyber-glow">
            {isMonitoring ? "ACTIVE" : "STANDBY"}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={toggleMonitoring}
            variant={isMonitoring ? "destructive" : "default"}
            className="cyber-glow"
          >
            {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
            <RefreshCw className={`ml-2 h-4 w-4 ${isMonitoring ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Download Controls */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Dataset Downloads
          </CardTitle>
          <CardDescription>
            Export monitoring data and reports for analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => downloadDataset('threats')} 
              variant="outline" 
              size="sm"
              className="cyber-glow"
            >
              <Download className="mr-2 h-4 w-4" />
              Threat Data ({threatData.length} records)
            </Button>
            <Button 
              onClick={() => downloadDataset('satellites')} 
              variant="outline" 
              size="sm"
              className="cyber-glow"
            >
              <Download className="mr-2 h-4 w-4" />
              Satellite Data ({satellites.length} satellites)
            </Button>
            <Button 
              onClick={() => downloadDataset('full')} 
              variant="default" 
              size="sm"
              className="cyber-glow"
            >
              <Download className="mr-2 h-4 w-4" />
              Complete Dataset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Satellite Status */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Satellite Fleet Status
            </CardTitle>
            <CardDescription>
              Real-time status of monitoring satellites
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {satellites.map((satellite) => (
                  <div key={satellite.id} className="border border-border/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Satellite className="h-4 w-4 text-primary" />
                        <span className="font-medium">{satellite.name}</span>
                      </div>
                      <Badge className={getStatusColor(satellite.status)}>
                        {satellite.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Altitude</div>
                        <div>{satellite.altitude} km</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Speed</div>
                        <div>{satellite.speed} km/s</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Signal Strength</span>
                        <span>{satellite.signalStrength}%</span>
                      </div>
                      <Progress value={satellite.signalStrength} className="h-2" />
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Coverage: {satellite.coverage.join(', ')}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        Last Update: {new Date(satellite.lastUpdate).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Live Threat Detection */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Live Threat Detection
            </CardTitle>
            <CardDescription>
              Real-time threats detected via satellite monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {threatData.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Wifi className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No threats detected</p>
                    <p className="text-xs">All systems operational</p>
                  </div>
                ) : (
                  threatData.map((threat) => (
                    <div key={threat.id} className="border border-border/50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(threat.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{threat.threat_type}</div>
                        <div className="text-xs text-muted-foreground">
                          Detected by: {threat.satellite}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Location: {threat.location}
                        </div>
                        <div className="text-xs">{threat.details}</div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {threat.status === 'mitigated' ? (
                          <CheckCircle className="h-3 w-3 text-green-400" />
                        ) : (
                          <Clock className="h-3 w-3 text-yellow-400" />
                        )}
                        <span className="text-xs capitalize">{threat.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Last Update Info */}
      <div className="text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <Signal className="h-4 w-4" />
          Last updated: {lastUpdate.toLocaleTimeString()}
          {isMonitoring && <span className="text-green-400">• Live</span>}
        </div>
      </div>
    </div>
  );
}