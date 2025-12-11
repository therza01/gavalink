import { Button } from "@/components/ui/button";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import { VoiceWave } from "./VoiceWave";
import { QuickActions } from "./QuickActions";

interface VoiceControlsProps {
  isRecording: boolean;
  isSpeaking: boolean;
  onToggleRecording: () => void;
  onEndCall: () => void;
  onQuickAction: (action: string) => void;
}

export const VoiceControls = ({
  isRecording,
  isSpeaking,
  onToggleRecording,
  onEndCall,
  onQuickAction,
}: VoiceControlsProps) => {
  return (
    <div className="border-t border-border bg-card p-6 space-y-6">
      {/* Voice Indicator */}
      <div className="flex items-center justify-center h-12">
        {isSpeaking ? (
          <div className="flex items-center gap-3">
            <VoiceWave isActive className="h-8" />
            <span className="text-sm text-muted-foreground">Amua anazungumza...</span>
          </div>
        ) : isRecording ? (
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
            <span className="text-sm text-foreground font-medium">Inasikia...</span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">
            Bonyeza na uzungumze kwa Kiswahili au Kiingereza
          </span>
        )}
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center gap-6">
        <Button
          variant="call-end"
          size="icon-lg"
          onClick={onEndCall}
          className="rounded-full"
        >
          <PhoneOff className="w-6 h-6" />
        </Button>

        <div className="relative">
          <Button
            variant="call"
            size="icon-xl"
            onClick={onToggleRecording}
            className={`rounded-full transition-all duration-300 ${
              isRecording ? "bg-destructive hover:bg-destructive/90 scale-110" : ""
            }`}
          >
            {isRecording ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </Button>
          {isRecording && (
            <>
              <div className="absolute inset-0 rounded-full bg-destructive/30 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse" />
            </>
          )}
        </div>

        <div className="w-14" /> {/* Spacer for balance */}
      </div>

      {/* Quick Actions */}
      <QuickActions onAction={onQuickAction} />
    </div>
  );
};
