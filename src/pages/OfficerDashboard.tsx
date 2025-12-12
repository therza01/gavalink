import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, Shield, Search, Filter, Bell, LogOut, 
  User, ChevronRight, CheckCircle2, AlertCircle, Clock,
  FileCheck, Send, BarChart3, Users, X, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Case {
  id: string;
  name: string;
  pin: string;
  category: string;
  priority: "high" | "medium" | "low";
  days: number;
  status: "pending" | "action" | "closed";
}

const OfficerDashboard = () => {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const cases: Case[] = [
    { id: "CAS-001", name: "Juma Ochieng", pin: "A001234567X", category: "PIN Rectification", priority: "high", days: 5, status: "action" },
    { id: "CAS-002", name: "Amina Wanjiku", pin: "A009876543B", category: "TCC Application", priority: "medium", days: 3, status: "pending" },
    { id: "CAS-003", name: "Peter Kamau", pin: "A005432198C", category: "Tax Query", priority: "low", days: 1, status: "pending" },
    { id: "CAS-004", name: "Grace Muthoni", pin: "A007654321D", category: "Refund Request", priority: "high", days: 7, status: "action" },
    { id: "CAS-005", name: "David Omondi", pin: "A003216549E", category: "Compliance Check", priority: "medium", days: 2, status: "closed" },
  ];

  const stats = [
    { label: "Total Cases", value: 45, icon: Users, color: "text-accent" },
    { label: "Pending", value: 12, icon: Clock, color: "text-warning" },
    { label: "Action Required", value: 8, icon: AlertCircle, color: "text-secondary" },
    { label: "Resolved Today", value: 5, icon: CheckCircle2, color: "text-success" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-secondary/20 text-secondary";
      case "medium": return "bg-warning/20 text-warning";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return "status-pending";
      case "action": return "status-action";
      case "closed": return "status-closed";
      default: return "status-closed";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-officer-charcoal text-primary-foreground sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Building2 className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <span className="font-bold">Officer Dashboard</span>
              <p className="text-xs opacity-80">Welcome, Officer Atieno | Nairobi Central</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-accent/20 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center">3</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-accent/20" onClick={() => navigate("/")}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-border bg-card min-h-[calc(100vh-57px)] p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase px-3 mb-3">System Tools</p>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left text-sm text-foreground">
            <Users className="w-4 h-4" />
            Bulk PIN Verifier
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left text-sm text-foreground">
            <FileCheck className="w-4 h-4" />
            Document Stamp
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left text-sm text-foreground">
            <Send className="w-4 h-4" />
            Broadcast Update
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left text-sm text-foreground">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
            {stats.map((stat) => (
              <Card key={stat.label} className="shadow-card">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Case Queue */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="text-lg">Case Queue</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or PIN..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case ID</TableHead>
                      <TableHead>Taxpayer Name</TableHead>
                      <TableHead>PIN</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Days Open</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cases
                      .filter(c => 
                        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.pin.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((c) => (
                      <TableRow key={c.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedCase(c)}>
                        <TableCell className="font-mono text-sm">{c.id}</TableCell>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell className="font-mono text-sm">{c.pin}</TableCell>
                        <TableCell>{c.category}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(c.priority)}`}>
                            {c.priority}
                          </span>
                        </TableCell>
                        <TableCell>{c.days}</TableCell>
                        <TableCell>
                          <span className={`status-badge ${getStatusBadge(c.status)}`}>
                            {c.status === "action" ? "Action Required" : c.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Case Detail Panel */}
        {selectedCase && (
          <aside className="w-96 border-l border-border bg-card min-h-[calc(100vh-57px)] p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-foreground">Case Details</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedCase(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Citizen Profile */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                <User className="w-7 h-7 text-muted-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground">{selectedCase.name}</p>
                <p className="text-sm text-muted-foreground font-mono">{selectedCase.pin}</p>
              </div>
            </div>

            {/* Case Info */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Case ID</span>
                <span className="text-sm font-mono text-foreground">{selectedCase.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Category</span>
                <span className="text-sm text-foreground">{selectedCase.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Priority</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedCase.priority)}`}>
                  {selectedCase.priority}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Days Open</span>
                <span className="text-sm text-foreground">{selectedCase.days} days</span>
              </div>
            </div>

            {/* Communication History */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-3">Communication History</p>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                <div className="p-3 rounded-lg bg-muted/50 text-sm">
                  <p className="text-muted-foreground">You requested supporting documents</p>
                  <p className="text-xs text-muted-foreground mt-1">12/04/2024, 10:30 AM</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/10 text-sm">
                  <p className="text-foreground">Citizen uploaded ID copy</p>
                  <p className="text-xs text-muted-foreground mt-1">12/04/2024, 2:15 PM</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Request Info
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="text-warning border-warning hover:bg-warning/10">
                  Escalate
                </Button>
                <Button variant="outline" className="text-muted-foreground">
                  Close Case
                </Button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-4 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
            <Shield className="w-3 h-3" />
            <span>Secured by GavaLink • Kenya Revenue Authority</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OfficerDashboard;