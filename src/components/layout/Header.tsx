import { useState } from "react";
import { Bell, Search, User, Shield, Zap, LogOut, Settings, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthModal } from "@/components/auth/AuthModal";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // This would come from auth context
  const unreadNotifications = 3;

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-4">
          <SidebarTrigger className="cyber-glow hover:bg-primary/10" />
          
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <div className="hidden sm:block">
              <span className="font-mono text-lg font-bold text-primary">CyberSOC</span>
              <Badge variant="outline" className="ml-2 text-xs bg-primary/10 text-primary border-primary/30">
                v2.1.3
              </Badge>
            </div>
          </div>
        </div>

        {/* Center Section - Search (Hidden on mobile) */}
        <div className="flex-1 max-w-md mx-4 md:mx-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search threats, incidents, users..." 
              className="pl-10 bg-background/50 border-border focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Real-time Status */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full pulse-cyber" />
            <span className="text-sm font-mono text-primary">LIVE</span>
          </div>

          {/* Threat Level */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-warning/10 border border-cyber-warning/20">
            <Zap className="w-4 h-4 text-cyber-warning" />
            <span className="text-sm font-medium text-cyber-warning">ELEVATED</span>
          </div>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-primary/10"
            onClick={() => setIsNotificationOpen(true)}
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-destructive border-none">
                {unreadNotifications}
              </Badge>
            )}
          </Button>

          {/* User Menu or Login */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                <DropdownMenuLabel className="text-foreground">
                  <div className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Alex Chen</div>
                      <div className="text-xs text-muted-foreground">SOC Analyst</div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-primary/10">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10">
                  <UserCircle className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="hover:bg-destructive/10 text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="cyber" 
              size="sm" 
              onClick={() => setIsAuthModalOpen(true)}
            >
              <User className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Login</span>
            </Button>
          )}
        </div>
      </header>

      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <NotificationCenter isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
    </>
  );
}