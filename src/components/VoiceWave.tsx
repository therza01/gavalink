import { cn } from "@/lib/utils";

interface VoiceWaveProps {
  isActive?: boolean;
  className?: string;
  barCount?: number;
}

export const VoiceWave = ({ isActive = false, className, barCount = 5 }: VoiceWaveProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1.5 rounded-full transition-all duration-300",
            isActive ? "voice-wave bg-primary" : "bg-muted-foreground/30"
          )}
          style={{
            height: isActive ? `${Math.random() * 24 + 12}px` : "8px",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};
