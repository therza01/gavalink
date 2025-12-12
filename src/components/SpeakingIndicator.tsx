import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

interface SpeakingIndicatorProps {
  isActive: boolean;
  className?: string;
}

export const SpeakingIndicator = ({ isActive, className }: SpeakingIndicatorProps) => {
  if (!isActive) return null;

  return (
    <div className={cn("flex flex-col items-center justify-center py-6", className)}>
      {/* Animated Avatar Container */}
      <div className="relative">
        {/* Outer pulse rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: "2s" }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 animate-pulse" />
        </div>
        
        {/* Avatar circle with gradient border */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg animate-pulse">
          <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center">
            <Bot className="w-7 h-7 text-primary" />
          </div>
        </div>
        
        {/* Sound wave bars around avatar */}
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={`left-${i}`}
              className="h-1 bg-primary rounded-full animate-pulse"
              style={{
                width: `${12 + Math.random() * 8}px`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: "0.6s",
              }}
            />
          ))}
        </div>
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={`right-${i}`}
              className="h-1 bg-primary rounded-full animate-pulse"
              style={{
                width: `${12 + Math.random() * 8}px`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: "0.6s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Waveform visualization */}
      <div className="flex items-end justify-center gap-1 h-8 mt-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-primary rounded-full transition-all"
            style={{
              height: `${8 + Math.sin((Date.now() / 200 + i) * 0.5) * 16}px`,
              animation: "waveform 0.5s ease-in-out infinite alternate",
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>

      {/* Speaking text */}
      <p className="text-sm text-muted-foreground mt-3 animate-pulse">
        Amua anazungumza...
      </p>

      <style>{`
        @keyframes waveform {
          0% { height: 8px; }
          100% { height: 24px; }
        }
      `}</style>
    </div>
  );
};
