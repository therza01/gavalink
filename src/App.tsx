import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CallProvider } from "./contexts/CallContext";
import { FloatingCallIndicator } from "./components/FloatingCallIndicator";
import { VoiceWidgetController } from "./components/VoiceWidgetController";
import Login from "./pages/Login";
import CitizenDashboard from "./pages/CitizenDashboard";
import OfficerDashboard from "./pages/OfficerDashboard";
import CallSimulator from "./pages/CallSimulator";
import Returns from "./pages/Returns";
import Payments from "./pages/Payments";
import Documents from "./pages/Documents";
import Applications from "./pages/Applications";
import Support from "./pages/Support";
import BulkPINVerifier from "./pages/BulkPINVerifier";
import DocumentStamp from "./pages/DocumentStamp";
import BroadcastUpdate from "./pages/BroadcastUpdate";
import Analytics from "./pages/Analytics";
import VoiceAIRequests from "./pages/VoiceAIRequests";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CallProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <VoiceWidgetController />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/citizen" element={<CitizenDashboard />} />
            <Route path="/officer" element={<OfficerDashboard />} />
            <Route path="/call" element={<CallSimulator />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/support" element={<Support />} />
            {/* Officer System Tools */}
            <Route path="/officer/bulk-pin" element={<BulkPINVerifier />} />
            <Route path="/officer/document-stamp" element={<DocumentStamp />} />
            <Route path="/officer/broadcast" element={<BroadcastUpdate />} />
            <Route path="/officer/analytics" element={<Analytics />} />
            <Route path="/officer/voice-requests" element={<VoiceAIRequests />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingCallIndicator />
        </BrowserRouter>
      </CallProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
