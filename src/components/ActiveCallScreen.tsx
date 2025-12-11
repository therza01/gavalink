import { useState, useEffect, useCallback } from "react";
import { CallHeader } from "./CallHeader";
import { ConversationView } from "./ConversationView";
import { VoiceControls } from "./VoiceControls";
import { Message } from "./MessageBubble";

interface ActiveCallScreenProps {
  onEndCall: () => void;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Karibu! Mimi ni Amua, msaidizi wako wa sauti wa KRA. Ninaweza kukusaidia na ushuru wako. Unahitaji msaada gani leo?",
    sender: "ai",
    timestamp: new Date(),
  },
];

const aiResponses: Record<string, string> = {
  nil: "Sawa, nitakusaidia kujaza NIL returns. Kwanza, tafadhali niambie nambari yako ya PIN ya KRA.",
  balance: "Ninakagua salio lako la ushuru... Tafadhali subiri kidogo.",
  upload: "Unaweza kutuma picha ya hati yako. Je, ni hati gani unataka kutuma?",
  help: "Ninaweza kukusaidia na: kujaza NIL returns, kukagua salio, kutuma hati, au kujibu maswali yako kuhusu ushuru. Chagua moja!",
  default: "Nimekuelewa. Tafadhali endelea kuzungumza, ninakusikia.",
};

export const ActiveCallScreen = ({ onEndCall }: ActiveCallScreenProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [duration, setDuration] = useState(0);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isRecording, setIsRecording] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  // Simulate connection
  useEffect(() => {
    const timer = setTimeout(() => setIsConnected(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Call duration timer
  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isConnected]);

  const addMessage = useCallback((text: string, sender: "ai" | "user") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const simulateAIResponse = useCallback((responseKey: string) => {
    setIsAISpeaking(true);
    setTimeout(() => {
      addMessage(aiResponses[responseKey] || aiResponses.default, "ai");
      setIsAISpeaking(false);
    }, 2000);
  }, [addMessage]);

  const handleToggleRecording = useCallback(() => {
    if (isRecording) {
      // Simulate user message when stopping recording
      setIsRecording(false);
      addMessage("Nataka kujaza NIL returns zangu", "user");
      simulateAIResponse("nil");
    } else {
      setIsRecording(true);
    }
  }, [isRecording, addMessage, simulateAIResponse]);

  const handleQuickAction = useCallback((action: string) => {
    const actionLabels: Record<string, string> = {
      nil: "Nataka kujaza NIL returns",
      balance: "Nataka kukagua salio langu",
      upload: "Nataka kutuma hati",
      help: "Nahitaji msaada",
    };
    addMessage(actionLabels[action] || action, "user");
    simulateAIResponse(action);
  }, [addMessage, simulateAIResponse]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CallHeader isConnected={isConnected} duration={duration} />
      
      <ConversationView messages={messages} isAISpeaking={isAISpeaking} />
      
      <VoiceControls
        isRecording={isRecording}
        isSpeaking={isAISpeaking}
        onToggleRecording={handleToggleRecording}
        onEndCall={onEndCall}
        onQuickAction={handleQuickAction}
      />
    </div>
  );
};
