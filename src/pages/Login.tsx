import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, Shield, Lock, Mail, Phone, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const [citizenForm, setCitizenForm] = useState({ phone: "", password: "" });
  const [officerForm, setOfficerForm] = useState({ email: "", password: "", otp: "" });

  const handleCitizenLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/citizen");
  };

  const handleOfficerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/officer");
  };

  return (
    <div className="min-h-screen bg-background kitenge-pattern">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">GavaLink</h1>
              <p className="text-xs text-muted-foreground">Government Services Portal</p>
            </div>
          </div>
          <div className="trust-badge">
            <Lock className="w-3.5 h-3.5" />
            <span>Secured</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Your Secure Link to Government Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access tax information, communicate with officers, and manage your government records in one place.
          </p>
        </div>

        {/* Login Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Citizen Login */}
          <Card className="shadow-card hover:shadow-soft transition-shadow animate-fade-in border-2 border-primary/20">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Wananchi</CardTitle>
              <CardDescription className="text-base">Log In Here - Citizen Portal</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCitizenLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone Number / Email</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="07XX XXX XXX or email"
                      className="pl-10"
                      value={citizenForm.phone}
                      onChange={(e) => setCitizenForm({ ...citizenForm, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Enter password"
                      className="pl-10"
                      value={citizenForm.password}
                      onChange={(e) => setCitizenForm({ ...citizenForm, password: e.target.value })}
                    />
                  </div>
                </div>
                <button type="button" className="text-sm text-accent hover:underline">
                  Forgot PIN?
                </button>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Enter My Portal
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Officer Login */}
          <Card className="shadow-card hover:shadow-soft transition-shadow animate-fade-in border-2 border-accent/20" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Government Officer</CardTitle>
              <CardDescription className="text-base">Officer Portal Login</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOfficerLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Official Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="name@kra.go.ke"
                      className="pl-10"
                      value={officerForm.email}
                      onChange={(e) => setOfficerForm({ ...officerForm, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Enter password"
                      className="pl-10"
                      value={officerForm.password}
                      onChange={(e) => setOfficerForm({ ...officerForm, password: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">2FA Code</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter 6-digit code"
                      className="pl-10"
                      maxLength={6}
                      value={officerForm.otp}
                      onChange={(e) => setOfficerForm({ ...officerForm, otp: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Access Officer Dashboard
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Shield className="w-4 h-4" />
            <span>Secured by GavaLink • Kenya Revenue Authority Partner</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;