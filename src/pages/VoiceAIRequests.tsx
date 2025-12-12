import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  ArrowLeft, Mic, CheckCircle2, XCircle, Clock, 
  MessageSquare, User, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import gavaLinkLogo from "@/assets/gavalink-logo.png";

interface VoiceRequest {
  id: string;
  user_id: string;
  request_type: string;
  description: string;
  status: string;
  priority: string;
  officer_notes: string | null;
  created_at: string;
  updated_at: string;
}

const VoiceAIRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<VoiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<VoiceRequest | null>(null);
  const [officerNotes, setOfficerNotes] = useState("");
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('voice_agent_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('voice-requests-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'voice_agent_requests'
        },
        () => {
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleAction = async () => {
    if (!selectedRequest) return;

    try {
      const { error } = await supabase
        .from('voice_agent_requests')
        .update({
          status: actionType === "approve" ? "approved" : "rejected",
          officer_notes: officerNotes || null
        })
        .eq('id', selectedRequest.id);

      if (error) throw error;

      toast.success(
        actionType === "approve" ? "Request Approved" : "Request Rejected",
        { description: `Request has been ${actionType === "approve" ? "approved" : "rejected"} successfully` }
      );

      setActionDialogOpen(false);
      setSelectedRequest(null);
      setOfficerNotes("");
      fetchRequests();
    } catch (error) {
      console.error('Error updating request:', error);
      toast.error("Failed to update request");
    }
  };

  const openActionDialog = (request: VoiceRequest, type: "approve" | "reject") => {
    setSelectedRequest(request);
    setActionType(type);
    setOfficerNotes("");
    setActionDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/20 text-warning";
      case "approved":
        return "bg-success/20 text-success";
      case "rejected":
        return "bg-secondary/20 text-secondary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-secondary/20 text-secondary";
      case "medium":
        return "bg-warning/20 text-warning";
      case "low":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-KE', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
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
              <span className="font-bold">Voice AI Requests</span>
              <p className="text-xs opacity-80">Manage citizen requests from AI assistant</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-accent/20"
            onClick={fetchRequests}
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{requests.length}</p>
                  <p className="text-xs text-muted-foreground">Total Requests</p>
                </div>
                <Mic className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {requests.filter(r => r.status === 'pending').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {requests.filter(r => r.status === 'approved').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Approved</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {requests.filter(r => r.status === 'rejected').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Rejected</p>
                </div>
                <XCircle className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Voice Agent Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Mic className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No voice agent requests yet</p>
                <p className="text-sm">Requests made by citizens through the AI voice assistant will appear here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="text-sm">
                          {formatDate(request.created_at)}
                        </TableCell>
                        <TableCell className="font-medium capitalize">
                          {request.request_type.replace(/_/g, ' ')}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {request.description}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(request.status)}`}>
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {request.status === 'pending' ? (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-success hover:text-success hover:bg-success/10"
                                onClick={() => openActionDialog(request, "approve")}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-secondary hover:text-secondary hover:bg-secondary/10"
                                onClick={() => openActionDialog(request, "reject")}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              {request.officer_notes ? (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setSelectedRequest(request);
                                  }}
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                              ) : (
                                "—"
                              )}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Approve Request" : "Reject Request"}
            </DialogTitle>
            <DialogDescription>
              {selectedRequest?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Officer Notes (Optional)</label>
              <Textarea
                placeholder="Add any notes for this decision..."
                value={officerNotes}
                onChange={(e) => setOfficerNotes(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              className={actionType === "approve" ? "bg-success hover:bg-success/90" : "bg-secondary hover:bg-secondary/90"}
            >
              {actionType === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VoiceAIRequests;
