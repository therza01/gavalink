import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft, FileText, Folder, Download, Upload, Eye, Trash2,
  Search, Filter, Shield, CreditCard, File, Image, Plus
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

const Documents = () => {
  const navigate = useNavigate();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const documents = [
    { id: "DOC-001", name: "TCC Certificate 2024", type: "certificate", category: "TCC", size: "245 KB", date: "01/10/2024", status: "valid" },
    { id: "DOC-002", name: "NIL Return Oct 2024", type: "return", category: "Returns", size: "128 KB", date: "15/10/2024", status: "filed" },
    { id: "DOC-003", name: "Payment Receipt - Oct", type: "receipt", category: "Payments", size: "89 KB", date: "10/10/2024", status: "verified" },
    { id: "DOC-004", name: "National ID Copy", type: "id", category: "ID Documents", size: "1.2 MB", date: "05/01/2024", status: "uploaded" },
    { id: "DOC-005", name: "KRA PIN Certificate", type: "certificate", category: "PIN", size: "156 KB", date: "15/03/2023", status: "valid" },
    { id: "DOC-006", name: "Business Registration", type: "business", category: "Business", size: "2.1 MB", date: "20/06/2023", status: "valid" },
  ];

  const categories = [
    { id: "all", label: "All Documents", count: 6 },
    { id: "certificate", label: "Certificates", count: 2 },
    { id: "return", label: "Tax Returns", count: 1 },
    { id: "receipt", label: "Receipts", count: 1 },
    { id: "id", label: "ID Documents", count: 1 },
    { id: "business", label: "Business Docs", count: 1 },
  ];

  const filteredDocuments = activeCategory === "all" 
    ? documents 
    : documents.filter(doc => doc.type === activeCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "filed": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "verified": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "uploaded": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "expired": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getDocIcon = (type: string) => {
    switch (type) {
      case "certificate": return Shield;
      case "id": return CreditCard;
      case "receipt": return FileText;
      default: return File;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!documentType || !selectedFile) {
      toast.error("Please select document type and file");
      return;
    }
    toast.success("Document Uploaded Successfully!", {
      description: `${selectedFile.name} has been uploaded.`,
    });
    setUploadOpen(false);
    setDocumentType("");
    setSelectedFile(null);
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
              <h1 className="text-xl font-bold">Documents</h1>
              <p className="text-sm text-white/70">Manage your tax documents</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">6</p>
              <p className="text-xs text-muted-foreground">Total Documents</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">4</p>
              <p className="text-xs text-muted-foreground">Valid/Verified</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-foreground">3.9 MB</p>
              <p className="text-xs text-muted-foreground">Storage Used</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-xs text-muted-foreground">Expired</p>
            </CardContent>
          </Card>
        </div>

        {/* Upload Button */}
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto gap-2 h-12">
              <Upload className="w-5 h-5" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload Document
              </DialogTitle>
              <DialogDescription>
                Upload supporting documents for your tax records.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Document Type *</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">National ID</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="business_reg">Business Registration</SelectItem>
                    <SelectItem value="bank_statement">Bank Statement</SelectItem>
                    <SelectItem value="payslip">Payslip</SelectItem>
                    <SelectItem value="invoice">Invoice</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Select File *</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileSelect}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {selectedFile ? (
                    <div>
                      <File className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to select file</p>
                      <p className="text-xs text-muted-foreground">PDF, JPG, PNG, DOC (max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
              <Button onClick={handleUpload}>Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <Card className="border-0 shadow-lg lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <Badge variant="secondary" className="ml-2">{cat.count}</Badge>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Documents List */}
          <Card className="border-0 shadow-lg lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Folder className="w-5 h-5 text-primary" />
                {categories.find(c => c.id === activeCategory)?.label || "All Documents"}
              </CardTitle>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9 w-40" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDocuments.map((doc) => {
                  const DocIcon = getDocIcon(doc.type);
                  return (
                    <div
                      key={doc.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors gap-3"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <DocIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.category} • {doc.size} • {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-14 md:ml-0">
                        <Badge variant="outline" className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="icon" onClick={() => toast.info("Preview", { description: `Viewing ${doc.name}` })}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => toast.success(`Downloading ${doc.name}...`)}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Documents;
