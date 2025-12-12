import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, Users, FileText, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import gavaLinkLogo from "@/assets/gavalink-logo.png";

const Analytics = () => {
  const navigate = useNavigate();

  const caseVolume = [
    { month: "Jul", cases: 45 },
    { month: "Aug", cases: 52 },
    { month: "Sep", cases: 48 },
    { month: "Oct", cases: 61 },
    { month: "Nov", cases: 55 },
    { month: "Dec", cases: 68 },
  ];

  const resolutionTime = [
    { day: "Mon", time: 2.5 },
    { day: "Tue", time: 3.1 },
    { day: "Wed", time: 2.8 },
    { day: "Thu", time: 2.2 },
    { day: "Fri", time: 3.5 },
  ];

  const caseCategories = [
    { name: "PIN Issues", value: 35, color: "hsl(0 85% 45%)" },
    { name: "TCC Applications", value: 28, color: "hsl(0 0% 8%)" },
    { name: "Tax Queries", value: 20, color: "hsl(0 0% 45%)" },
    { name: "Refunds", value: 12, color: "hsl(0 85% 65%)" },
    { name: "Other", value: 5, color: "hsl(0 0% 70%)" },
  ];

  const stats = [
    { label: "Total Cases This Month", value: "68", change: "+12%", trend: "up", icon: FileText },
    { label: "Avg. Resolution Time", value: "2.8 days", change: "-8%", trend: "down", icon: Clock },
    { label: "Active Taxpayers", value: "3,420", change: "+5%", trend: "up", icon: Users },
    { label: "Cases Resolved", value: "52", change: "+18%", trend: "up", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-officer-charcoal text-primary-foreground sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground hover:bg-accent/20"
              onClick={() => navigate("/officer")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img src={gavaLinkLogo} alt="GavaLink Logo" className="h-10 w-auto bg-white rounded-lg p-1" />
            <div>
              <span className="font-bold">Analytics Dashboard</span>
              <p className="text-xs opacity-80">System Tools</p>
            </div>
          </div>
          <Select defaultValue="30">
            <SelectTrigger className="w-40 bg-transparent border-primary-foreground/30 text-primary-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">This year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <stat.icon className="w-5 h-5 text-muted-foreground" />
                    <span className={`text-xs font-medium flex items-center gap-0.5 ${
                      stat.trend === "up" ? "text-success" : "text-secondary"
                    }`}>
                      {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Case Volume Chart */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                Case Volume
              </CardTitle>
              <CardDescription>Monthly case submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={caseVolume}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        background: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem"
                      }} 
                    />
                    <Bar dataKey="cases" fill="hsl(0 85% 45%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Resolution Time Chart */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Resolution Time
              </CardTitle>
              <CardDescription>Average days to resolve by weekday</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={resolutionTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        background: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem"
                      }} 
                    />
                    <Line type="monotone" dataKey="time" stroke="hsl(0 0% 8%)" strokeWidth={2} dot={{ fill: "hsl(0 85% 45%)" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Case Categories */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle>Case Categories Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={caseCategories}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {caseCategories.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                {caseCategories.map((category) => (
                  <div key={category.name} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ background: category.color }} />
                    <div>
                      <p className="font-medium text-foreground">{category.name}</p>
                      <p className="text-sm text-muted-foreground">{category.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;
