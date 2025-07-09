import { Bell, Search, User, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="cyber-glow hover:bg-primary/10" />
        
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-mono text-lg font-bold text-primary">CyberSOC</span>
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
            v2.1.3
          </Badge>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search threats, incidents, users..." 
            className="pl-10 bg-background/50 border-border focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Real-time Status */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <div className="w-2 h-2 bg-primary rounded-full pulse-cyber" />
          <span className="text-sm font-mono text-primary">LIVE</span>
        </div>

        {/* Threat Level */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-warning/10 border border-cyber-warning/20">
          <Zap className="w-4 h-4 text-cyber-warning" />
          <span className="text-sm font-medium text-cyber-warning">ELEVATED</span>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-destructive border-none">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <Button variant="ghost" size="icon" className="hover:bg-primary/10">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}