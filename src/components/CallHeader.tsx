interface CallHeaderProps {
  isConnected: boolean;
  duration: number;
  isConnecting?: boolean;
}

export const CallHeader = ({ isConnected, duration, isConnecting }: CallHeaderProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      <div className="relative">
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-success animate-pulse" : isConnecting ? "bg-warning animate-pulse" : "bg-muted-foreground"
          }`}
        />
      </div>
      <span className="text-sm text-primary-foreground/80">
        {isConnecting ? "Connecting..." : isConnected ? formatDuration(duration) : "Disconnected"}
      </span>
    </div>
  );
};
