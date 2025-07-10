import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Shield, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  RefreshCw,
  Play,
  Square,
  Database,
  Network,
  Server,
  Lock,
  Bug,
  FileX
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScanResult {
  id: string;
  category: string;
  name: string;
  status: 'passed' | 'failed' | 'warning' | 'scanning';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  details?: string;
  timestamp: string;
}

interface ScanCategory {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  tests: number;
  completed: number;
}

export function SecurityScanner() {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [scanStartTime, setScanStartTime] = useState<Date | null>(null);

  const scanCategories: ScanCategory[] = [
    { name: 'Network Security', icon: Network, description: 'Firewall, ports, connections', tests: 15, completed: 0 },
    { name: 'System Integrity', icon: Server, description: 'OS patches, configurations', tests: 12, completed: 0 },
    { name: 'Database Security', icon: Database, description: 'Access controls, encryption', tests: 8, completed: 0 },
    { name: 'Authentication', icon: Lock, description: 'User access, permissions', tests: 10, completed: 0 },
    { name: 'Malware Detection', icon: Bug, description: 'Virus scan, threats', tests: 20, completed: 0 },
    { name: 'Data Protection', icon: FileX, description: 'Encryption, backups', tests: 6, completed: 0 }
  ];

  const mockScanTests = [
    // Network Security
    { category: 'Network Security', name: 'Firewall Status Check', severity: 'high' as const, pass: true },
    { category: 'Network Security', name: 'Open Port Analysis', severity: 'medium' as const, pass: false },
    { category: 'Network Security', name: 'DDoS Protection', severity: 'high' as const, pass: true },
    { category: 'Network Security', name: 'SSL Certificate Validation', severity: 'medium' as const, pass: true },
    { category: 'Network Security', name: 'VPN Connection Security', severity: 'low' as const, pass: true },
    
    // System Integrity
    { category: 'System Integrity', name: 'OS Security Patches', severity: 'critical' as const, pass: false },
    { category: 'System Integrity', name: 'System Configuration', severity: 'medium' as const, pass: true },
    { category: 'System Integrity', name: 'Service Account Security', severity: 'high' as const, pass: true },
    { category: 'System Integrity', name: 'Registry Integrity', severity: 'medium' as const, pass: true },
    
    // Database Security
    { category: 'Database Security', name: 'Database Access Control', severity: 'high' as const, pass: true },
    { category: 'Database Security', name: 'Data Encryption at Rest', severity: 'critical' as const, pass: true },
    { category: 'Database Security', name: 'SQL Injection Protection', severity: 'high' as const, pass: false },
    
    // Authentication
    { category: 'Authentication', name: 'Password Policy Compliance', severity: 'medium' as const, pass: true },
    { category: 'Authentication', name: 'Multi-Factor Authentication', severity: 'high' as const, pass: false },
    { category: 'Authentication', name: 'Session Management', severity: 'medium' as const, pass: true },
    { category: 'Authentication', name: 'Account Lockout Policy', severity: 'low' as const, pass: true },
    
    // Malware Detection
    { category: 'Malware Detection', name: 'Real-time Protection', severity: 'critical' as const, pass: true },
    { category: 'Malware Detection', name: 'Signature Database Update', severity: 'medium' as const, pass: true },
    { category: 'Malware Detection', name: 'Behavioral Analysis', severity: 'high' as const, pass: true },
    { category: 'Malware Detection', name: 'Email Security Scan', severity: 'medium' as const, pass: false },
    
    // Data Protection
    { category: 'Data Protection', name: 'Backup Integrity', severity: 'high' as const, pass: true },
    { category: 'Data Protection', name: 'Data Loss Prevention', severity: 'medium' as const, pass: true },
    { category: 'Data Protection', name: 'Encryption Standards', severity: 'high' as const, pass: true }
  ];

  const startScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResults([]);
    setScanStartTime(new Date());
    
    toast({
      title: "Security Scan Started",
      description: "Comprehensive system security scan initiated",
    });

    // Simulate scanning process
    const totalTests = mockScanTests.length;
    let currentTest = 0;

    for (const category of scanCategories) {
      setCurrentCategory(category.name);
      
      const categoryTests = mockScanTests.filter(test => test.category === category.name);
      
      for (const test of categoryTests) {
        currentTest++;
        
        // Simulate test execution time
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
        
        const result: ScanResult = {
          id: `scan-${currentTest}`,
          category: test.category,
          name: test.name,
          status: test.pass ? 'passed' : 'failed',
          severity: test.severity,
          description: test.pass 
            ? `${test.name} completed successfully` 
            : `${test.name} failed - security vulnerability detected`,
          details: test.pass 
            ? 'All security checks passed for this component'
            : 'Security issue found that requires immediate attention',
          timestamp: new Date().toISOString()
        };

        setScanResults(prev => [...prev, result]);
        setScanProgress(Math.round((currentTest / totalTests) * 100));
      }
    }

    setIsScanning(false);
    setCurrentCategory('');
    
    const failedTests = scanResults.filter(r => r.status === 'failed').length;
    
    toast({
      title: "Security Scan Complete",
      description: `Scan completed. ${failedTests} security issues found.`,
      variant: failedTests > 0 ? "destructive" : "default"
    });
  };

  const stopScan = () => {
    setIsScanning(false);
    setCurrentCategory('');
    setScanProgress(0);
    
    toast({
      title: "Security Scan Stopped",
      description: "Scan has been cancelled by user",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'scanning': return <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
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

  const getCategoryStats = () => {
    const passed = scanResults.filter(r => r.status === 'passed').length;
    const failed = scanResults.filter(r => r.status === 'failed').length;
    const warnings = scanResults.filter(r => r.status === 'warning').length;
    
    return { passed, failed, warnings, total: scanResults.length };
  };

  const stats = getCategoryStats();

  return (
    <div className="space-y-6">
      {/* Scanner Controls */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Scanner
          </CardTitle>
          <CardDescription>
            Comprehensive security assessment of all system components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  onClick={isScanning ? stopScan : startScan}
                  variant={isScanning ? "destructive" : "default"}
                  className="cyber-glow"
                >
                  {isScanning ? (
                    <>
                      <Square className="mr-2 h-4 w-4" />
                      Stop Scan
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Start Full Scan
                    </>
                  )}
                </Button>
                
                {isScanning && (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm">Scanning: {currentCategory}</span>
                  </div>
                )}
              </div>
              
              {scanStartTime && (
                <div className="text-sm text-muted-foreground">
                  Started: {scanStartTime.toLocaleTimeString()}
                </div>
              )}
            </div>
            
            {isScanning && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Scan Progress</span>
                  <span>{scanProgress}%</span>
                </div>
                <Progress value={scanProgress} className="h-2" />
              </div>
            )}
            
            {/* Scan Statistics */}
            {scanResults.length > 0 && (
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{stats.passed}</div>
                  <div className="text-xs text-muted-foreground">Passed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{stats.failed}</div>
                  <div className="text-xs text-muted-foreground">Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{stats.warnings}</div>
                  <div className="text-xs text-muted-foreground">Warnings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.total}</div>
                  <div className="text-xs text-muted-foreground">Total Tests</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scan Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scanCategories.map((category, index) => {
          const categoryResults = scanResults.filter(r => r.category === category.name);
          const passed = categoryResults.filter(r => r.status === 'passed').length;
          const failed = categoryResults.filter(r => r.status === 'failed').length;
          
          return (
            <Card key={index} className="cyber-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <category.icon className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                
                {categoryResults.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      {passed} passed
                    </Badge>
                    {failed > 0 && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                        {failed} failed
                      </Badge>
                    )}
                  </div>
                )}
                
                {currentCategory === category.name && isScanning && (
                  <div className="mt-2">
                    <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Scan Results */}
      {scanResults.length > 0 && (
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Scan Results
            </CardTitle>
            <CardDescription>
              Detailed security assessment findings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {scanResults.map((result) => (
                  <div key={result.id} className="border border-border/50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(result.status)}
                        <span className="font-medium">{result.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(result.severity)}>
                          {result.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(result.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Category: {result.category}
                    </div>
                    
                    <div className="text-sm">{result.description}</div>
                    
                    {result.details && (
                      <div className="text-xs text-muted-foreground bg-background/50 p-2 rounded">
                        {result.details}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}