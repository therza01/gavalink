import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ActiveCallScreen } from "@/components/ActiveCallScreen";
import { useCall } from "@/contexts/CallContext";

const CallSimulator = () => {
  const navigate = useNavigate();
  const { isInCall, startCall, endCall, setIsConnected, setDuration } = useCall();
  const [localCallActive, setLocalCallActive] = useState(false);

  // Sync local state with context
  useEffect(() => {
    if (isInCall) {
      setLocalCallActive(true);
    }
  }, [isInCall]);

  const handleStartCall = () => {
    setLocalCallActive(true);
    startCall();
  };

  const handleEndCall = () => {
    setLocalCallActive(false);
    endCall();
    navigate("/citizen");
  };

  const handleConnectionChange = (connected: boolean) => {
    setIsConnected(connected);
  };

  const handleDurationChange = (duration: number) => {
    setDuration(duration);
  };

  return (
    <div className="min-h-screen bg-background">
      {localCallActive ? (
        <ActiveCallScreen 
          onEndCall={handleEndCall}
          onConnectionChange={handleConnectionChange}
          onDurationChange={handleDurationChange}
        />
      ) : (
        <WelcomeScreen onStartCall={handleStartCall} />
      )}
    </div>
  );
};

export default CallSimulator;
