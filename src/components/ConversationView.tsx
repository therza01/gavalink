import { useRef, useEffect } from "react";
import { MessageBubble, Message } from "./MessageBubble";
import { VoiceWave } from "./VoiceWave";

interface ConversationViewProps {
  messages: Message[];
  isAISpeaking: boolean;
}

export const ConversationView = ({ messages, isAISpeaking }: ConversationViewProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
      style={{ maxHeight: "calc(100vh - 280px)" }}
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* AI Typing/Speaking Indicator */}
      {isAISpeaking && (
        <div className="flex items-start gap-3 animate-slide-up">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <VoiceWave isActive barCount={3} className="scale-75" />
          </div>
          <div className="bg-card border border-border rounded-2xl rounded-tl-none px-4 py-3 shadow-soft">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Amua anajibu</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
