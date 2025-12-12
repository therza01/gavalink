import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft, FileText, Calendar, CheckCircle2, Clock, Upload,
  Download, AlertCircle, Plus, Search, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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

const Returns = () => {
  const navigate = useNavigate();
  const [fileNilOpen, setFileNilOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [incomeSource, setIncomeSource] = useState("");

  const returns = [
    { id: "RET-2024-001", type: "NIL Return", period: "October 2024", status: "filed", filedDate: "15/10/2024", amount: "KES 0" },
    { id: "RET-2024-002", type: "NIL Return", period: "September 2024", status: "filed", filedDate: "14/09/2024", amount: "KES 0" },
    { id: "RET-2024-003", type: "NIL Return", period: "August 2024", status: "filed", filedDate: "12/08/2024", amount: "KES 0" },
    { id: "RET-2024-004", type: "Annual Return", period: "2023", status: "pending", filedDate: "-", amount: "KES 0" },
  ];

  const upcomingDeadlines = [
    { period: "November 2024", deadline: "20/11/2024", type: "Monthly NIL", daysLeft: 8 },
    { period: "December 2024", deadline: "20/12/2024", type: "Monthly NIL", daysLeft: 38 },
    { period: "2024 Annual", deadline: "30/06/2025", type: "Annual Return", daysLeft: 200 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "filed": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "pending": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "overdue": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleFileNilReturn = () => {
    if (!selectedYear || !selectedMonth || !incomeSource) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("NIL Return Filed Successfully!", {
      description: `Your NIL return for ${selectedMonth} ${selectedYear} has been submitted.`,
    });
    setFileNilOpen(false);
    setSelectedYear("");
    setSelectedMonth("");
    setIncomeSource("");
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
              <h1 className="text-xl font-bold">Tax Returns</h1>
              <p className="text-sm text-white/70">Manage and file your tax returns</p>
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
              <p className="text-xs text-muted-foreground">Returns Filed</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-yellow-600">1</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-xs text-muted-foreground">Overdue</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-foreground">KES 0</p>
              <p className="text-xs text-muted-foreground">Total Tax Due</p>
            </CardContent>
          </Card>
        </div>

        {/* File New Return Button */}
        <Dialog open={fileNilOpen} onOpenChange={setFileNilOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto gap-2 h-12">
              <Plus className="w-5 h-5" />
              File New NIL Return
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                File NIL Return
              </DialogTitle>
              <DialogDescription>
                Submit a NIL return when you have no taxable income for the period.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tax Year *</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Month *</Label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="January">January</SelectItem>
                    <SelectItem value="February">February</SelectItem>
                    <SelectItem value="March">March</SelectItem>
                    <SelectItem value="April">April</SelectItem>
                    <SelectItem value="May">May</SelectItem>
                    <SelectItem value="June">June</SelectItem>
                    <SelectItem value="July">July</SelectItem>
                    <SelectItem value="August">August</SelectItem>
                    <SelectItem value="September">September</SelectItem>
                    <SelectItem value="October">October</SelectItem>
                    <SelectItem value="November">November</SelectItem>
                    <SelectItem value="December">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Income Source *</Label>
                <Select value={incomeSource} onValueChange={setIncomeSource}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select income source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employment">Employment Income</SelectItem>
                    <SelectItem value="business">Business Income</SelectItem>
                    <SelectItem value="rental">Rental Income</SelectItem>
                    <SelectItem value="other">Other Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Declaration</p>
                <p>I declare that I had no taxable income during this period and all information provided is accurate.</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFileNilOpen(false)}>Cancel</Button>
              <Button onClick={handleFileNilReturn}>Submit NIL Return</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Upcoming Deadlines */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-xl border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{deadline.type}</Badge>
                    <span className={`text-xs font-medium ${deadline.daysLeft < 10 ? 'text-secondary' : 'text-muted-foreground'}`}>
                      {deadline.daysLeft} days left
                    </span>
                  </div>
                  <p className="font-semibold text-foreground">{deadline.period}</p>
                  <p className="text-sm text-muted-foreground">Due: {deadline.deadline}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Returns History */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Returns History
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9 w-40" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {returns.map((ret) => (
                <div
                  key={ret.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer gap-3"
                  onClick={() => toast.info(ret.type, { description: `${ret.id} - ${ret.period}` })}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{ret.type}</p>
                      <p className="text-sm text-muted-foreground">{ret.period}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-14 md:ml-0">
                    <div className="text-right">
                      <p className="text-sm font-medium">{ret.amount}</p>
                      <p className="text-xs text-muted-foreground">Filed: {ret.filedDate}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(ret.status)}>
                      {ret.status === "filed" ? "Filed" : "Pending"}
                    </Badge>
                    {ret.status === "filed" && (
                      <Button variant="ghost" size="icon" onClick={(e) => {
                        e.stopPropagation();
                        toast.success("Downloading acknowledgement...");
                      }}>
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Returns;
