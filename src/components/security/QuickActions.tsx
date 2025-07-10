import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Shield, 
  Eye, 
  RefreshCw, 
  Lock, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  FileText,
  Database,
  Network,
  Server
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SecurityScanner } from './SecurityScanner';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "cyber" | "critical" | "warning" | "success";
  action: string;
}

const quickActions: QuickAction[] = [
  { 
    title: "Generate Security Report",
    description: "Create comprehensive security analysis",
    icon: Download,
    variant: "cyber",
    action: "report"
  },
  {
    title: "Emergency Lockdown", 
    description: "Activate security protocols",
    icon: Shield,
    variant: "critical",
    action: "lockdown"
  },
  {
    title: "Scan All Systems",
    description: "Full infrastructure scan",
    icon: Eye, 
    variant: "warning",
    action: "scan"
  },
  {
    title: "Update Threat Intel",
    description: "Refresh threat databases",
    icon: RefreshCw,
    variant: "success",
    action: "update"
  }
];

export function QuickActions() {
  const { toast } = useToast();
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isUpdatingThreatIntel, setIsUpdatingThreatIntel] = useState(false);
  const [lockdownActive, setLockdownActive] = useState(false);
  const [scanDialogOpen, setScanDialogOpen] = useState(false);

  const generateSecurityReport = async () => {
    setIsGeneratingReport(true);
    
    toast({
      title: "Generating Security Report",
      description: "Compiling comprehensive security analysis...",
    });

    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Create mock report data
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: {
        totalSystems: 15,
        secureSystemsCount: 12,
        vulnerabilities: 8,
        criticalIssues: 2,
        lastScanDate: new Date().toISOString()
      },
      vulnerabilities: [
        { id: 1, severity: 'Critical', description: 'Unpatched OS vulnerabilities detected', affected: 'Server-001' },
        { id: 2, severity: 'High', description: 'Weak password policies', affected: 'Domain Controller' },
        { id: 3, severity: 'Medium', description: 'Outdated SSL certificates', affected: 'Web Server' },
        { id: 4, severity: 'Low', description: 'Unused services running', affected: 'Multiple systems' }
      ],
      recommendations: [
        'Apply critical security patches immediately',
        'Implement stronger password policies',
        'Update SSL certificates',
        'Disable unnecessary services'
      ],
      complianceStatus: {
        ISO27001: 'Partial',
        NIST: 'Compliant', 
        GDPR: 'Compliant'
      }
    };

    // Download report as JSON
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsGeneratingReport(false);
    
    toast({
      title: "Security Report Generated",
      description: "Comprehensive security report has been downloaded",
    });
  };

  const activateEmergencyLockdown = async () => {
    setLockdownActive(true);
    
    toast({
      title: "Emergency Lockdown Activated",
      description: "All non-essential systems have been secured",
      variant: "destructive"
    });

    // Simulate lockdown procedures
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Lockdown Complete",
      description: "Emergency security protocols are now active",
    });
  };

  const deactivateLockdown = async () => {
    setLockdownActive(false);
    
    toast({
      title: "Lockdown Deactivated",
      description: "Systems are returning to normal operation",
    });
  };

  const updateThreatIntelligence = async () => {
    setIsUpdatingThreatIntel(true);
    
    toast({
      title: "Updating Threat Intelligence",
      description: "Downloading latest threat databases...",
    });

    // Simulate update process
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    setIsUpdatingThreatIntel(false);
    
    toast({
      title: "Threat Intelligence Updated",
      description: "Latest threat signatures and IOCs have been applied",
    });
  };

  const handleQuickAction = (actionType: string) => {
    switch (actionType) {
      case 'report':
        generateSecurityReport();
        break;
      case 'scan':
        setScanDialogOpen(true);
        break;
      case 'update':
        updateThreatIntelligence();
        break;
      case 'lockdown':
        // Handled by AlertDialog
        break;
      default:
        toast({
          title: "Action Not Available",
          description: "This feature is under development",
        });
    }
  };

  return (
    <div className="space-y-6">
      {/* Lockdown Status */}
      {lockdownActive && (
        <Card className="border-red-500/50 bg-red-500/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Shield className="h-5 w-5" />
              Emergency Lockdown Active
            </CardTitle>
            <CardDescription>
              Security protocols are currently enforced. Click to deactivate.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={deactivateLockdown}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/20"
            >
              <Lock className="mr-2 h-4 w-4" />
              Deactivate Lockdown
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions Grid */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-primary">Quick Security Actions</CardTitle>
          <CardDescription>
            Instant access to critical security operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <div key={index}>
                {action.action === 'lockdown' ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant={action.variant}
                        className="h-auto p-4 flex-col items-start gap-2 hover:scale-105 transition-transform w-full"
                        disabled={lockdownActive}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <action.icon className="w-5 h-5" />
                          <span className="font-medium">{action.title}</span>
                        </div>
                        <span className="text-xs opacity-80 text-left">
                          {action.description}
                        </span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                          Confirm Emergency Lockdown
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will immediately secure all non-essential systems and restrict access. 
                          Only critical security operations will remain active. Are you sure you want to proceed?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={activateEmergencyLockdown}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Activate Lockdown
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : action.action === 'scan' ? (
                  <Dialog open={scanDialogOpen} onOpenChange={setScanDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant={action.variant}
                        className="h-auto p-4 flex-col items-start gap-2 hover:scale-105 transition-transform w-full"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <action.icon className="w-5 h-5" />
                          <span className="font-medium">{action.title}</span>
                        </div>
                        <span className="text-xs opacity-80 text-left">
                          {action.description}
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Security Scanner</DialogTitle>
                        <DialogDescription>
                          Comprehensive security assessment of all system components
                        </DialogDescription>
                      </DialogHeader>
                      <SecurityScanner />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button 
                    variant={action.variant}
                    className="h-auto p-4 flex-col items-start gap-2 hover:scale-105 transition-transform w-full"
                    onClick={() => handleQuickAction(action.action)}
                    disabled={
                      (action.action === 'report' && isGeneratingReport) ||
                      (action.action === 'update' && isUpdatingThreatIntel)
                    }
                  >
                    <div className="flex items-center gap-2 w-full">
                      {((action.action === 'report' && isGeneratingReport) ||
                        (action.action === 'update' && isUpdatingThreatIntel)) ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <action.icon className="w-5 h-5" />
                      )}
                      <span className="font-medium">{action.title}</span>
                    </div>
                    <span className="text-xs opacity-80 text-left">
                      {action.description}
                    </span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status Overview */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            System Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Network Security</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Secure
                </Badge>
              </div>
              <Progress value={92} className="h-2" />
              <span className="text-xs text-muted-foreground">92% Secure</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Data Protection</span>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Warning
                </Badge>
              </div>
              <Progress value={78} className="h-2" />
              <span className="text-xs text-muted-foreground">78% Secure</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Access Control</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Secure
                </Badge>
              </div>
              <Progress value={95} className="h-2" />
              <span className="text-xs text-muted-foreground">95% Secure</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}