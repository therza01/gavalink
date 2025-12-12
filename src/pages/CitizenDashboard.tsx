import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  User, Shield, FileText, Clock, MessageSquare, Download, 
  CheckCircle2, AlertCircle, ChevronRight, Bell, LogOut,
  TrendingUp, Calendar, Folder, Mic, CreditCard, Upload,
  Search, Settings, HelpCircle, Phone, Mail, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const [complianceScore] = useState(78);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const documents = [
    { name: "iTax Forms", icon: FileText, count: 3, type: "tax" },
    { name: "TCC Certificate", icon: Shield, count: 1, type: "certificate" },
    { name: "Payment Receipts", icon: Download, count: 5, type: "payment" },
    { name: "ID Documents", icon: CreditCard, count: 2, type: "id" },
  ];

  const applications = [
    { id: "APP-2024-001", name: "PIN Rectification", status: "pending", date: "10/12/2024", officer: "Officer Atieno" },
    { id: "APP-2024-002", name: "TCC Application", status: "verified", date: "05/12/2024", officer: "Officer Mwangi" },
    { id: "APP-2024-003", name: "Business Registration", status: "action", date: "01/12/2024", officer: "Officer Kamau" },
  ];

  const recentActivities = [
    { action: "NIL Return Filed", date: "Oct 2024", status: "success" },
    { action: "TCC Downloaded", date: "Sep 2024", status: "success" },
    { action: "Profile Updated", date: "Aug 2024", status: "success" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "verified": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "action": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getComplianceColor = () => {
    if (complianceScore >= 80) return "text-green-600";
    if (complianceScore >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Quick action handlers
  const handleQuickAction = (action: string) => {
    switch (action) {
      case "File NIL Return":
        toast.success("Opening NIL Return form...", {
          description: "You'll be guided through the filing process",
        });
        navigate("/call");
        break;
      case "Make Payment":
        toast.info("Payment Portal", {
          description: "M-Pesa payment integration coming soon",
        });
        break;
      case "Download TCC":
        toast.success("Downloading TCC Certificate...", {
          description: "Your Tax Compliance Certificate will download shortly",
        });
        break;
      case "Upload Document":
        toast.info("Document Upload", {
          description: "Document upload feature coming soon",
        });
        break;
      case "Contact Officer":
        toast.info("Contacting Officer", {
          description: "Opening secure messaging...",
        });
        break;
      case "Get Help":
        toast.info("Help Center", {
          description: "Redirecting to voice assistant...",
        });
        navigate("/call");
        break;
      default:
        toast.info("Feature coming soon");
    }
  };

  const handleNavAction = (section: string) => {
    toast.info(`${section}`, {
      description: "This section is coming soon",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-2 border-b border-white/10 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> +254 20 281 7700
              </span>
              <span className="hidden md:flex items-center gap-1">
                <Mail className="w-3 h-3" /> callcentre@kra.go.ke
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>{currentTime.toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          
          {/* Main header */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-md">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">KRA iTax</h1>
                <p className="text-xs text-white/70">Kenya Revenue Authority</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative" onClick={() => toast.info("Search", { description: "Search feature coming soon" })}>
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative" onClick={() => toast.info("Notifications", { description: "You have 3 unread notifications" })}>
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center font-bold">3</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => toast.info("Settings", { description: "Settings page coming soon" })}>
                <Settings className="w-5 h-5" />
              </Button>
              <Separator orientation="vertical" className="h-6 bg-white/20 mx-2" />
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/10 gap-2"
                onClick={() => navigate("/")}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Navigation */}
      <nav className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 py-2 overflow-x-auto">
            <Button variant="ghost" size="sm" className="text-sm font-medium text-primary bg-primary/5">Dashboard</Button>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-primary" onClick={() => handleNavAction("Returns")}>Returns</Button>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-primary" onClick={() => handleNavAction("Payments")}>Payments</Button>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-primary" onClick={() => handleNavAction("Documents")}>Documents</Button>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-primary" onClick={() => handleNavAction("Applications")}>Applications</Button>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-primary" onClick={() => handleNavAction("Support")}>Support</Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="lg:col-span-2 overflow-hidden border-0 shadow-lg animate-fade-in">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-4 border-white/30">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Welcome back,</p>
                    <h2 className="text-2xl font-bold">Juma Ochieng Otieno</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified Taxpayer
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/70 text-sm">KRA PIN</p>
                  <p className="text-xl font-mono font-bold tracking-wider">A001234567X</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <p className="text-2xl font-bold text-foreground">KES 0</p>
                  <p className="text-xs text-muted-foreground">Outstanding Tax</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Returns Filed</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-xs text-muted-foreground">Documents</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <p className="text-2xl font-bold text-green-600">Active</p>
                  <p className="text-xs text-muted-foreground">TCC Status</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Score Card */}
          <Card className="border-0 shadow-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Compliance Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="none" className="text-muted/30" />
                  <circle 
                    cx="64" cy="64" r="56" 
                    stroke="currentColor" 
                    strokeWidth="12" 
                    fill="none" 
                    className={getComplianceColor().replace('text-', 'text-')} 
                    strokeDasharray={`${complianceScore * 3.52} 352`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-bold ${getComplianceColor()}`}>{complianceScore}</span>
                  <span className="text-xs text-muted-foreground">out of 100</span>
                </div>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                  Good Standing
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Returns</span>
                  <span className="text-green-600">✓ Up to date</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payments</span>
                  <span className="text-green-600">✓ No arrears</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TCC</span>
                  <span className="text-green-600">✓ Valid</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { icon: FileText, label: "File NIL Return", color: "text-primary" },
                { icon: CreditCard, label: "Make Payment", color: "text-green-600" },
                { icon: Download, label: "Download TCC", color: "text-blue-600" },
                { icon: Upload, label: "Upload Document", color: "text-purple-600" },
                { icon: MessageSquare, label: "Contact Officer", color: "text-orange-600" },
                { icon: HelpCircle, label: "Get Help", color: "text-secondary" },
              ].map((action) => (
                <Button 
                  key={action.label}
                  variant="outline" 
                  className="h-auto min-h-[90px] py-4 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 active:scale-[0.98] transition-all duration-150 group"
                  onClick={() => handleQuickAction(action.label)}
                >
                  <action.icon className={`w-7 h-7 ${action.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tax Overview */}
          <Card className="border-0 shadow-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Tax Overview
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary text-xs" onClick={() => handleNavAction("Tax Overview")}>View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Outstanding Balance</p>
                    <p className="text-2xl font-bold text-green-600">KES 0.00</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Last Filing</span>
                  <span className="text-sm font-medium">NIL Return - Oct 2024</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Next Deadline</span>
                  <span className="text-sm font-medium text-secondary">30th June 2025</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Tax Year</span>
                  <span className="text-sm font-medium">2024</span>
                </div>
              </div>

              <Button 
                className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all"
                onClick={() => handleQuickAction("File NIL Return")}
              >
                <FileText className="w-4 h-4 mr-2" />
                File Return Now
              </Button>
            </CardContent>
          </Card>

          {/* Documents Hub */}
          <Card className="border-0 shadow-lg animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Folder className="w-5 h-5 text-blue-600" />
                Documents Hub
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary text-xs" onClick={() => handleNavAction("Documents")}>Manage</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                  onClick={() => toast.info(doc.name, { description: `${doc.count} files available` })}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shadow-sm">
                      <doc.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.count} files</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-4 active:scale-[0.98] transition-all"
                onClick={() => handleQuickAction("Upload Document")}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload New Document
              </Button>
            </CardContent>
          </Card>

          {/* Applications Status */}
          <Card className="border-0 shadow-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Applications
              </CardTitle>
              <Badge variant="outline">{applications.length} Active</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => toast.info(app.name, { description: `Application ${app.id} - Assigned to ${app.officer}` })}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">{app.name}</p>
                    <Badge variant="outline" className={getStatusColor(app.status)}>
                      {app.status === "pending" ? "In Review" : app.status === "verified" ? "Approved" : "Action Needed"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{app.id}</span>
                    <span>{app.date}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Communications & Voice Assistant Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Officer Communications */}
          <Card className="border-0 shadow-lg animate-fade-in" style={{ animationDelay: "0.35s" }}>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-secondary" />
                Messages
              </CardTitle>
              <Badge className="bg-secondary text-secondary-foreground">1 New</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">Officer Atieno</p>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Kindly upload your supporting document for PIN rectification application.</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="h-8 bg-secondary hover:bg-secondary/90" onClick={() => toast.info("Compose Reply", { description: "Opening secure messaging..." })}>Reply</Button>
                      <Button size="sm" variant="outline" className="h-8" onClick={() => toast.info("Message Details", { description: "Viewing conversation with Officer Atieno" })}>View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-muted/30">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">Officer Mwangi</p>
                      <span className="text-xs text-muted-foreground">1 week ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Your TCC application has been approved.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voice AI Assistant */}
          <Card className="border-0 shadow-lg overflow-hidden animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Mic className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Voice AI Assistant</h3>
                  <p className="text-sm text-white/80">Get help in Swahili or English</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Need help navigating iTax? Our AI assistant can help you file returns, check your status, and answer questions about your tax obligations.
              </p>
              <Button 
                onClick={() => navigate("/call")}
                className="w-full h-16 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-lg font-semibold gap-3"
              >
                <Mic className="w-6 h-6" />
                Start a Call
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Click to start talking with our AI assistant
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg animate-fade-in" style={{ animationDelay: "0.45s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Professional Footer */}
      <footer className="bg-primary text-white mt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">KRA iTax</h4>
                  <p className="text-xs text-white/70">Kenya Revenue Authority</p>
                </div>
              </div>
              <p className="text-sm text-white/70">Building a tax-compliant nation through simplified digital services.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Quick Links</h5>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="hover:text-white cursor-pointer" onClick={() => handleQuickAction("File NIL Return")}>File Returns</li>
                <li className="hover:text-white cursor-pointer" onClick={() => handleQuickAction("Make Payment")}>Make Payment</li>
                <li className="hover:text-white cursor-pointer" onClick={() => handleQuickAction("Download TCC")}>Download TCC</li>
                <li className="hover:text-white cursor-pointer" onClick={() => handleNavAction("Documents")}>My Documents</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="hover:text-white cursor-pointer" onClick={() => toast.info("FAQs", { description: "Frequently asked questions coming soon" })}>FAQs</li>
                <li className="hover:text-white cursor-pointer" onClick={() => toast.info("Contact Us", { description: "Call +254 20 281 7700 or email callcentre@kra.go.ke" })}>Contact Us</li>
                <li className="hover:text-white cursor-pointer" onClick={() => toast.info("Service Centers", { description: "Find KRA service centers near you" })}>Service Centers</li>
                <li className="hover:text-white cursor-pointer" onClick={() => toast.info("Complaints", { description: "Submit a complaint or feedback" })}>Complaints</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Contact</h5>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +254 20 281 7700</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> callcentre@kra.go.ke</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Times Tower, Nairobi</li>
              </ul>
            </div>
          </div>
          <Separator className="bg-white/20 mb-4" />
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-white/60">
            <p>© 2024 Kenya Revenue Authority. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <span className="hover:text-white cursor-pointer" onClick={() => toast.info("Privacy Policy")}>Privacy Policy</span>
              <span className="hover:text-white cursor-pointer" onClick={() => toast.info("Terms of Service")}>Terms of Service</span>
              <span className="hover:text-white cursor-pointer" onClick={() => toast.info("Accessibility")}>Accessibility</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CitizenDashboard;
