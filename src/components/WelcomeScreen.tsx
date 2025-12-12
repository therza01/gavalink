import { Button } from "@/components/ui/button";
import { Phone, Shield } from "lucide-react";
import gavaLinkLogo from "@/assets/gavalink-logo.png";

interface WelcomeScreenProps {
  onStartCall: () => void;
}

export const WelcomeScreen = ({ onStartCall }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 flex flex-col items-center justify-center p-6">
      {/* Phone Call Card */}
      <div className="bg-card rounded-3xl p-8 text-center max-w-sm w-full shadow-2xl animate-fade-in">
        {/* Logo/Avatar */}
        <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-4 border-border shadow-lg">
          <img src={gavaLinkLogo} alt="GavaLink" className="w-20 h-20 object-contain" />
        </div>

        {/* Caller Name */}
        <h1 className="text-xl font-bold text-foreground mb-1">
          Amua - KRA Assistant
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Voice AI Support
        </p>

        {/* Call Button */}
        <Button
          onClick={onStartCall}
          className="w-full h-14 rounded-full bg-success hover:bg-success/90 text-success-foreground text-lg font-semibold shadow-lg"
        >
          <Phone className="w-5 h-5 mr-2" />
          Anza Simu Sasa
        </Button>

        <p className="text-xs text-muted-foreground mt-6">
          Tap to start a voice call with KRA support
        </p>
      </div>

      {/* Trust Badge */}
      <div className="mt-8 flex items-center gap-2 text-primary-foreground/70 text-sm">
        <Shield className="w-4 h-4" />
        <span>Secured by KRA</span>
      </div>
    </div>
  );
};
