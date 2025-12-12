import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Send, Users, Clock, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import gavaLinkLogo from "@/assets/gavalink-logo.png";

interface BroadcastHistory {
  id: string;
  subject: string;
  recipients: number;
  sentAt: string;
  status: "sent" | "scheduled";
}

const BroadcastUpdate = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState("");
  const [targetGroup, setTargetGroup] = useState("");
  const [isSending, setIsSending] = useState(false);

  const history: BroadcastHistory[] = [
    { id: "BC-001", subject: "Tax Filing Deadline Reminder", recipients: 1250, sentAt: "2024-12-10 09:00", status: "sent" },
    { id: "BC-002", subject: "iTax System Maintenance Notice", recipients: 3400, sentAt: "2024-12-08 14:30", status: "sent" },
    { id: "BC-003", subject: "New VAT Regulations Update", recipients: 890, sentAt: "2024-12-15 08:00", status: "scheduled" },
  ];

  const handleSend = async () => {
    if (!subject || !message || !channel || !targetGroup) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);

    toast.success("Broadcast sent successfully", { 
      description: `Message sent to ${targetGroup} recipients via ${channel}` 
    });
    setSubject("");
    setMessage("");
    setChannel("");
    setTargetGroup("");
  };

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
              <span className="font-bold">Broadcast Update</span>
              <p className="text-xs opacity-80">System Tools</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Compose Card */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5 text-accent" />
                Compose Broadcast
              </CardTitle>
              <CardDescription>
                Send updates to taxpayers in your jurisdiction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Target Group</label>
                <Select value={targetGroup} onValueChange={setTargetGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Taxpayers (3,400)</SelectItem>
                    <SelectItem value="active">Active Filers (2,100)</SelectItem>
                    <SelectItem value="pending">Pending Cases (450)</SelectItem>
                    <SelectItem value="new">New Registrations (320)</SelectItem>
                    <SelectItem value="non-compliant">Non-Compliant (180)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Channel</label>
                <Select value={channel} onValueChange={setChannel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                    <SelectItem value="all-channels">All Channels</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input
                  placeholder="Enter message subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  placeholder="Type your broadcast message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-32"
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="urgent" />
                <label htmlFor="urgent" className="text-sm">Mark as urgent</label>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleSend} 
                  disabled={isSending}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {isSending ? "Sending..." : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Now
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* History Card */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Recent Broadcasts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {history.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-foreground">{item.subject}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "sent" 
                          ? "bg-success/20 text-success" 
                          : "bg-warning/20 text-warning"
                      }`}>
                        {item.status === "sent" ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Sent
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Scheduled
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {item.recipients} recipients
                      </span>
                      <span>{item.sentAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BroadcastUpdate;
