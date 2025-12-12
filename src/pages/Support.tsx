import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft, HelpCircle, MessageSquare, Phone, Mail, MapPin,
  Search, ChevronRight, FileText, CreditCard, Shield, Clock,
  Send, ExternalLink, Mic
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Support = () => {
  const navigate = useNavigate();
  const [ticketOpen, setTicketOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const faqs = [
    {
      question: "How do I file a NIL return?",
      answer: "Log in to your iTax account, go to Returns > File NIL Return. Select the tax period, confirm you had no taxable income, and submit. You'll receive an acknowledgement receipt."
    },
    {
      question: "How do I apply for a Tax Compliance Certificate (TCC)?",
      answer: "Navigate to Applications > New Application > TCC Application. Ensure all your returns are filed and there are no outstanding taxes. The TCC will be processed within 3-5 working days."
    },
    {
      question: "How do I update my KRA PIN details?",
      answer: "Go to Applications > PIN Rectification. Fill in the correction form and upload supporting documents (ID copy, marriage certificate for name changes, etc.). An officer will review and approve."
    },
    {
      question: "What payment methods are available?",
      answer: "KRA accepts payments via M-Pesa (Paybill 572572), bank transfers, and credit/debit cards. Your KRA PIN is your account number for M-Pesa payments."
    },
    {
      question: "How do I check my tax compliance status?",
      answer: "Your compliance score is displayed on your dashboard. A score of 80+ indicates good standing. You can also view detailed status under the Compliance Score section."
    },
    {
      question: "What are the filing deadlines?",
      answer: "Monthly returns are due by the 20th of the following month. Annual returns for individuals are due by 30th June. Corporate returns are due within 6 months after year-end."
    },
  ];

  const supportChannels = [
    { icon: Phone, label: "Call Center", value: "+254 20 281 7700", action: () => window.open("tel:+254202817700") },
    { icon: Mail, label: "Email", value: "callcentre@kra.go.ke", action: () => window.open("mailto:callcentre@kra.go.ke") },
    { icon: MessageSquare, label: "Live Chat", value: "Available 8am-5pm", action: () => toast.info("Live chat coming soon") },
    { icon: MapPin, label: "Service Centers", value: "Find nearest", action: () => toast.info("Opening KRA service center locator...") },
  ];

  const handleSubmitTicket = () => {
    if (!category || !subject || !message) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Support Ticket Submitted!", {
      description: "We'll respond within 24-48 hours.",
    });
    setTicketOpen(false);
    setCategory("");
    setSubject("");
    setMessage("");
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
              <h1 className="text-xl font-bold">Support & Help</h1>
              <p className="text-sm text-white/70">Get assistance with your tax matters</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {supportChannels.map((channel, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={channel.action}
            >
              <CardContent className="p-4 text-center">
                <channel.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="font-medium text-sm">{channel.label}</p>
                <p className="text-xs text-muted-foreground">{channel.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Voice AI Assistant */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Mic className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Voice AI Assistant</h3>
                  <p className="text-sm text-white/80">Get instant help in Swahili or English</p>
                </div>
              </div>
              <Button 
                onClick={() => navigate("/call")}
                className="bg-white text-primary hover:bg-white/90"
              >
                Start Call
              </Button>
            </div>
          </div>
        </Card>

        {/* Submit Ticket */}
        <Dialog open={ticketOpen} onOpenChange={setTicketOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto gap-2 h-12">
              <Send className="w-5 h-5" />
              Submit Support Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Submit Support Ticket
              </DialogTitle>
              <DialogDescription>
                Our team will respond within 24-48 hours.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="returns">Tax Returns</SelectItem>
                    <SelectItem value="payments">Payments</SelectItem>
                    <SelectItem value="pin">KRA PIN Issues</SelectItem>
                    <SelectItem value="tcc">TCC Application</SelectItem>
                    <SelectItem value="technical">Technical Issues</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Subject *</Label>
                <Input
                  placeholder="Brief description of your issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Message *</Label>
                <Textarea
                  placeholder="Describe your issue in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setTicketOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* FAQs */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-primary" />
              Useful Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { icon: FileText, label: "Tax Guides & Tutorials", desc: "Step-by-step filing guides" },
                { icon: CreditCard, label: "Payment Instructions", desc: "How to pay via M-Pesa & Bank" },
                { icon: Shield, label: "TCC Requirements", desc: "Documents needed for TCC" },
                { icon: Clock, label: "Filing Deadlines", desc: "Important tax dates" },
              ].map((link, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => toast.info(link.label, { description: "Opening resource..." })}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{link.label}</p>
                    <p className="text-xs text-muted-foreground">{link.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Support;
