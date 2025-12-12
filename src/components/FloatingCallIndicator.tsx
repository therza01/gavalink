import { useNavigate, useLocation } from "react-router-dom";
import { Phone, X, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCall } from "@/contexts/CallContext";
import { cn } from "@/lib/utils";

export const FloatingCallIndicator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isInCall, isConnected, duration, endCall } = useCall();

  // Don't show on the call page itself
  if (!isInCall || location.pathname === "/call") {
    return null;
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="bg-primary text-primary-foreground rounded-2xl shadow-2xl overflow-hidden">
        {/* Mini call display */}
        <div 
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/10 transition-colors"
          onClick={() => navigate("/call")}
        >
          {/* Animated indicator */}
          <div className="relative">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              isConnected ? "bg-green-500" : "bg-yellow-500"
            )}>
              <Mic className="w-5 h-5 text-white" />
            </div>
            {isConnected && (
              <>
                <div className="absolute inset-0 rounded-full bg-green-500/50 animate-ping" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </>
            )}
          </div>

          {/* Call info */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {isConnected ? "Live na Amua" : "Connecting..."}
            </span>
            {isConnected && (
              <span className="text-xs text-white/70">{formatDuration(duration)}</span>
            )}
          </div>

          {/* Waveform visualization when connected */}
          {isConnected && (
            <div className="flex items-center gap-0.5 ml-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-white/70 rounded-full animate-pulse"
                  style={{
                    height: `${8 + Math.random() * 8}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex border-t border-white/20">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 rounded-none text-white hover:bg-white/10 gap-2"
            onClick={() => navigate("/call")}
          >
            <Phone className="w-4 h-4" />
            Return
          </Button>
          <div className="w-px bg-white/20" />
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 rounded-none text-red-300 hover:bg-red-500/20 gap-2"
            onClick={endCall}
          >
            <X className="w-4 h-4" />
            End
          </Button>
        </div>
      </div>
    </div>
  );
};
