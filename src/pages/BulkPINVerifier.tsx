import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Search, CheckCircle2, XCircle, Upload, Download, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import gavaLinkLogo from "@/assets/gavalink-logo.png";

interface PINResult {
  pin: string;
  name: string;
  status: "valid" | "invalid" | "pending";
  message: string;
}

const BulkPINVerifier = () => {
  const navigate = useNavigate();
  const [pinInput, setPinInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [results, setResults] = useState<PINResult[]>([]);

  const handleVerify = async () => {
    if (!pinInput.trim()) {
      toast.error("Please enter at least one PIN to verify");
      return;
    }

    setIsVerifying(true);
    const pins = pinInput.split(/[\n,]+/).map(p => p.trim()).filter(p => p);

    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResults: PINResult[] = pins.map((pin, index) => ({
      pin,
      name: index % 3 === 0 ? "John Kamau" : index % 3 === 1 ? "Mary Wanjiku" : "Peter Ochieng",
      status: index % 4 === 0 ? "invalid" : "valid",
      message: index % 4 === 0 ? "PIN not found in registry" : "Verified - Active taxpayer",
    }));

    setResults(mockResults);
    setIsVerifying(false);
    toast.success(`Verified ${pins.length} PIN(s)`);
  };

  const handleExport = () => {
    toast.success("Exporting results...", { description: "CSV file will download shortly" });
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
              <span className="font-bold">Bulk PIN Verifier</span>
              <p className="text-xs opacity-80">System Tools</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Input Card */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Enter PINs to Verify
            </CardTitle>
            <CardDescription>
              Enter multiple KRA PINs separated by commas or new lines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="A001234567X&#10;A009876543B&#10;A005432198C"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="min-h-32 font-mono"
            />
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleVerify} 
                disabled={isVerifying}
                className="bg-primary hover:bg-primary/90"
              >
                {isVerifying ? (
                  <>Verifying...</>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Verify PINs
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        {results.length > 0 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Verification Results</CardTitle>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>KRA PIN</TableHead>
                      <TableHead>Taxpayer Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono">{result.pin}</TableCell>
                        <TableCell>{result.name}</TableCell>
                        <TableCell>
                          <span className={`flex items-center gap-1 ${result.status === "valid" ? "text-success" : "text-secondary"}`}>
                            {result.status === "valid" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            {result.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{result.message}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default BulkPINVerifier;
