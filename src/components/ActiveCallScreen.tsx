import { useState, useEffect, useCallback } from "react";
import { useConversation } from "@elevenlabs/react";
import { CallHeader } from "./CallHeader";
import { ConversationView } from "./ConversationView";
import { VoiceControls } from "./VoiceControls";
import { Message } from "./MessageBubble";
import { toast } from "sonner";

interface ActiveCallScreenProps {
  onEndCall: () => void;
  onConnectionChange?: (connected: boolean) => void;
  onDurationChange?: (duration: number) => void;
}

const ELEVENLABS_AGENT_ID = "agent_3001kc4yga6xf66bew5chrddazj5";

export const ActiveCallScreen = ({ 
  onEndCall, 
  onConnectionChange, 
  onDurationChange 
}: ActiveCallScreenProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [duration, setDuration] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs agent");
      setIsConnected(true);
      setIsConnecting(false);
      onConnectionChange?.(true);
      // Add welcome message
      setMessages([{
        id: "welcome",
        text: "Karibu! Mimi ni Amua, msaidizi wako wa sauti wa KRA. Ninaweza kukusaidia na ushuru wako. Unahitaji msaada gani leo?",
        sender: "ai",
        timestamp: new Date(),
      }]);
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs agent");
      setIsConnected(false);
      onConnectionChange?.(false);
    },
    onMessage: (message) => {
      console.log("Message received:", message);
      // Handle transcriptions
      if (message.source === "user") {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: message.message,
          sender: "user",
          timestamp: new Date(),
        }]);
      } else if (message.source === "ai") {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: message.message,
          sender: "ai",
          timestamp: new Date(),
        }]);
      }
    },
    onError: (error) => {
      console.error("ElevenLabs error:", error);
      toast.error("Voice connection error. Please try again.");
      setIsConnecting(false);
    },
  });

  // Start conversation on mount
  useEffect(() => {
    const startConversation = async () => {
      try {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Connect to agent (public agent, no token needed)
        await conversation.startSession({
          agentId: ELEVENLABS_AGENT_ID,
          connectionType: "webrtc",
        });
      } catch (error) {
        console.error("Failed to start conversation:", error);
        if (error instanceof Error && error.name === "NotAllowedError") {
          toast.error("Microphone access is required for voice calls");
        } else {
          toast.error("Failed to connect. Please try again.");
        }
        setIsConnecting(false);
      }
    };

    startConversation();

    return () => {
      conversation.endSession();
    };
  }, []);

  // Call duration timer
  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => {
      setDuration((d) => {
        const newDuration = d + 1;
        onDurationChange?.(newDuration);
        return newDuration;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isConnected, onDurationChange]);

  const handleToggleRecording = useCallback(() => {
    // With ElevenLabs, the agent is always listening when connected
    // This button can be used to mute/unmute or provide visual feedback
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info("Listening... Speak now");
    }
  }, [isRecording]);

  const handleQuickAction = useCallback((action: string) => {
    const actionMessages: Record<string, string> = {
      nil: "Nataka kujaza NIL returns zangu",
      balance: "Nataka kukagua salio langu la ushuru",
      upload: "Nataka kutuma hati zangu",
      help: "Nahitaji msaada wa jumla",
    };
    
    // Send as user message for display
    const userMessage = actionMessages[action] || action;
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    }]);
    
    // With ElevenLabs conversational AI, quick actions trigger voice
    // The agent will respond based on the conversation context
    toast.info("Quick action sent");
  }, []);

  const handleEndCall = useCallback(async () => {
    await conversation.endSession();
    onEndCall();
  }, [conversation, onEndCall]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 flex flex-col">
      {/* Phone Call Header */}
      <div className="flex-shrink-0 pt-12 pb-6 text-center text-primary-foreground">
        <div className="mx-auto w-20 h-20 rounded-full bg-card/20 backdrop-blur flex items-center justify-center mb-4 border-2 border-primary-foreground/30">
          <span className="text-3xl">📞</span>
        </div>
        <h2 className="text-xl font-semibold">Amua - KRA Assistant</h2>
        <CallHeader 
          isConnected={isConnected} 
          duration={duration} 
          isConnecting={isConnecting}
        />
      </div>
      
      {/* Conversation Area */}
      <div className="flex-1 bg-card rounded-t-3xl overflow-hidden flex flex-col shadow-2xl">
        <ConversationView 
          messages={messages} 
          isAISpeaking={conversation.isSpeaking} 
        />
        
        <VoiceControls
          isRecording={isRecording}
          isSpeaking={conversation.isSpeaking}
          onToggleRecording={handleToggleRecording}
          onEndCall={handleEndCall}
          onQuickAction={handleQuickAction}
        />
      </div>
    </div>
  );
};
