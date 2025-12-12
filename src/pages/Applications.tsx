import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft, FileText, Clock, CheckCircle2, AlertCircle, Plus,
  Search, Eye, MessageSquare, Calendar, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Applications = () => {
  const navigate = useNavigate();
  const [newAppOpen, setNewAppOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<typeof applications[0] | null>(null);
  const [applicationType, setApplicationType] = useState("");
  const [description, setDescription] = useState("");

  const applications = [
    { 
      id: "APP-2024-001", 
      type: "PIN Rectification", 
      status: "pending", 
      submittedDate: "10/12/2024", 
      officer: "Officer Atieno",
      description: "Request to correct name spelling on KRA PIN certificate",
      updates: [
        { date: "10/12/2024", message: "Application submitted", by: "You" },
        { date: "11/12/2024", message: "Application under review", by: "Officer Atieno" },
      ]
    },
    { 
      id: "APP-2024-002", 
      type: "TCC Application", 
      status: "approved", 
      submittedDate: "05/12/2024", 
      officer: "Officer Mwangi",
      description: "Tax Compliance Certificate for tender application",
      updates: [
        { date: "05/12/2024", message: "Application submitted", by: "You" },
        { date: "06/12/2024", message: "Documents verified", by: "Officer Mwangi" },
        { date: "08/12/2024", message: "TCC approved and ready for download", by: "Officer Mwangi" },
      ]
    },
    { 
      id: "APP-2024-003", 
      type: "Business Registration", 
      status: "action_required", 
      submittedDate: "01/12/2024", 
      officer: "Officer Kamau",
      description: "New business registration for sole proprietorship",
      updates: [
        { date: "01/12/2024", message: "Application submitted", by: "You" },
        { date: "03/12/2024", message: "Additional documents required: Business permit", by: "Officer Kamau" },
      ]
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "approved": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "action_required": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "rejected": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "In Review";
      case "approved": return "Approved";
      case "action_required": return "Action Needed";
      case "rejected": return "Rejected";
      default: return status;
    }
  };

  const handleNewApplication = () => {
    if (!applicationType || !description) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Application Submitted!", {
      description: `Your ${applicationType} application has been submitted successfully.`,
    });
    setNewAppOpen(false);
    setApplicationType("");
    setDescription("");
  };

  const openDetails = (app: typeof applications[0]) => {
    setSelectedApp(app);
    setDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/citizen")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Applications</h1>
              <p className="text-sm text-white/70">Track your applications</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-xs text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-yellow-600">1</p>
              <p className="text-xs text-muted-foreground">In Review</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">1</p>
              <p className="text-xs text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-secondary">1</p>
              <p className="text-xs text-muted-foreground">Action Needed</p>
            </CardContent>
          </Card>
        </div>

        {/* New Application Button */}
        <Dialog open={newAppOpen} onOpenChange={setNewAppOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto gap-2 h-12">
              <Plus className="w-5 h-5" />
              New Application
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                New Application
              </DialogTitle>
              <DialogDescription>
                Submit a new application to KRA.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Application Type *</Label>
                <Select value={applicationType} onValueChange={setApplicationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select application type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TCC Application">TCC Application</SelectItem>
                    <SelectItem value="PIN Registration">PIN Registration</SelectItem>
                    <SelectItem value="PIN Rectification">PIN Rectification</SelectItem>
                    <SelectItem value="Business Registration">Business Registration</SelectItem>
                    <SelectItem value="Tax Exemption">Tax Exemption</SelectItem>
                    <SelectItem value="Waiver Request">Penalty Waiver</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  placeholder="Describe your application..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                You may be required to upload supporting documents after submission.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewAppOpen(false)}>Cancel</Button>
              <Button onClick={handleNewApplication}>Submit Application</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Applications List */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Your Applications
            </CardTitle>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 w-40" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => openDetails(app)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        app.status === "approved" ? "bg-green-500/10" : 
                        app.status === "action_required" ? "bg-red-500/10" : "bg-yellow-500/10"
                      }`}>
                        {app.status === "approved" ? <CheckCircle2 className="w-5 h-5 text-green-600" /> :
                         app.status === "action_required" ? <AlertCircle className="w-5 h-5 text-secondary" /> :
                         <Clock className="w-5 h-5 text-yellow-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{app.type}</p>
                        <p className="text-sm text-muted-foreground">{app.id}</p>
                        <p className="text-xs text-muted-foreground mt-1">{app.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-14 md:ml-0">
                      <Badge variant="outline" className={getStatusColor(app.status)}>
                        {getStatusLabel(app.status)}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        {app.officer}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {app.submittedDate}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Details Dialog */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Application Details
              </DialogTitle>
            </DialogHeader>
            {selectedApp && (
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">{selectedApp.type}</p>
                    <p className="text-sm text-muted-foreground">{selectedApp.id}</p>
                  </div>
                  <Badge variant="outline" className={getStatusColor(selectedApp.status)}>
                    {getStatusLabel(selectedApp.status)}
                  </Badge>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">{selectedApp.description}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedApp.officer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedApp.submittedDate}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-medium text-sm">Activity Timeline</p>
                  <div className="space-y-3">
                    {selectedApp.updates.map((update, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                        <div>
                          <p className="text-sm">{update.message}</p>
                          <p className="text-xs text-muted-foreground">{update.date} • {update.by}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
              <Button onClick={() => {
                toast.info("Opening message composer...");
                setDetailsOpen(false);
              }}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Message Officer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Applications;
