import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ThreatIntelligence from "./pages/ThreatIntelligence";
import Monitoring from "./pages/Monitoring";
import IncidentManagement from "./pages/IncidentManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="threats" element={<ThreatIntelligence />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="incidents" element={<IncidentManagement />} />
            <Route path="analytics" element={<Dashboard />} />
            <Route path="threat-map" element={<ThreatIntelligence />} />
            <Route path="users" element={<IncidentManagement />} />
            <Route path="reports" element={<ThreatIntelligence />} />
            <Route path="settings" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
