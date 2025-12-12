import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft, CreditCard, Calendar, CheckCircle2, Clock, Download,
  AlertCircle, Plus, Search, Phone, Wallet
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

const Payments = () => {
  const navigate = useNavigate();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const payments = [
    { id: "PAY-2024-001", type: "Income Tax", amount: "KES 15,000", status: "completed", date: "10/10/2024", method: "M-Pesa", receipt: "QR2024ABC123" },
    { id: "PAY-2024-002", type: "VAT", amount: "KES 8,500", status: "completed", date: "05/09/2024", method: "M-Pesa", receipt: "QR2024DEF456" },
    { id: "PAY-2024-003", type: "Penalty", amount: "KES 2,000", status: "completed", date: "20/08/2024", method: "Bank", receipt: "BNK2024GHI789" },
  ];

  const pendingPayments = [
    { type: "Withholding Tax", amount: "KES 0", deadline: "20/11/2024" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "pending": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "failed": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleMakePayment = () => {
    if (!paymentType || !amount || !phoneNumber) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!/^(\+254|0)[17]\d{8}$/.test(phoneNumber)) {
      toast.error("Please enter a valid Kenyan phone number");
      return;
    }
    toast.success("M-Pesa STK Push Sent!", {
      description: `Please enter your M-Pesa PIN on your phone to complete payment of ${amount}`,
    });
    setPaymentOpen(false);
    setPaymentType("");
    setAmount("");
    setPhoneNumber("");
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
              <h1 className="text-xl font-bold">Payments</h1>
              <p className="text-sm text-white/70">View and make tax payments</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">KES 0</p>
              <p className="text-xs text-muted-foreground">Outstanding Balance</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">KES 25.5K</p>
              <p className="text-xs text-muted-foreground">Total Paid (2024)</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Transactions</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Make Payment Button */}
        <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto gap-2 h-12 bg-green-600 hover:bg-green-700">
              <Wallet className="w-5 h-5" />
              Make Payment via M-Pesa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                M-Pesa Payment
              </DialogTitle>
              <DialogDescription>
                Pay your taxes securely via M-Pesa Paybill.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20 text-center">
                <p className="text-sm text-muted-foreground">Paybill Number</p>
                <p className="text-2xl font-bold text-green-600">572572</p>
                <p className="text-xs text-muted-foreground mt-1">Account: Your KRA PIN</p>
              </div>
              <div className="space-y-2">
                <Label>Payment Type *</Label>
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income_tax">Income Tax</SelectItem>
                    <SelectItem value="vat">VAT</SelectItem>
                    <SelectItem value="paye">PAYE</SelectItem>
                    <SelectItem value="withholding">Withholding Tax</SelectItem>
                    <SelectItem value="penalty">Penalty</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Amount (KES) *</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>M-Pesa Phone Number *</Label>
                <Input
                  type="tel"
                  placeholder="0712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPaymentOpen(false)}>Cancel</Button>
              <Button onClick={handleMakePayment} className="bg-green-600 hover:bg-green-700">
                Send STK Push
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Pending Payments */}
        {pendingPayments.length > 0 && (
          <Card className="border-0 shadow-lg border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Payment Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-green-500/10 rounded-xl text-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-lg font-semibold text-green-600">All Payments Up to Date</p>
                <p className="text-sm text-muted-foreground">You have no outstanding tax obligations</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment History */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Payment History
            </CardTitle>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 w-40" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer gap-3"
                  onClick={() => toast.info("Payment Details", { description: `Receipt: ${payment.receipt}` })}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{payment.type}</p>
                      <p className="text-sm text-muted-foreground">{payment.method} • {payment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-14 md:ml-0">
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{payment.amount}</p>
                      <p className="text-xs text-muted-foreground">{payment.receipt}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(payment.status)}>
                      {payment.status === "completed" ? "Paid" : "Pending"}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={(e) => {
                      e.stopPropagation();
                      toast.success("Downloading receipt...");
                    }}>
                      <Download className="w-4 h-4" />
                    </Button>
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

export default Payments;
