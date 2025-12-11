import { Button } from "@/components/ui/button";
import { FileText, Wallet, Upload, HelpCircle } from "lucide-react";

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const actions = [
  { id: "nil", label: "NIL Returns", icon: FileText, color: "text-primary" },
  { id: "balance", label: "Angalia Salio", icon: Wallet, color: "text-secondary" },
  { id: "upload", label: "Tuma Hati", icon: Upload, color: "text-accent" },
  { id: "help", label: "Msaada", icon: HelpCircle, color: "text-muted-foreground" },
];

export const QuickActions = ({ onAction }: QuickActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="chip"
          size="chip"
          onClick={() => onAction(action.id)}
          className="gap-2"
        >
          <action.icon className={`w-4 h-4 ${action.color}`} />
          {action.label}
        </Button>
      ))}
    </div>
  );
};
