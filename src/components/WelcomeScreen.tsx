import { Button } from "@/components/ui/button";
import { Phone, Shield, Clock, Globe } from "lucide-react";
import gavaLinkLogo from "@/assets/gavalink-logo.png";

interface WelcomeScreenProps {
  onStartCall: () => void;
}

const features = [
  { icon: Shield, label: "Salama & Faragha" },
  { icon: Clock, label: "Dakika 5 tu" },
  { icon: Globe, label: "Kiswahili/English" },
];

export const WelcomeScreen = ({ onStartCall }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen gradient-welcome flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="glass-card rounded-3xl p-8 text-center text-primary-foreground max-w-md w-full animate-scale-in relative z-10">
        {/* Logo */}
        <div className="mx-auto mb-6 w-28 h-28 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center p-2">
          <img src={gavaLinkLogo} alt="GavaLink Logo" className="w-full h-full object-contain" />
        </div>

        {/* Title */}
        <h1 className="font-heading text-4xl font-bold mb-2 tracking-tight">
          Amua Voice
        </h1>
        <p className="text-lg text-primary-foreground/90 mb-2">
          Voice AI Assistant ya KRA
        </p>
        <p className="text-sm text-primary-foreground/70 mb-8">
          Msaada wa Sauti, Urahisi wa Ushuru
        </p>

        {/* CTA Button */}
        <Button
          variant="hero"
          size="xl"
          onClick={onStartCall}
          className="w-full mb-6 group"
        >
          <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
          Anza Simu Sasa
        </Button>

        {/* Features */}
        <div className="flex justify-center gap-6 mb-6">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <feature.icon className="w-5 h-5 text-primary-foreground/80" />
              <span className="text-xs text-primary-foreground/70">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* Footer text */}
        <p className="text-sm text-primary-foreground/60">
          Bonyeza na zungumza tu. Hakuna fomu, hakuna wasiwasi.
        </p>
      </div>

      {/* Trust badge */}
      <div className="mt-8 flex items-center gap-2 text-primary-foreground/60 text-sm relative z-10">
        <Shield className="w-4 h-4" />
        <span>Imeidhinishwa na KRA</span>
      </div>
    </div>
  );
};
