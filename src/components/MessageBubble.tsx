import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

export interface Message {
  id: string;
  text: string;
  sender: "ai" | "user";
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isAI = message.sender === "ai";

  return (
    <div
      className={cn(
        "flex items-start gap-3 animate-slide-up",
        isAI ? "flex-row" : "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
          isAI ? "bg-primary/10" : "bg-secondary/10"
        )}
      >
        {isAI ? (
          <Bot className="w-5 h-5 text-primary" />
        ) : (
          <User className="w-5 h-5 text-secondary" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl",
          isAI
            ? "bg-card border border-border rounded-tl-none shadow-soft"
            : "bg-primary text-primary-foreground rounded-tr-none"
        )}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <span
          className={cn(
            "text-xs mt-1 block",
            isAI ? "text-muted-foreground" : "text-primary-foreground/70"
          )}
        >
          {message.timestamp.toLocaleTimeString("sw-KE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
