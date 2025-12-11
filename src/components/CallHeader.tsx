import { MapPin } from "lucide-react";

interface CallHeaderProps {
  isConnected: boolean;
  duration: number;
}

export const CallHeader = ({ isConnected, duration }: CallHeaderProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <header className="gradient-header text-primary-foreground p-4 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-mpesa-green animate-pulse" : "bg-muted-foreground"
              }`}
            />
            {isConnected && (
              <div className="pulse-ring bg-mpesa-green/50" />
            )}
          </div>
          <div>
            <span className="font-semibold text-sm tracking-wide">
              {isConnected ? "LIVE NA AMUA" : "KUUNGANISHA..."}
            </span>
            {isConnected && (
              <span className="text-primary-foreground/80 text-sm ml-2">
                • {formatDuration(duration)}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-primary-foreground/80">
          <MapPin className="w-4 h-4" />
          <span>Nairobi</span>
        </div>
      </div>
    </header>
  );
};
