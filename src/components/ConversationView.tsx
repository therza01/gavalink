import { useRef, useEffect } from "react";
import { MessageBubble, Message } from "./MessageBubble";
import { SpeakingIndicator } from "./SpeakingIndicator";

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
  }, [messages, isAISpeaking]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
      style={{ maxHeight: "calc(100vh - 280px)" }}
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* AI Speaking Indicator with animated avatar */}
      <SpeakingIndicator isActive={isAISpeaking} />
    </div>
  );
};
