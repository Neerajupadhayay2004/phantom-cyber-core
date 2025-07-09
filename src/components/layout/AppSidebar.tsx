import { useState } from "react";
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  Eye,
  Zap,
  Globe
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Security Dashboard", url: "/", icon: Shield, category: "main" },
  { title: "Real-time Monitoring", url: "/monitoring", icon: Activity, category: "main" },
  { title: "Threat Intelligence", url: "/threats", icon: Eye, category: "main" },
  { title: "Incident Management", url: "/incidents", icon: AlertTriangle, category: "security" },
  { title: "Security Analytics", url: "/analytics", icon: BarChart3, category: "security" },
  { title: "Global Threat Map", url: "/threat-map", icon: Globe, category: "security" },
  { title: "User Management", url: "/users", icon: Users, category: "admin" },
  { title: "Compliance Reports", url: "/reports", icon: FileText, category: "admin" },
  { title: "SOC Configuration", url: "/settings", icon: Settings, category: "admin" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClasses = (path: string) => {
    const baseClasses = "group relative overflow-hidden transition-all duration-300";
    if (isActive(path)) {
      return `${baseClasses} bg-primary/20 text-primary border-r-2 border-primary cyber-glow`;
    }
    return `${baseClasses} hover:bg-primary/10 hover:text-primary`;
  };

  const groupedItems = {
    main: navigationItems.filter(item => item.category === "main"),
    security: navigationItems.filter(item => item.category === "security"),
    admin: navigationItems.filter(item => item.category === "admin"),
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 border-r border-border bg-card/50 backdrop-blur-sm`}
      collapsible="icon"
    >
      <SidebarContent className="matrix-bg">
        {/* Logo Section */}
        <div className={`p-4 border-b border-border ${collapsed ? "px-2" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center cyber-glow">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold font-mono text-primary">CyberSOC</h2>
                <p className="text-xs text-muted-foreground">Security Operations</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : "text-primary font-semibold"}>
            Core Systems
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedItems.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClasses(item.url)}>
                      <item.icon className={`h-5 w-5 ${isActive(item.url) ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                      {!collapsed && isActive(item.url) && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Security Tools */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : "text-accent font-semibold"}>
            Security Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedItems.security.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClasses(item.url)}>
                      <item.icon className={`h-5 w-5 ${isActive(item.url) ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                      {!collapsed && isActive(item.url) && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Administration */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : "text-secondary font-semibold"}>
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedItems.admin.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClasses(item.url)}>
                      <item.icon className={`h-5 w-5 ${isActive(item.url) ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                      {!collapsed && isActive(item.url) && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="w-3 h-3 bg-primary rounded-full pulse-cyber" />
              <div>
                <p className="text-sm font-medium text-primary">System Status</p>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}