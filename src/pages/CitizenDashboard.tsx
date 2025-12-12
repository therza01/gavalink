import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, Shield, FileText, Clock, MessageSquare, Download, 
  CheckCircle2, AlertCircle, ChevronRight, Bell, LogOut,
  TrendingUp, Calendar, Folder
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const [complianceScore] = useState(78);

  const documents = [
    { name: "iTax Forms", icon: FileText, count: 3 },
    { name: "TCC Certificate", icon: Shield, count: 1 },
    { name: "Payment Slips", icon: Download, count: 5 },
  ];

  const applications = [
    { id: "APP-001", name: "PIN Rectification", status: "pending", date: "10/12/2024" },
    { id: "APP-002", name: "TCC Application", status: "verified", date: "05/12/2024" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">GavaLink</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center">2</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card rounded-2xl p-4 border border-border animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Habari, Juma!</h1>
              <p className="text-sm text-muted-foreground">Your KRA PIN: <span className="font-mono font-semibold text-foreground">A001234567X</span></p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Compliance Score</p>
              <p className="text-lg font-bold text-primary">{complianceScore}/100</p>
            </div>
            <div className="w-16 h-16">
              <Progress value={complianceScore} className="h-2" />
              <span className="text-xs text-success font-medium">Good</span>
            </div>
          </div>
        </div>

        {/* Government ID Card */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 animate-fade-in overflow-hidden relative">
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-success/20 text-success px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            VERIFIED
          </div>
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center border-2 border-border">
                <User className="w-12 h-12 text-muted-foreground" />
              </div>
              <div className="text-center md:text-left space-y-1">
                <h2 className="text-2xl font-bold text-foreground">Juma Ochieng Otieno</h2>
                <p className="text-muted-foreground">National ID: <span className="font-mono">12345678</span></p>
                <p className="text-muted-foreground">KRA PIN: <span className="font-mono font-semibold text-primary">A001234567X</span></p>
                <div className="flex items-center gap-2 justify-center md:justify-start mt-2">
                  <span className="status-badge status-verified">Active Taxpayer</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Four Quadrant Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Tax Overview */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Tax Overview
                </CardTitle>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Current Obligation</span>
                <span className="font-semibold text-foreground">KES 0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Last Filing</span>
                <span className="font-semibold text-foreground">NIL Return - Oct 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Next Deadline</span>
                <span className="font-semibold text-secondary">30th June 2025</span>
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-success">All obligations met</p>
            </CardContent>
          </Card>

          {/* Documents Hub */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Folder className="w-5 h-5 text-accent" />
                  Documents Hub
                </CardTitle>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {documents.map((doc) => (
                  <button
                    key={doc.name}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors relative"
                  >
                    <doc.icon className="w-8 h-8 text-accent" />
                    <span className="text-xs text-center text-muted-foreground">{doc.name}</span>
                    {doc.count > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                        {doc.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Applications */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-warning" />
                  Active Applications
                </CardTitle>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-foreground">{app.name}</p>
                    <p className="text-xs text-muted-foreground">{app.date}</p>
                  </div>
                  <span className={`status-badge ${app.status === "pending" ? "status-pending" : "status-verified"}`}>
                    {app.status === "pending" ? "In Review" : "Approved"}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Officer Communications */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                  Officer Communications
                </CardTitle>
                <span className="w-5 h-5 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center">1</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Officer Atieno</p>
                    <p className="text-sm text-muted-foreground">Requested your supporting document for PIN rectification</p>
                    <p className="text-xs text-muted-foreground mt-1">12/04/2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button variant="outline" className="h-auto min-h-[80px] py-4 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/30 active:scale-[0.98] transition-all duration-150">
            <MessageSquare className="w-6 h-6" />
            <span className="text-sm font-medium">Message Officer</span>
          </Button>
          <Button variant="outline" className="h-auto min-h-[80px] py-4 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/30 active:scale-[0.98] transition-all duration-150">
            <FileText className="w-6 h-6" />
            <span className="text-sm font-medium">File a Return</span>
          </Button>
          <Button variant="outline" className="h-auto min-h-[80px] py-4 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/30 active:scale-[0.98] transition-all duration-150">
            <CheckCircle2 className="w-6 h-6" />
            <span className="text-sm font-medium">Check Compliance</span>
          </Button>
          <Button variant="outline" className="h-auto min-h-[80px] py-4 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/30 active:scale-[0.98] transition-all duration-150">
            <Download className="w-6 h-6" />
            <span className="text-sm font-medium">Download Summary</span>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-6">
        <div className="container mx-auto px-4 py-4 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
            <Shield className="w-3 h-3" />
            <span>Secured by GavaLink</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CitizenDashboard;