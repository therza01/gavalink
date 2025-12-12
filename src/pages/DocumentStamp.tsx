import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, FileCheck, Upload, Stamp, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import gavaLinkLogo from "@/assets/gavalink-logo.png";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: "pending" | "stamped";
}

const DocumentStamp = () => {
  const navigate = useNavigate();
  const [stampType, setStampType] = useState("");
  const [documents, setDocuments] = useState<Document[]>([
    { id: "DOC-001", name: "Tax Clearance Certificate - A001234567X.pdf", type: "TCC", uploadedAt: "2024-12-10", status: "pending" },
    { id: "DOC-002", name: "PIN Certificate - A009876543B.pdf", type: "PIN Cert", uploadedAt: "2024-12-10", status: "stamped" },
    { id: "DOC-003", name: "Compliance Letter - A005432198C.pdf", type: "Letter", uploadedAt: "2024-12-11", status: "pending" },
  ]);

  const handleStamp = (docId: string) => {
    if (!stampType) {
      toast.error("Please select a stamp type first");
      return;
    }

    setDocuments(docs => 
      docs.map(doc => 
        doc.id === docId ? { ...doc, status: "stamped" as const } : doc
      )
    );
    toast.success("Document stamped successfully", { description: `Applied ${stampType} stamp` });
  };

  const handleStampAll = () => {
    if (!stampType) {
      toast.error("Please select a stamp type first");
      return;
    }

    setDocuments(docs => docs.map(doc => ({ ...doc, status: "stamped" as const })));
    toast.success("All documents stamped", { description: `Applied ${stampType} stamp to all pending documents` });
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
              <span className="font-bold">Document Stamp</span>
              <p className="text-xs opacity-80">System Tools</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Controls Card */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-accent" />
              Stamp Configuration
            </CardTitle>
            <CardDescription>
              Select stamp type and apply to documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-48">
                <label className="text-sm font-medium mb-2 block">Stamp Type</label>
                <Select value={stampType} onValueChange={setStampType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stamp type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="certified">Certified True Copy</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="processed">Processed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Documents
              </Button>
              <Button onClick={handleStampAll} className="bg-primary hover:bg-primary/90">
                <Stamp className="w-4 h-4 mr-2" />
                Stamp All Pending
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle>Document Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document ID</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-mono">{doc.id}</TableCell>
                      <TableCell className="max-w-48 truncate">{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.uploadedAt}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          doc.status === "stamped" 
                            ? "bg-success/20 text-success" 
                            : "bg-warning/20 text-warning"
                        }`}>
                          {doc.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {doc.status === "pending" && (
                            <Button variant="ghost" size="sm" onClick={() => handleStamp(doc.id)}>
                              <Stamp className="w-4 h-4" />
                            </Button>
                          )}
                          {doc.status === "stamped" && (
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DocumentStamp;
